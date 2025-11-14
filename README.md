# tstp8

> Typescript to Pico-8

**Status: Experimental**

## Usage

Create a bun project and add `tstp8`

```sh
bun add tstp8
```

*Upcoming*: Bun template to speed up the creation of a new process

In your `package.json` you can point to an entry file and a output dir with `module`/`main` and `exports` like so :

```json
{
  "name": "pico-8-game-in-ts",
  "main": "src/game.ts",
  "exports": {
    "default": "./out"
  },
  "type": "module",
  "private": true,
  "dependencies": {
    "tstp8": "0.2.0"
  },
}
```

In your entry point (in this example it's `src/game.ts`), you need to import `tstp8` to get Pico-8 types and you can declare `_init`, `_update` and `_draw` :

```ts
// Importing this will make ts know about `cls()` and `circfill()` for example
// Only one import is needed per project, you could even put it in a global.d.ts
import "tstp8";
import { Color } from "tstp8/constants";

const player = { x: 0, y: 0 }

export function _init(): void {
  player.x = 20;
}

export function _update(): void {
  player.y -= 1;
}

export function _draw(): void {
  cls();
  circfill(player.x, player.y, 10, Color.red);
}
```

Now you can run `bun run tstp8` to transpile your game (in this example from `src/game.ts` into `out/game.lua`) and include the lua output in you pico8 cart :

```
pico-8 cartridge // http://www.pico-8.com
version 43
__lua__
#include out/game.lua
```

You can also use arguments to configure tstp8 :

|argument|value|default|description|
|:---:|:---:|:---|:---|
|`entryPoint`|path|`"main"` or `"module"` in your `package.json`|The entry point of your game, all imported files will be bundled|
|`outDir`|path|`"exports": { "default" }` in your package.json|The output directory of your lua file. It will keep the name of your entry point|
|`watch`|boolean|`false`|Watch the parent directory of your entry point and run the transpilation on every changes|
|`debug`|boolean|`false`|Also output a `.ts` file in your `outDir`. It's the bundle js/d.ts given to TypescriptToLua|

## How it works

`tstp8` uses several amazing tools :
 - [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua) to transpile TS to Lua
 - [Bun](https://github.com/oven-sh/bun) to quickly and easily bundle JavaScript file
 - [Oxc Transform](https://github.com/oxc-project/oxc) to build TS declaration files
 
 It uses Bun to bundle all javascript file, and oxc-transform (with a custom bun plugin) to generate its declaration.
 
 Then it put these two files inline to give TypeScriptToLua all it needs (hopefully) to transpile nicely.

## Why...

### ... typescript ?

If you want to build efficient games for pico8 you will *need* lua. This project is merely a cool side-project for me and a way to prototype very small games using my favorite language.

I don't have anything against lua, I just prefer to use typescript with full typings, inheritance and more.

### ... not jspicl ?

[jspicl](https://jspicl.github.io/) is not active anymore and have a lot more limitations compared to TypescriptToLua.

@tmountain did a really nice job with [pico-8-typescript](https://github.com/tmountain/pico-8-typescript) but I still feel too limited.

### ... bun ?

Bun is fast and really easy to work with. I didn't have to learn how babel, rollup or parcel work, I just use `Bun.build()` and everything worked.

If you really don't want to use bun for your games, I could compile and distribute standalone executable. (thanks to `bun build --compile` 😁)

## Development

Feel free to open issues and PR. This project still need refinement.

### Todo

- [ ] Convert Math lib to pico8 standard lib 
- [ ] Create a bun template to use `bun create tstp8`
