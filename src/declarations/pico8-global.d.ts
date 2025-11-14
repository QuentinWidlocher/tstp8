import { Primitive } from "type-fest";
import { Button, Color } from "./constants";

// Import in project to get pico8 auto-completions
declare global {
  function music(n?: number, fade_len?: number, channel_mask?: number): void;
  function sfx(
    n: number,
    channel?: number,
    offset?: number,
    length?: number
  ): void;
  function camera(): void;
  function camera(x: number, y: number): void;
  function circ(x: number, y: number, r: number, col?: Color): void;
  function circfill(x: number, y: number, r: number, col?: Color): void;
  function clip(): void;
  function clip(
    x: number,
    y: number,
    w: number,
    h: number,
    clip_previous?: boolean
  ): void;
  function cls(col?: Color): void;
  function cursor(x: number, y: number): void;
  function fget(n: number, f?: number): number;
  function flip(): void;
  function fset(n: number, f: number, v?: boolean): void;
  function line(x0: number, y0: number): void;
  function line(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: Color
  ): void;
  function pal(c0: Color, c1: Color, p?: number): void;
  function palt(col: Color, t: boolean): void;
  function pget(x: number, y: number): number;
  function print(str: string): void;
  function print(str: string, x: number, y: number, col?: Color): void;
  function pset(x: number, y: number): void;
  function rect(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: Color
  ): void;
  function rectfill(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: Color
  ): void;
  function sget(x: number, y: number): number;
  function spr(n: number, x: number, y: number): void;
  function spr(n: number, x: number, y: number, w: number, h: number): void;
  function spr(
    n: number,
    x: number,
    y: number,
    w: number,
    h: number,
    flip_x: boolean,
    flip_y: boolean
  ): void;
  function sset(x: number, y: number, col: Color): void;
  function sspr(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number
  ): void;
  function sspr(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
    flip_x?: boolean,
    flip_y?: boolean
  ): void;
  function fillp(mask: number): void;
  function btn(i?: Button, p?: number): boolean;
  function btnp(i?: Button, p?: number): boolean;
  function map(
    cel_x: number,
    cel_y: number,
    sx: number,
    sy: number,
    cel_w: number,
    cel_h: number,
    layer?: number
  ): void;
  function mapdraw(
    cel_x: number,
    cel_y: number,
    sx: number,
    sy: number,
    cel_w: number,
    cel_h: number,
    layer?: number
  ): void;
  function mset(x: number, y: number, v?: number): void;
  function add(t: any, v: any, index?: number): void;
  function all(t: any): void;
  function count(t: any, v?: any[]): number;
  function del(t: any, v?: any): void;
  function deli(t: any, i?: any[]): void;
  function foreach(t: any, f: (item: any) => void): void;
  function abs(x: number): number;
  function atan2(dx: number, dy: number): number;
  function ceil(x: number): number;
  function cos(x: number): number;
  function flr(x: number): number;
  function max(x: number, y: number): number;
  function mid(x: number, y: number, z: number): number;
  function min(x: number, y: number): number;
  /**
   * Returns a random number n, where 0 <= n < x
   * If you want an integer, use flr(rnd(x)). If x is an array, return a random element between table[0] and table[table.length].
   * @param x
   */
  function rnd(x: number): number;
  function rnd<T extends any>(x: T[]): T;
  function sgn(x: number): number;
  function sin(x: number): number;
  function srand(x: number): number;
  function sub(str: string, from: number, to?: number): string;
  function tostr(val: any, hex?: boolean): string;
  function tonum(str: string): number;
  function time(): number;
  function t(): number;
  function stat(x: number): void;
  function printh(
    str: string,
    filename?: string,
    overwrite?: boolean,
    save_to_desktop?: boolean
  ): void;

  // Not technically valid, but that's how it's currently transpiled
  // It makes sure we don't accidentally try to log a lua table
  // (You'll need to remove node types from your project)
  interface Console {
    assert(...optionalParams: Primitive[]): void;
    clear(...optionalParams: Primitive[]): void;
    count(...optionalParams: Primitive[]): void;
    countReset(...optionalParams: Primitive[]): void;
    debug(...optionalParams: Primitive[]): void;
    dir(...optionalParams: Primitive[]): void;
    dirxml(...optionalParams: Primitive[]): void;
    error(...optionalParams: Primitive[]): void;
    group(...optionalParams: Primitive[]): void;
    groupCollapsed(...optionalParams: Primitive[]): void;
    groupEnd(...optionalParams: Primitive[]): void;
    info(...optionalParams: Primitive[]): void;
    log(...optionalParams: Primitive[]): void;
    profile(...optionalParams: Primitive[]): void;
    profileEnd(...optionalParams: Primitive[]): void;
    table(...optionalParams: Primitive[]): void;
    time(...optionalParams: Primitive[]): void;
    timeEnd(...optionalParams: Primitive[]): void;
    timeLog(...optionalParams: Primitive[]): void;
    timeStamp(...optionalParams: Primitive[]): void;
    trace(...optionalParams: Primitive[]): void;
  }
  var console: Console;
}
