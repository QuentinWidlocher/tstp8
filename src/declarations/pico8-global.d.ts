import { Primitive } from "type-fest";
import { Button, Color, Flag } from "./constants";

// Import in project to get pico8 auto-completions
declare global {
  type Bitfield = number;

  /**
   * Plays a music pattern, or stops playing.

   * @param n The pattern number to start playing (0-63), or -1 to stop playing music.
   * @param fade_len If not 0, fade in (or out) the music volume over a duration, given as a number of milliseconds.
   * @param channel_mask A bitfield indicating which of the four sound channels should be reserved for music. The default is 0 (no channels reserved).
   * @see http://pico8wiki.com/index.php?title=music
   */
  function music(n?: number, fade_len?: number, channel_mask?: number): void;

  /**
   * Plays a sound effect.

   * @param n The number of the sound effect to play (0-63), -1 to stop playing sound on the given channel, or -2 to release the sound of the given channel from looping.,
   * @param channel The channel to use for the sound effect (0-3). The default is -1, which chooses an available channel automatically. Can be -2 to stop playing the given sound effect on any channels it plays on.,
   * @param offset The note position in the sound effect to start playing (0-31). The default is 0 (the beginning).,
   * @param length The number of notes in the sound effect to play (0-31). The default is to play the entire sound effect.
   * @see http://pico8wiki.com/index.php?title=sfx
   */
  function sfx(
    n: number,
    channel?: number,
    offset?: number,
    length?: number
  ): void;

  /**
   * Sets the camera offset in the draw state.

   * @param x The x offset, in pixels, to subtract from future draw coordinates. (default 0),
   * @param y The y offset, in pixels, to subtract from future draw coordinates. (default 0),
   * @returns An x,y tuple representing the previous camera offset.
   * @see http://pico8wiki.com/index.php?title=camera
   */
  function camera(x?: number, y?: number): void;

  /**
   * Draws a circle shape, without fill.

   * @param x The x coordinate of the center of the circle.,
   * @param y The y coordinate of the center of the circle.,
   * @param r The radius of the circle, in pixels. If omitted, the radius will be 4.,
   * @param col The color of the circle and fill. If omitted, the color from the draw state is used.
   * @see http://pico8wiki.com/index.php?title=circ
   */
  function circ(x: number, y: number, r?: number, col?: Color): void;

  /**
   * Draws a filled-in circle shape.

   * @param x The x coordinate of the center of the circle.,
   * @param y The y coordinate of the center of the circle.,
   * @param r The radius of the circle, in pixels. If omitted, the radius will be 4.,
   * @param col The color of the circle and fill. If omitted, the color from the draw state is used.
   * @see http://pico8wiki.com/index.php?title=circfill
   */
  function circfill(x: number, y: number, r?: number, col?: Color): void;

  /**
   * Reset the clipping region to full screen.

   * @returns An x,y,w,h tuple representing the previous clipping rectangle.
   * @see http://pico8wiki.com/index.php?title=clip
   */
  function clip(): [number, number, number, number];

  /**
   * Sets the clipping region in the draw state.

   * @param x The x coordinate of the upper left corner of the clipping rectangle.,
   * @param y The y coordinate of the upper left corner of the clipping rectangle.,
   * @param w The width of the clipping rectangle, in pixels.,
   * @param h The height of the clipping rectangle, in pixels.,
   * @param clip_previous If true, the new clipping rectangle is formed by clipping it to the area of the one currently specified within the draw state.,
   * @returns An x,y,w,h tuple representing the previous clipping rectangle.
   * @see http://pico8wiki.com/index.php?title=clip
   */
  function clip(
    x: number,
    y: number,
    w: number,
    h: number,
    clip_previous?: boolean
  ): void;

  /**
  * Clears the graphics buffer.

  * @param color A color to use for the background. The default is 0 (black).
  * @see http://pico8wiki.com/index.php?title=cls
  */
  function cls(col?: Color): void;

  /**
   * Sets the left-margin cursor position for print().

   * @param x The x coordinate of the upper left corner of the line. The default is 0.
   * @param y The y coordinate of the upper left corner of the line. The default is 0.
   * @param col The palette index to set the pen color to.
   * @return An x,y,c tuple representing the previous cursor position and color.
   * @see http://pico8wiki.com/index.php?title=cursor
   */
  function cursor(x?: number, y?: number, col?: Color): [number, number, Color];

  /**
   * Gets the value of a flag of a sprite.

   * @param n The sprite number.
   * @returns A bit field of all flags.
   * @see http://pico8wiki.com/index.php?title=fget
   */
  function fget(n: number): Bitfield;

  /**
   * Gets the value of a flag of a sprite.

   * @param n The sprite number.
   * @param f The flag index (0-7).
   * @returns The sprite flag
   * @see http://pico8wiki.com/index.php?title=fget
   */
  function fget(n: number, f: Flag): boolean;

  /**
   * Copies the graphics buffer to the screen, then synchronizes to the next frame at 30 frames per second.
   * @see http://pico8wiki.com/index.php?title=flip
   */
  function flip(): void;

  /**
   * Sets the value of a flag of a sprite.

   * @param n The sprite number.
   * @param f The flag index (0-7).
   * @param v The value, either true or false
   * @see http://pico8wiki.com/index.php?title=fset
   */
  function fset(n: number, f: Flag, v: boolean): void;

  /**
   * Sets the value of a flag of a sprite.

   * @param n The sprite number.
   * @param v The value, a bit field of all flags.
   * @returns a bit field of all flags.
   * @see http://pico8wiki.com/index.php?title=fset
   */
  function fset(n: number, v: BitField): Bitfield;

  /**
   * Draws a line from the current endpoint to (x1, y1) in the given color.
   * The coordinates of the end of the previous line is used, or 0 if no previous line has been drawn.

   * @param x1 The x coordinate of the end of the line.
   * @param y1 The y coordinate of the end of the line.
   * @param color The color of the line. If omitted, the color from the draw state is used. This also sets the color in the draw state.
   * @see http://pico8wiki.com/index.php?title=line
   */
  function line(x1: number, y1: number, color?: Color): void;

  /**
   * Draws a line between two points.

   * @param x0 The x coordinate of the start of the line.
   * @param y0 The y coordinate of the start of the line.
   * @param x1 The x coordinate of the end of the line.
   * @param y1 The y coordinate of the end of the line.
   * @param color The color of the line. If omitted, the color from the draw state is used. This also sets the color in the draw state.
   * @see http://pico8wiki.com/index.php?title=line
   */
  function line(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color?: Color
  ): void;

  /**
   * Changes the draw state so all instances of a given color are replaced with a new color.

   * @param c0 The number of the original color to replace.,
   * @param c1 The number of the new color to use instead.,
   * @param p 0 to modify the palette used by draw operations, 1 to modify the palette for the screen already drawn, or 2 to modify the secondary screen palette. The default is 0.
   * @see http://pico8wiki.com/index.php?title=pal
   */
  function pal(c0: Color, c1: Color, p?: number): void;

  /**
   * Change the transparency of a color in the draw state for subsequent draw calls.

   * @param col The number of the color to modify.,
   * @param t If true, treat this color as transparent. If false, treat this color as opaque.
   * @see http://pico8wiki.com/index.php?title=palt
   */
  function palt(col: Color, t: boolean): void;

  /**
   * Resets the transparency for all colors.
   * @see http://pico8wiki.com/index.php?title=palt
   */
  function palt(): void;

  /**
   * Gets the color value of a pixel at the given coordinates.

   * @param x The x coordinate.,
   * @param y The y coordinate.
   * @returns The color value of the pixel
   * @see http://pico8wiki.com/index.php?title=pget
   */
  function pget(x: number, y: number): Color;

  /**
   * Prints a string of characters to the screen.

   * @param text The Lua string of characters to print.
   * @param x The x coordinate of the upper left corner to start printing.
   * @param y The y coordinate of the upper left corner to start printing.
   * @param color The color to use for the text.
   * @return The x coordinate of the next character to be printed (can be used to calculate printed width)
   * @see http://pico8wiki.com/index.php?title=print
   */
  function print(str: string, x?: number, y?: number, color?: Color): void;

  /**
   * Sets a pixel in the graphics buffer.

   * @param x The x coordinate.
   * @param y The y coordinate.
   * @param c The color value. If not specified, uses the current color of the draw state.
   * @see http://pico8wiki.com/index.php?title=pset
   */
  function pset(x: number, y: number, c?: Color): void;

  /**
   * Draws an empty rectangle shape.

   * @param x0 The x coordinate of the upper left corner.
   * @param y0 The y coordinate of the upper left corner.
   * @param x1 The x coordinate of the lower right corner.
   * @param y1 The y coordinate of the lower right corner.
   * @param col The color of the rectangle border. If omitted, the color from the draw state is used.
   * @see http://pico8wiki.com/index.php?title=rect
   */
  function rect(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: Color
  ): void;

  /**
   * Draws a filled-in rectangle shape.

   * @param x0 The x coordinate of the upper left corner.
   * @param y0 The y coordinate of the upper left corner.
   * @param x1 The x coordinate of the lower right corner.
   * @param y1 The y coordinate of the lower right corner.
   * @param col The color of the rectangle and fill. If omitted, the color from the draw state is used.
   * @see http://pico8wiki.com/index.php?title=rectfill
   */
  function rectfill(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: Color
  ): void;

  /**
   * Gets the color value of a pixel on the sprite sheet.

   * @param x The x coordinate on the sprite sheet.
   * @param y The y coordinate on the sprite sheet.
   * @see http://pico8wiki.com/index.php?title=sget
   */
  function sget(x: number, y: number): number;

  /**
   * Draws a sprite, or a range of sprites, on the screen.

   * @param n The sprite number. When drawing a range of sprites, this is the upper-left corner.
   * @param x The x coordinate (pixels). The default is 0.
   * @param y The y coordinate (pixels). The default is 0.
   * @param w The width of the range, as a number of sprites. Non-integer values may be used to draw partial sprites. The default is 1.0.
   * @param h The height of the range, as a number of sprites. Non-integer values may be used to draw partial sprites. The default is 1.0.
   * @param flip_x If true, the sprite is drawn inverted left to right. The default is false.
   * @param flip_y If true, the sprite is drawn inverted top to bottom. The default is false.
   * @see http://pico8wiki.com/index.php?title=spr
   */
  function spr(
    n: number,
    x: number,
    y: number,
    w: number,
    h: number,
    flip_x: boolean,
    flip_y: boolean
  ): void;

  /**
   * Sets the color value of a pixel on the sprite sheet.

   * @param x The x coordinate on the sprite sheet.
   * @param y The y coordinate on the sprite sheet.
   * @param c The color value to set. If unspecified, the color of the current draw state will be used.
   * @see http://pico8wiki.com/index.php?title=sset
   */
  function sset(x: number, y: number, c?: Color): void;

  /**
   * Draws a rectangle of pixels from the sprite sheet, optionally stretching the image to fit a rectangle on the screen.

   * @param sx The x coordinate of the upper left corner of the rectangle in the sprite sheet.
   * @param sy The y coordinate of the upper left corner of the rectangle in the sprite sheet.
   * @param sw The width of the rectangle in the sprite sheet, as a number of pixels.
   * @param sh The height of the rectangle in the sprite sheet, as a number of pixels.
   * @param dx The x coordinate of the upper left corner of the rectangle area of the screen.
   * @param dy The y coordinate of the upper left corner of the rectangle area of the screen.
   * @param dw The width of the rectangle area of the screen. The default is to match the image width (sw).
   * @param dh The height of the rectangle area of the screen. The default is to match the image height (sh).
   * @param flip_x If true, the image is drawn inverted left to right. The default is false.
   * @param flip_y If true, the image is drawn inverted top to bottom. The default is false.
   * @see http://pico8wiki.com/index.php?title=sspr
   */
  function sspr(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw?: number,
    dh?: number,
    flip_x?: boolean,
    flip_y?: boolean
  ): void;

  /**
   * Sets the fill pattern.

   * @param pat A bitfield representing the fill pattern to use.
   * @see http://pico8wiki.com/index.php?title=fillp
   */
  function fillp(pat: Bitfield): void;

  /**
   * Tests if a button is being pressed at this moment.

   * @param i The button number.
   * @param p The player number.
   * @returns True is the button is pressed, else false
   * @see http://pico8wiki.com/index.php?title=btn
   */
  function btn(i: Button, p?: number): boolean;

  /**
   * Tests if a button is being pressed at this moment.

   * @returns A bitfield for multiple players.
   * @see http://pico8wiki.com/index.php?title=btn
   */
  function btn(): Bitfield;

  /**
   * Tests if a button has just been pressed, with keyboard-style repeating.
   * @param i The button number.
   * @param p The player number.
   * @returns True is the button has just been pressed pressed, else false
   * @see http://pico8wiki.com/index.php?title=btnp
   */
  function btnp(i: Button, p?: number): boolean;

  /**
   * Tests if a button has just been pressed, with keyboard-style repeating.
   * @returns A bitfield for multiple players.
   * @see http://pico8wiki.com/index.php?title=btnp
   */
  function btnp(): Bitfield;

  /**
   * Draws a portion of the map to the graphics buffer.

   * @param celx The column location of the map cell in the upper left corner of the region to draw, where 0 is the leftmost column.
   * @param cely The row location of the map cell in the upper left corner of the region to draw, where 0 is the topmost row.
   * @param sx The x coordinate of the screen to place the upper left corner.
   * @param sy The y coordinate of the screen to place the upper left corner.
   * @param celw The number of map cells wide in the region to draw.
   * @param celh The number of map cells tall in the region to draw.
   * @param layer If specified, only draw sprites that have flags set for every bit in this value (a bitfield). The default is 0 (draw all sprites).
   * @see http://pico8wiki.com/index.php?title=map
   */
  function map(
    celx: number,
    cely: number,
    sx: number,
    sy: number,
    celw: number,
    celh: number,
    layer?: Bitfield
  ): void;

  /**
   * Sets a cell on the map to a new sprite number.

   * @param celx The column (x) coordinate of the cell.
   * @param cely The row (y) coordinate of the cell.
   * @param snum The new sprite number to store.
   * @see http://pico8wiki.com/index.php?title=mset
   */
  function mset(celx: number, cely: number, snum?: number): void;

  /**
   * Adds an element to the end of a sequence in a table.

   * @param table The table.
   * @param value The value to add.
   * @param index The index for the value to be inserted.
   * @return The value that was passed in.
   * @see http://pico8wiki.com/index.php?title=add
   */
  function add<T>(table: Array<T>, value: T, index?: number): void;

  /**
   * Returns an iterator for all non-nil items in a sequence in a table, for use with for...in.

   * @see http://pico8wiki.com/index.php?title=
   * @param tbl The table to iterate.
   * @return An interator function that can be used with for...in to iterate over tbl.
   * @see http://pico8wiki.com/index.php?title=all
   */
  function all<T>(tbl: Array<T>): Iterable<T>;

  /**
   * Returns the number of elements, or the number of elements with a given value, in the sequence section of a table.

   * @param table The table.
   * @param value The value to search for and count. The default is to count the length of the sequence instead.
   * @return The number of elements with a matching value.
   * @see http://pico8wiki.com/index.php?title=count
   */
  function count<T>(table: Array<T>, value?: T): number;

  /**
   * Deletes the first occurrence of a value from a sequence in a table.

   * @param table The table.
   * @param value The value to match and remove.
   * @see http://pico8wiki.com/index.php?title=del
   */
  function del<T>(table: Array<T>, value: T): void;

  /**
   * Removes the element at the given index of a sequence in a table.

   * @param table The table.
   * @param index The index for the value to be removed.
   * @see http://pico8wiki.com/index.php?title=deli
   */
  function deli(table: Array<any>, index: number): void;

  /**
   * Calls a function for each element in a sequence in a table.

   * @see http://pico8wiki.com/index.php?title=
   * @param tbl The table.
   * @param func The function to call. The function should accept an element as its sole argument.
   * @see http://pico8wiki.com/index.php?title=foreach
   */
  function foreach<T>(tbl: Array<T>, func: (item: T) => void): void;

  /**
   * Returns the absolute value of a number.

   * @param num The number.
   * @return The absolute value of num.
   * @see http://pico8wiki.com/index.php?title=abs
   */
  function abs(num: number): number;

  /**
   * Calculates the arctangent of dy/dx, the angle formed by the vector on the unit circle. The result is adjusted to represent the full circle.

   * @param dx The horizontal component.
   * @param dy The vertical component.
   * @return The angle of the line from 0,0 to dx,dy.
   * @see http://pico8wiki.com/index.php?title=atan2
   */
  function atan2(dx: number, dy: number): number;

  /**
   * Returns the nearest integer at or above a number (its "ceiling").

   * @param num The number.
   * @return The nearest integer at or above num.
   * @see http://pico8wiki.com/index.php?title=ceil
   */
  function ceil(num: number): number;

  /**
   * Calculates the cosine of an angle.

   * @param angle The angle, using a full circle range of 0.0-1.0.
   * @see http://pico8wiki.com/index.php?title=cos
   */
  function cos(angle: number): number;

  /**
   * Returns the nearest integer at or below a number (its "floor").

   * @param num The number.
   * @return The nearest integer at or below num.
   * @see http://pico8wiki.com/index.php?title=flr
   */
  function flr(num: number): number;

  /**
   * Returns the maximum of two numbers.

   * @param first The first number.
   * @param second The second number. (default 0)
   * @see http://pico8wiki.com/index.php?title=max
   */
  function max(first: number, second?: number): number;

  /**
   * Returns the middle of three numbers. Also useful for clamping.

   * @param first The first number.
   * @param second The second number.
   * @param third The third number.
   * @see http://pico8wiki.com/index.php?title=mid
   */
  function mid(first: number, second: number, third: number): number;

  /**
   * Returns the minimum of two numbers.

   * @param first The first number.
   * @param second The second number. (default 0)
   * @see http://pico8wiki.com/index.php?title=min
   */
  function min(first: number, second?: number): number;

  /**
   * Generates a random number under the given limit, or returns a random element from a sequence.

   * @param limit Non-inclusive. Defaults to a limit of 1.0.
   * @see http://pico8wiki.com/index.php?title=rnd
   */
  function rnd(limit?: number): number;

  /**
   * Generates a random number under the given limit, or returns a random element from a sequence.

   * @param table The table
   * @see http://pico8wiki.com/index.php?title=rnd
   */
  function rnd<T>(table: Array<T>): T;

  /**
   * Returns the sign of a number, 1 for positive, -1 for negative

   * @param number The number to determine the sign of.
   * @see http://pico8wiki.com/index.php?title=sgn
   */
  function sgn(number: number): 1 | -1;

  /**
   * Calculates the sine of an angle.

   * @param angle The angle, using a full circle range of 0.0-1.0 measured clockwise (0.0 to the right).
   * @see http://pico8wiki.com/index.php?title=sin
   */
  function sin(angle: number): number;

  /**
   * Initializes the random number generator with an explicit seed value.

   * @param val The seed value.
   * @see http://pico8wiki.com/index.php?title=srand
   */
  function srand(val: number): void;

  /**
   * Gets the substring of a string.

   * @param str The string.
   * @param start The starting index, counting from 1 at the left, or -1 at the right.
   * @param end The ending index, counting from 1 at the left, or -1 at the right. (default -1)
   * @see http://pico8wiki.com/index.php?title=sub
   */
  function sub(str: string, start: number, end?: number): string;

  /**
   * Converts a non-string value to a string representation.

   * @param val The value to convert.
   * @param format_flags Bitfield which allows different operations to occur in the conversion
   * @see http://pico8wiki.com/index.php?title=tostr
   */
  function tostr(val: any, format_flags?: Bitfield): string;

  /**
   * Converts a string representation of a decimal, hexadecimal, or binary number to a number value.

   * @param val Value to be converted; usually a string though numbers are acceptable.
   * @param format_flags Bitfield which allows different operations to occur in the conversion.
   * @see http://pico8wiki.com/index.php?title=tonum
   */
  function tonum(val: string, format_flags?: Bitfield): number;

  /**
   * Returns the amount of time since PICO-8 was last started, as a (fractional) number of seconds.
   * @alias t()
   * @see http://pico8wiki.com/index.php?title=time
   */
  function time(): number;

  /**
   * Returns the amount of time since PICO-8 was last started, as a (fractional) number of seconds.
   * @alias time()
   * @see http://pico8wiki.com/index.php?title=t
   */
  function t(): number;

  /**
   * Returns information about the current runtime environment.

   * @param n The ID of the information to return.
   * @see http://pico8wiki.com/index.php?title=stat
   */
  function stat(n: number): any;

  /**
   * Prints a string to a console window that is running PICO-8, or to a file or the clipboard.

   * @alias `console.log("hello", world)` works as `printh("hello" .. world)` in tstp8

   * @param str The string to print.
   * @param filename The name of a file to append the output, instead of printing to the console. If this is the string "@clip", the message replaces the contents of the system clipboard instead of writing to a file.
   * @param overwrite If filename is provided and is the name of a file and overwrite is true, this overwrites the file. The default is false, which appends the message to the end of the file.
   * @param save_to_desktop Create or modify filename on the desktop instead of in Pico-8's data directory.
   * @see http://pico8wiki.com/index.php?title=printh
   */
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
