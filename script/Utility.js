var UTILITY = {

  /**
   * Returns a fill style string with the given RGB and opacity values
   * @param {string}  rgb     - RGB string (format: "RRR, GGG, BBB")
   * @param {number}  opacity - Opacity of fill style (range: 0 - 1)
   */
  getRgbaFillStyle: function(rgb, opacity) {
    return "rgba(" + rgb + ", " + opacity + ")";
  },

  /**
   * Renders a rounded square
   * @param {CanvasRenderingContext2D}  context       - 2D rendering context to use
   * @param {integer}                   x             - X-coordinate of square (in pixels)
   * @param {integer}                   y             - Y-coordinate of square (in pixels)
   * @param {integer}                   borderRadius  - Border radius of square (in pixels)
   * @param {integer}                   width         - Width of the square (in pixels)
   */
  drawRoundedSquare: function(context, x, y, borderRadius, width) {

    // Credit: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Drawing_shapes
    context.beginPath();
    context.moveTo(x, y + borderRadius);
    context.lineTo(x, y + width - borderRadius);
    context.quadraticCurveTo(x, y + width, x + borderRadius, y + width);
    context.lineTo(x + width - borderRadius, y + width);
    context.quadraticCurveTo(x + width, y + width, x + width, y + width - borderRadius);
    context.lineTo(x + width, y + borderRadius);
    context.quadraticCurveTo(x + width, y, x + width - borderRadius, y);
    context.lineTo(x + borderRadius, y);
    context.quadraticCurveTo(x, y, x, y + borderRadius);
    context.fill();

  }

};
