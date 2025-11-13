import { Color } from "./constants";

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
  function circ(x: number, y: number, r: number, col?: number): void;
  function circfill(x: number, y: number, r: number, col?: number): void;
  function clip(): void;
  function clip(
    x: number,
    y: number,
    w: number,
    h: number,
    clip_previous?: boolean
  ): void;
  function cls(col?: number): void;
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
    col?: number
  ): void;
  function pal(c0: Color, c1: Color, p?: number): void;
  function palt(col: number, t: boolean): void;
  function pget(x: number, y: number): number;
  function print(this: void, str: string): void;
  function print(
    this: void,
    str: string,
    x: number,
    y: number,
    col?: number
  ): void;
  function pset(x: number, y: number): void;
  function rect(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: number
  ): void;
  function rectfill(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: number
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
  function sset(x: number, y: number, col: number): void;
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
  function btn(this: void, i?: number, p?: number): boolean;
  function btnp(i?: number, p?: number): boolean;
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
  function rnd(x: number): number;
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
}
