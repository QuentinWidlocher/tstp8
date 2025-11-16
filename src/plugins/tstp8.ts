import ts from "typescript";
import * as tstl from "typescript-to-lua";

function isTsNamespacedCallExpression(
  node: ts.Node,
  namespace: string,
  method?: string
): node is ts.CallExpression & {
  expression: ts.PropertyAccessExpression & { expression: ts.Identifier };
} {
  return (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.getText() == namespace &&
    (!method || node.expression.name.getText() == method)
  );
}

function isLuaNamespacedCallExpression(
  node: tstl.Node,
  namespace: string,
  method?: string
): node is tstl.CallExpression & {
  expression: tstl.TableIndexExpression & {
    table: tstl.Identifier;
    index: tstl.StringLiteral;
  };
} {
  return (
    tstl.isCallExpression(node) &&
    tstl.isTableIndexExpression(node.expression) &&
    tstl.isIdentifier(node.expression.table) &&
    node.expression.table.text == namespace &&
    tstl.isStringLiteral(node.expression.index) &&
    (!method || node.expression.index.value == method)
  );
}

const existingMathMethods = {
  abs: "abs",
  atan2: "atan2",
  ceil: "ceil",
  cos: "cos",
  floor: "flr",
  max: "max",
  min: "max",
  random: "rnd",
  sign: "sgn",
  sin: "sing",
} as const;

function existingMathMethodsToPico8(
  node: ts.CallExpression,
  luaNode: tstl.Expression,
  _context: tstl.TransformationContext
) {
  const existingMathMethod = Object.keys(existingMathMethods).find((method) =>
    isTsNamespacedCallExpression(node, "Math", method)
  ) as keyof typeof existingMathMethods | undefined;
  if (existingMathMethod && tstl.isCallExpression(luaNode)) {
    return tstl.createCallExpression(
      tstl.createIdentifier(existingMathMethods[existingMathMethod]),
      luaNode.params
    );
  }
}

// console.log("hello", name) -> printh("hello" .. name)
function consoleToPrinth(
  node: ts.CallExpression,
  _luaNode: tstl.Expression,
  context: tstl.TransformationContext
) {
  if (isTsNamespacedCallExpression(node, "console")) {
    const luaArguments = node.arguments.reduce<tstl.Expression | null>(
      (expr, argument) => {
        if (expr) {
          return tstl.createBinaryExpression(
            tstl.createBinaryExpression(
              expr,
              tstl.createStringLiteral(" "),
              tstl.SyntaxKind.ConcatOperator
            ),
            context.transformExpression(argument),
            tstl.SyntaxKind.ConcatOperator
          );
        }

        return context.transformExpression(argument);
      },
      null
    );

    if (luaArguments) {
      return tstl.createCallExpression(tstl.createIdentifier("printh"), [
        luaArguments,
      ]);
    }
  }
}

// array.shift -> deli(array, 1)
function arrayShiftToDeli(
  _node: ts.CallExpression,
  luaNode: tstl.Expression,
  _context: tstl.TransformationContext
) {
  if (isLuaNamespacedCallExpression(luaNode, "table", "remove")) {
    return tstl.createCallExpression(
      tstl.createIdentifier("deli"),
      luaNode.params
    );
  }
}

export const tstp8Plugin: tstl.Plugin = {
  visitors: {
    [ts.SyntaxKind.CallExpression]: (node, context) => {
      let luaNode = context.superTransformExpression(node);

      // Execute in order (bottom can override top)
      luaNode = [consoleToPrinth, arrayShiftToDeli, existingMathMethodsToPico8]
        .toReversed()
        .reduce((n, fn) => {
          return fn(node, n, context) ?? n;
        }, luaNode);

      return luaNode;
    },
  },
};
