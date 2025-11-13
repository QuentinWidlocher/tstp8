# tstp8

> Typescript to Pico-8

**Experimental** : use Pico-8 with Typescript

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
    "tstp8": "link:tstp8"
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

## How it works

`tstp8` uses several amazing tools :
 - [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua) to transpile TS to Lua
 - [Bun](https://github.com/oven-sh/bun) to quickly and easily bundle JavaScript file
 - [Oxc Transform](https://github.com/oxc-project/oxc) to build TS declaration files
 
 It uses Bun to bundle all javascript file, and oxc-transform (with a custom bun plugin) to generate its declaration.
 
 Then it put these two files inline to give TypeScriptToLua all it needs (hopefully) to transpile nicely.
 
*Upcoming*: TSTL plugin to make sure the lua code is compatible with Pico-8

## Development

Build the cli with

```sh
bun build:cli
```

Build the constants files with

```sh
bun build:js
```
