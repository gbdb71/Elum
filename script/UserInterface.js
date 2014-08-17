function UserInterface() {

};

UserInterface.prototype.draw = function(context) {

  // Draw background
  context.fillStyle = "#111";
  context.fillRect(1000, 0, 200, 500);

  // Draw game title
  context.fillStyle = "#FFF";
  context.font = "40px Arial, sans-serif";
  context.fillText("elum", 1020, 70);

  // Draw EARTH tile selection
  context.fillStyle = "rgba(196, 107, 33, 1)";
  context.fillRect(1000, 100, 200, 50);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(1000, 100, 10, 50);

  context.fillStyle = "#FFF";
  context.font = "18px Arial, sans-serif";
  context.fillText("0", 1180, 140);

  // Draw WATER tile selection
  context.fillStyle = "rgba(33, 104, 196, 1)";
  context.fillRect(1000, 150, 200, 50);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(1000, 150, 10, 50);

  context.fillStyle = "#FFF";
  context.font = "18px Arial, sans-serif";
  context.fillText("0", 1180, 190);

  // Draw FIRE tile selection
  context.fillStyle = "rgba(214, 30, 30, 1)";
  context.fillRect(1000, 200, 200, 50);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(1000, 200, 10, 50);

  context.fillStyle = "#FFF";
  context.font = "18px Arial, sans-serif";
  context.fillText("0", 1180, 240);

  // Draw WIND tile selection
  context.fillStyle = "rgba(112, 208, 230, 1)";
  context.fillRect(1000, 250, 200, 50);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(1000, 250, 10, 50);

  context.fillStyle = "#FFF";
  context.font = "18px Arial, sans-serif";
  context.fillText("0", 1180, 290);

  // Draw level display
  context.fillStyle = "#FFF";
  context.font = "15px Arial, sans-serif";
  context.fillText("level 0", 1020, 340);

  // Draw reset button
  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(1000, 450, 200, 50);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(1000, 450, 10, 50);

  context.fillStyle = "#FFF";
  context.font = "18px Arial, sans-serif";
  context.fillText("reset", 1030, 480);

};
