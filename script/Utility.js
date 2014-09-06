var UTILITY = {

  function getRgbaFillStyle(rgb, opacity) {
    return "rgba(" rgb + ", " + opacity + ")";
  }

  function drawRoundedSquare(context, x, y, borderRadius, width) {

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
