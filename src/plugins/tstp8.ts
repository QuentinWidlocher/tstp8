import ts from "typescript";
import * as tstl from "typescript-to-lua";

// console.log("hello", name) -> printh("hello" .. name)
function consoleToPrinth(
  node: ts.CallExpression,
  _luaNode: tstl.Expression,
  context: tstl.TransformationContext
) {
  if (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.getText() == "console"
  ) {
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
  if (
    tstl.isCallExpression(luaNode) &&
    tstl.isTableIndexExpression(luaNode.expression) &&
    tstl.isIdentifier(luaNode.expression.table) &&
    luaNode.expression.table.text == "table" &&
    tstl.isStringLiteral(luaNode.expression.index) &&
    luaNode.expression.index.value == "remove"
  ) {
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

      luaNode = consoleToPrinth(node, luaNode, context) ?? luaNode;
      luaNode = arrayShiftToDeli(node, luaNode, context) ?? luaNode;

      return luaNode;
    },
  },
};
