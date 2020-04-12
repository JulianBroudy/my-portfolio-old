function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// mousePosition & rotationSpeed are declared here because "rotatePlane" needs it.
var mousePosition, colors = [
  // "#C678DD", "#5cd3ad", "#f5c156", "#e6616b"
  "rgba(198, 120, 221, ",
  "rgba(92, 211, 173, ",
  "rgba(245, 193, 86, ",
  "rgba(230, 97, 107, "
];

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!         EXPLANATION for the following 8 functions (rotations)         !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Think of XY, XZ, YZ as a number with 3 bits _ _ _.
//  XY ,  XZ ,  YZ
// 1|0 , 1|0 , 1|0
// Each index's function rotates the planes that correspond to the "ON" bits in the index.
function rotatePlane(point, plane) {
  // Choose direction of rotation based on which plane is being rotated.
  // Despite declaring global directions for planes, I chose to keep directions as points' properties and set them to the global directions in order to keep the option to generate a direction for each point individually if I chose to in the future.
  let direction = (plane == Const.xy ? point.directionOnXY : (plane == Const.xz) ? point.directionOnXZ : point.directionOnYZ);

  // Rotate the passed point.
  // This is the only place needs changing in order to change the rotation speed.
  point.rotate2D(direction * rotationSpeed, mousePosition, plane);
}

// Rotate the YZ plane.
function rotateYZ(point) {
  // 001B
  rotatePlane(point, Const.yz);
}

// Rotate the XZ plane.
function rotateXZ(point) {
  // 010B
  rotatePlane(point, Const.xz);
}

// Rotate the XZ & YZ planes.
function rotateXZandYZ(point) {
  // 011B
  rotateXZ(point);
  rotateYZ(point);
}

// Rotate the XY plane.
function rotateXY(point) {
  // 100B
  rotatePlane(point, Const.xy);
}

// Rotate the XZ & YZ planes.
function rotateXYandYZ(point) {
  // 101B
  rotateXY(point);
  rotateYZ(point);
}

// Rotate the XY & YZ planes.
function rotateXYandXZ(point) {
  // 110B
  rotateXY(point);
  rotateXZ(point);
}

// Rotate the XY, XZ & YZ planes.
function rotateAll(point) {
  // 111B
  rotateXY(point);
  rotateXZ(point);
  rotateYZ(point);
}

// Run the following function after document is ready...
$(document).ready(function() {

  // Create canvas.
  space = new CanvasSpace("theCanvas", "#2f3542").display();
  // Get form.
  var form = new Form(space);
  // Initialize mouse's position to the canvas' current center.
  mousePosition = space.size.$divide(2).clone();

  let ran = getRandomIntInclusive(13, 130);

  console.log(ran);
  rotationSpeed = Const.one_degree / ran;
  // The direction in which the points will rotate according to the plane.
  var rotationDirectionOnXY = Math.random() < 0.5 ? -1 : 1;
  var rotationDirectionOnXZ = Math.random() < 0.5 ? -1 : 1;
  var rotationDirectionOnYZ = Math.random() < 0.5 ? -1 : 1;

  // These variables act as the bits of the number mentioned in "function rotatePlane(point, plane)", initialized to 0 to ensure random selection with each page refresh.
  var rotateXYn = rotateXZn = rotateYZn = 0;

  // Make sure at least one plane rotates.
  // Biased generation.
  while (!rotateXYn && !rotateXZn && !rotateYZn) {
    rotateXYn = Math.random() < 0.9 ? 1 : 0;
    rotateXZn = Math.random() < 0.9 ? 1 : 0;
    rotateYZn = Math.random() < 0.2 ? 0 : 1;
  }

  // See "function rotatePlane(point, plane)" !!
  // The array that will act as a chosing mechanism to quickly decide which rotation function will be called when a point rotates.
  // This is the approach instead of creating multiple if else statements.
  // See "point.rotate = ..." !
  var rotateFunctions = [undefined, rotateYZ, rotateXZ, rotateXZandYZ, rotateXY, rotateXYandYZ, rotateXYandXZ, rotateAll];

  console.log("XY:" + rotateXYn + "\tDirection:" + rotationDirectionOnXY);
  console.log("XZ:" + rotateXZn + "\tDirection:" + rotationDirectionOnXZ);
  console.log("YZ:" + rotateYZn + "\tDirection:" + rotationDirectionOnYZ);
  console.log(4 * rotateXYn + 2 * rotateXZn + rotateYZn);

  // Points on canvas
  var points;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !! The following variables are re-calculated every time the window resizes !!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // The width & height of the window.
  var width, height;

  // Biased generation of mainLine's location.
  var mainLineLocation = Math.random() < 0.9 ? (Math.random() < 0.5 ? "UpperLeft" : "UpperRight") : (Math.random() < 0.5 ? "BottomLeft" : "BottomRight");
  // The line to which the points' lines will be perpendicular to.
  var mainLine;

  updateCanvasSize();

  // This function is called at the beginning as an initializer and on every window resizing.
  function updateCanvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;

    // The line to which the points' lines will be perpendicular to.
    switch (mainLineLocation) {
      case "UpperLeft":
        mainLine = new Line(0, 0).to(width, -getRandomIntInclusive(height / 4, height / 2.5));
        break;
      case "UpperRight":
        mainLine = new Line(0, -getRandomIntInclusive(height / 4, height / 2.5)).to(width, 0);
        break;
      case "BottomLeft":
        mainLine = new Line(0, height).to(width, height + getRandomIntInclusive(height / 4, height / 2.5));
        break;
      case "BottomRight":
        mainLine = new Line(0, height + getRandomIntInclusive(height / 4, height / 2.5)).to(width, height);
        break;
    }


    // Number of points to generate.
    let numberOfPoints = width * 0.15;
    if (numberOfPoints > 120) numberOfPoints = 120;

    let radious = Math.max(width, height) * 1.5;
    points = [];
    for (let i = 0; i < numberOfPoints; i++) {
      var point = new Vector(Math.random() * radious, Math.random() * radious - Math.random() * radious, Math.random() * radious - Math.random() * radious);

      // Initial opacity.
      point.opacity = 0.7;
      // Pick a color.
      point.color = colors[i % 4];
      // Generate biased size where 70% of the cases it's in range [2, 5], 22.5% in range [5, 7] and  7.5% it's in range [7, 9].
      point.size = Math.random() < 0.7 ? getRandomIntInclusive(2, 5) : (Math.random() < 0.75 ? getRandomIntInclusive(5, 7) : getRandomIntInclusive(7, 9));

      // The following variables exist to keep the option to generate a direction for each point individually
      point.directionOnXY = rotationDirectionOnXY;
      point.directionOnXZ = rotationDirectionOnXZ;
      point.directionOnYZ = rotationDirectionOnYZ;

      // 4 * rotateXYn + 2 * rotateXZn + rotateYZn = (0,7], which is the index of the appropriate rotation function based on which planes should be rotated.
      point.rotate = rotateFunctions[4 * rotateXYn + 2 * rotateXZn + rotateYZn];
      points.push(point);

      // Returns the color with 1 opacity.
      point.getPointFill = function() {
        return this.color + "1)";
      }

      // Returns the color with its opacity or white with 0.1 opacity.
      point.getLineFill = function() {
        if (this.opacity > 0.2)
          return this.color + this.opacity + ")";
        return "rgba(255,255,255," + 0.1 + ")";
      }

      // Return same as getLineFill but the white is with current opacity.
      point.getHighlight = function() {
        if (this.opacity > 0.2)
          return this.color + this.opacity + ")";
        return "rgba(255,255,255," + this.opacity + ")";
      }
    }
  }

  space.add({
    animate: function(time, fps, context) {
      for (let i = 0; i < points.length; i++) {
        let point = points[i];

        // Rotate point
        point.rotate(point);
        // Create a line from this point to the intersection point with the mainLine
        let line = new Line(point).to(mainLine.getPerpendicularFromPoint(point));
        // Calculate distance between the newly created line and the mousePosition
        let distanceFromMouse = Math.abs(line.getDistanceFromPoint(mousePosition));
        // Draw the point
        form.stroke(false).fill(point.getPointFill()).point(point, point.size);
        // Color the line if it's close to the mouse's current position, else, keep it white.
        if (distanceFromMouse < Math.min(height, height) / 15) {
          if (point.opacity < 1.0) point.opacity += 0.015;
        } else {
          if (point.opacity > 0.2) point.opacity -= 0.011;
        }
        form.stroke(point.getHighlight()).point(point, point.size);
        form.stroke(point.getLineFill()).fill(true).line(line);
      }
    },
    onMouseAction: function(type, x, y, evt) {
      if (type == "move") {
        mousePosition.set(x, y);
      }
    },
    onTouchAction: function(type, x, y, evt) {
      this.onMouseAction(type, x, y);
    }
  });

  space.bindMouse();
  space.play();

  $(window).resize(function() {
    console.log("It's Ok it's Ok, I handled it! :)");
    updateCanvasSize();
  });

});
