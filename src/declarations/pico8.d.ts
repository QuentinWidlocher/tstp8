import { Color } from "./constants";

declare function music(
  this: void,
  n?: number,
  fade_len?: number,
  channel_mask?: number
): void;
declare function sfx(
  this: void,
  n: number,
  channel?: number,
  offset?: number,
  length?: number
): void;
declare function camera(this: void): void;
declare function camera(this: void, x: number, y: number): void;
declare function circ(
  this: void,
  x: number,
  y: number,
  r: number,
  col?: number
): void;
declare function circfill(
  this: void,
  x: number,
  y: number,
  r: number,
  col?: number
): void;
declare function clip(this: void): void;
declare function clip(
  this: void,
  x: number,
  y: number,
  w: number,
  h: number,
  clip_previous?: boolean
): void;
declare function cls(this: void, col?: number): void;
declare function cursor(this: void, x: number, y: number): void;
declare function fget(this: void, n: number, f?: number): number;
declare function flip(this: void): void;
declare function fset(this: void, n: number, f: number, v?: boolean): void;
declare function line(this: void, x0: number, y0: number): void;
declare function line(
  this: void,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  col?: number
): void;
declare function pal(this: void, c0: Color, c1: Color, p?: number): void;
declare function palt(this: void, col: number, t: boolean): void;
declare function pget(this: void, x: number, y: number): number;
declare function print(this: void, str: string): void;
declare function print(
  this: void,
  str: string,
  x: number,
  y: number,
  col?: number
): void;
declare function pset(this: void, x: number, y: number): void;
declare function rect(
  this: void,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  col?: number
): void;
declare function rectfill(
  this: void,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  col?: number
): void;
declare function sget(this: void, x: number, y: number): number;
declare function spr(this: void, n: number, x: number, y: number): void;
declare function spr(
  this: void,
  n: number,
  x: number,
  y: number,
  w: number,
  h: number
): void;
declare function spr(
  this: void,
  n: number,
  x: number,
  y: number,
  w: number,
  h: number,
  flip_x: boolean,
  flip_y: boolean
): void;
declare function sset(this: void, x: number, y: number, col: number): void;
declare function sspr(
  this: void,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number
): void;
declare function sspr(
  this: void,
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
declare function fillp(this: void, mask: number): void;
declare function btn(this: void, this: void, i?: number, p?: number): boolean;
declare function btnp(this: void, i?: number, p?: number): boolean;
declare function map(
  this: void,
  cel_x: number,
  cel_y: number,
  sx: number,
  sy: number,
  cel_w: number,
  cel_h: number,
  layer?: number
): void;
declare function mapdraw(
  this: void,
  cel_x: number,
  cel_y: number,
  sx: number,
  sy: number,
  cel_w: number,
  cel_h: number,
  layer?: number
): void;
declare function mset(this: void, x: number, y: number, v?: number): void;
declare function add(this: void, t: any, v: any, index?: number): void;
declare function all(this: void, t: any): void;
declare function count(this: void, t: any, v?: any[]): number;
declare function del(this: void, t: any, v?: any): void;
declare function deli(this: void, t: any, i?: any[]): void;
declare function foreach(
  this: void,
  t: any,
  f: (this: void, item: any) => void
): void;
declare function abs(this: void, x: number): number;
declare function atan2(this: void, dx: number, dy: number): number;
declare function ceil(this: void, x: number): number;
declare function cos(this: void, x: number): number;
declare function flr(this: void, x: number): number;
declare function max(this: void, x: number, y: number): number;
declare function mid(this: void, x: number, y: number, z: number): number;
declare function min(this: void, x: number, y: number): number;
declare function rnd(this: void, x: number): number;
declare function sgn(this: void, x: number): number;
declare function sin(this: void, x: number): number;
declare function srand(this: void, x: number): number;
declare function sub(
  this: void,
  str: string,
  from: number,
  to?: number
): string;
declare function tostr(this: void, val: any, hex?: boolean): string;
declare function tonum(this: void, str: string): number;
declare function time(this: void): number;
declare function t(this: void): number;
declare function stat(this: void, x: number): void;
declare function printh(
  this: void,
  str: string,
  filename?: string,
  overwrite?: boolean,
  save_to_desktop?: boolean
): void;
