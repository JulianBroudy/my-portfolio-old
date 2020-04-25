var leavingSection = false;
var scrollingDirection = 0;
var normalEffect, scrollingEffect;
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// This is the point the points will rotate around.
// It can be set as the center of the window or the mouse coordinates.
// Also, the mouse could be given depth (x coordinate).
var aroundAnchor = {
  x: 0,
  y: 0,
  z: 0,
  center: false,
  depth: true
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
  point.rotate2D(direction * point.getRotationSpeed(), aroundAnchor, plane);
}

// Move points according to distance of z to center of screen or mouse' current position.
function moveAccordingToZ(point, speed) {
  // 000B
  if (speed != undefined) {
    // console.log('direction = ' + scrollingDirection);
    let velocity = scrollingDirection * speed;
    // console.log('oldY='+point.y + 'vel = ' + velocity * 10)
    // point.moveBy(0, velocity * 10 , 0);
    point.moveBy(0, velocity, 0);
    // console.log('newY='+point.y)
  }
  // console.log('z: ' + this.z);
  // let velocity = scrollingDirection * (Math.tanh(this.z/radious)+1)/2;
  // console.log('velocity: ' + velocity);
  // this.moveBy(velocity * this.moveByX, velocity * this.moveByY, velocity * this.moveByZ);
  // this.moveBy(0, velocity * this.moveByY, 0);
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



let ran = getRandomIntInclusive(13, 130);

// console.log(ran);
// rotationSpeed = Const.one_degree / ran;
// rotationSpeed = Const.one_degree / 10;
// rotationSpeed = 0.001;
rotationSpeed = 45;
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

var xyPlane = {
  active: Math.random() < 0.9 ? 1 : 0
}
var xzPlane = {
  active: Math.random() < 0.9 ? 1 : 0
}
var yzPlane = {
  active: Math.random() < 0.2 ? 0 : 1
}
var rotatingPlanes = {
  xy: Math.random() < 0.9 ? 1 : 0,
  xz: Math.random() < 0.9 ? 1 : 0,
  yz: Math.random() < 0.2 ? 0 : 1
}

// See "function rotatePlane(point, plane)" !!
// The array that will act as a chosing mechanism to quickly decide which rotation function will be called when a point rotates.
// This is the approach instead of creating multiple if else statements.
// See "point.rotate = ..." !
var rotateFunctions = [moveAccordingToZ, rotateYZ, rotateXZ, rotateXZandYZ, rotateXY, rotateXYandYZ, rotateXYandXZ, rotateAll];

// console.log("XY:" + rotateXYn + "\tDirection:" + rotationDirectionOnXY);
// console.log("XZ:" + rotateXZn + "\tDirection:" + rotationDirectionOnXZ);
// console.log("YZ:" + rotateYZn + "\tDirection:" + rotationDirectionOnYZ);
// console.log(rotateFunctions[4 * rotateXYn + 2 * rotateXZn + rotateYZn]);

const FIELD_VISION = 1000;

// Points on canvas
var points;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! The following variables are re-calculated every time the window resizes !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// The width & height of the window.
var width, height, xCenter, yCenter, radious;

// Biased generation of mainLine's location.
var mainLineLocation = Math.random() < 0.9 ? (Math.random() < 0.5 ? "UpperLeft" : "UpperRight") : (Math.random() < 0.5 ? "BottomLeft" : "BottomRight");
// The line to which the points' lines will be perpendicular to.
var mainLine;

// This function is called at the beginning as an initializer and on every window resizing.
function updateCanvasSize() {
  width = window.innerWidth;
  height = window.innerHeight;
  xCenter = width / 2;
  yCenter = height / 2;
  // console.log("height:" + height);
  // The line to which the points' lines will be perpendicular to.
  switch (mainLineLocation) {
    case "UpperLeft":
      mainLine = new Line(0, 0).to(width, -getRandomIntInclusive(height / 4, height / 2.5));
      break;
    case "UpperRight":
      mainLine = new Line(0, -getRandomIntInclusive(height / 4, height / 2.5)).to(width, 0);
      break;
    case "BottomLeft":
      mainLine = new Line(0, 4 * height).to(width, 4 * height + getRandomIntInclusive(height / 4, height / 2.5));
      break;
    case "BottomRight":
      mainLine = new Line(0, 4 * height + getRandomIntInclusive(height / 4, height / 2.5)).to(width, 4 * height);
      break;
  }


  // Number of points to generate.
  let numberOfPoints = width * 0.15;
  if (numberOfPoints > 120) numberOfPoints = 120;

  radious = Math.max(width, height) * 1;
  points = [];
  for (let i = 0; i < numberOfPoints; i++) {
    var point = new Vector(Math.random() * radious - Math.random() * radious, Math.random() * radious - Math.random() * radious + Math.random() * radious, Math.random() * radious - Math.random() * radious + Math.random() * radious);
    // var point = new Vector(getRandomIntInclusive(10, width), getRandomIntInclusive(10, height), Math.random() * radious);
    // var point = new Vector(100, 100, Math.random() * radious - Math.random() * radious);
    // var point = new Vector(100, 100, getRandomIntInclusive(0,200));

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
    point.rotate = rotateFunctions[4 * xyPlane.active + 2 * xzPlane.active + yzPlane.active];
    // point.rotate = rotateFunctions[4 * rotateXYn + 2 * rotateXZn + rotateYZn];
    // point.rotate = rotateYZ;
    // point.rotate = rotateXY;
    points.push(point);

    point.moveByX = Math.random() * getRandomIntInclusive(0, 5);
    // point.moveByY = Math.random() * getRandomIntInclusive(1, 10);
    point.moveByY = 10;
    // point.moveByZ = Math.random() * getRandomIntInclusive(0, 5);
    point.moveByZ = 0;
    // point.movingSpeed = Math.random() + 0.01;
    point.movingSpeed = Math.tanh(point.z);

    point.acticateScrollEffect = function() {
      // let velocity = scrollingDirection * this.movingSpeed;
      // console.log('z: ' + this.z);
      let velocity = scrollingDirection * (Math.tanh(this.z / 2 * radious) + 1) / 2;
      // console.log('velocity: ' + velocity);
      // this.moveBy(velocity * this.moveByX, velocity * this.moveByY, velocity * this.moveByZ);
      this.moveBy(0, velocity * this.moveByY, 0);

      // rotateXZ(this);
      // rotateFunctions[0](this, this.getMovingSpeed());

      // rotateXZ(this);
      // rotateXZ(this);
      // rotateXZ(this);
      // rotateXZ(this);
      // rotateXZ(this);
      // rotateXZ(this);
      // rotateXZ(this);
    }

    point.getMovingSpeed = function() {
      // return ((mousePosition.z-this.z)/radious*(10)) ;
      // return (Math.tanh((mousePosition.z-this.z)/radious)+1) ;
      return ((aroundAnchor.z - this.z) / (radious) * height / 10);
      // (2*radious - yCenter) / yCenter
    }

    point.getRotationSpeed = function() {
      // return ((Math.tanh(this.z / radious) + 1) / 2) * Const.one_degree / 5;
      // return ((Math.tanh(this.z / radious) + 1) / 2) * Const.one_degree / rotationSpeed;
      // return ((Math.tanh(this.z / radious) + 1) / 4) * Const.one_degree / rotationSpeed;
      return (((Math.tanh(this.z / radious) + 1) / 2) * rotationSpeed * Const.one_degree) / 1000;
    }

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



// Run the following function after document is ready...
$(document).ready(function() {
  // let current = fullpage_api.getActiveSection();
  // if (current.index != 0 && sessionStorage.getItem('initialAlert') !== 'wasShown') {
  //   fullpage_api.moveTo(0);
  //   console.log('moved up');
  //   // return false;
  // }


  // function activateCanvas() {

  // Create canvas.
  space = new CanvasSpace("theCanvas", "#2f3542").display();
  // Get form.
  var form = new Form(space);
  // Initialize mouse's position to the canvas' current center.
  mousePosition = space.center.clone();
  mousePosition.z = 0;
  aroundAnchor = mousePosition.clone();
  updateCanvasSize();

  function drawIt(point) {
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


  scrollingEffect = {
    animate: function(time, fps, context) {
      let originalRotation = rotationSpeed;
      rotationSpeed *= 20 * scrollingDirection;
      for (let i = 0; i < points.length; i++) {
        let point = points[i];
        // Rotate point
        point.rotate(point);
        point.acticateScrollEffect();

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
      rotationSpeed = originalRotation;
    },onMouseAction: function(type, x, y, evt) {
      if (type == "move") {
        mousePosition.set(x, y);
        if (!aroundAnchor.center) {
          aroundAnchor.x = x;
          aroundAnchor.y = y;
          if (aroundAnchor.depth) {
            aroundAnchor.z = ((y % height) - yCenter) / height * radious;
          }
          // console.log(aroundAnchor.z);
        }
        // console.log('mouse x: '+x+', y: '+y);
        // console.log('mouse: ' + mousePosition);
      }
    },
    onTouchAction: function(type, x, y, evt) {
      this.onMouseAction(type, x, y);
    },
    onSpaceResize: function(x, y, evt) {
      width = window.innerWidth;
      height = window.innerHeight;
      xCenter = width / 2;
      yCenter = height / 2;
      switch (mainLineLocation) {
        case "UpperRight":
          mainLine = new Line(0, -getRandomIntInclusive(height / 4, height / 2.5)).to(width, 0);
          break;
        case "BottomRight":
          mainLine = new Line(0, 4 * height + getRandomIntInclusive(height / 4, height / 2.5)).to(width, 4 * height);
          break;
      }
    }
  }

  normalEffect = {
    animate: function(time, fps, context) {
      for (let i = 0; i < points.length; i++) {
        let point = points[i];
        // Rotate point
        point.rotate(point);

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
    },onMouseAction: function(type, x, y, evt) {
      if (type == "move") {
        mousePosition.set(x, y);
        if (!aroundAnchor.center) {
          aroundAnchor.x = x;
          aroundAnchor.y = y;
          if (aroundAnchor.depth) {
            aroundAnchor.z = ((y % height) - yCenter) / height * radious;
          }
          // console.log(aroundAnchor.z);
        }
        // console.log('mouse x: '+x+', y: '+y);
        // console.log('mouse: ' + mousePosition);
      }
    },
    onTouchAction: function(type, x, y, evt) {
      this.onMouseAction(type, x, y);
    },
    onSpaceResize: function(x, y, evt) {
      width = window.innerWidth;
      height = window.innerHeight;
      xCenter = width / 2;
      yCenter = height / 2;
      switch (mainLineLocation) {
        case "UpperRight":
          mainLine = new Line(0, -getRandomIntInclusive(height / 4, height / 2.5)).to(width, 0);
          break;
        case "BottomRight":
          mainLine = new Line(0, 4 * height + getRandomIntInclusive(height / 4, height / 2.5)).to(width, 4 * height);
          break;
      }
    }
  }
  let inTheMiddle = false;

  space.add({
    animate: function(time, fps, context) {
      // if(!inTheMiddle){
        // inTheMiddle = true;
      if (leavingSection) {
        originalRotation = rotationSpeed;
        rotationSpeed *= 20 * scrollingDirection;
        for (let i = 0; i < points.length; i++) {
          let point = points[i];
          point.acticateScrollEffect();
          point.rotate(point);
          drawIt(point);
        }
        rotationSpeed = originalRotation;
        // rotationSpeed = 720;
      } else {
        for (let i = 0; i < points.length; i++) {
          let point = points[i];
          // Rotate point
          point.rotate(point);
          drawIt(point);
        }
      }
      // inTheMiddle = false;
// }
      // for(let i = 0;i<points.length;i++){
      //   let p = points[i];
      //   let line = new Line(p).to(mainLine.getPerpendicularFromPoint(p));
      //   // Calculate distance between the newly created line and the mousePosition
      //   let distanceFromMouse = Math.abs(line.getDistanceFromPoint(mousePosition));
      //   // Draw the point
      //   form.stroke(false).fill(p.getPointFill()).point(p, p.size);
      //   // Color the line if it's close to the mouse's current position, else, keep it white.
      //   if (distanceFromMouse < Math.min(height, height) / 15) {
      //     if (p.opacity < 1.0) p.opacity += 0.015;
      //   } else {
      //     if (p.opacity > 0.2) p.opacity -= 0.011;
      //   }
      //   form.stroke(p.getHighlight()).point(p, p.size);
      //   form.stroke(p.getLineFill()).fill(true).line(line);
      // }
      // for (let i = 0; i < points.length; i++) {
      //   let point = points[i];
      //   // Rotate point
      //   // point.rotate(point);
      //   // if (leavingSection) {
      //   //   point.acticateScrollEffect();
      //   // }
      //
      //   // let line = new Line(point).to(mainLine.getPerpendicularFromPoint(point));
      //   // // Calculate distance between the newly created line and the mousePosition
      //   // let distanceFromMouse = Math.abs(line.getDistanceFromPoint(mousePosition));
      //   // // Draw the point
      //   // form.stroke(false).fill(point.getPointFill()).point(point, point.size);
      //   // // Color the line if it's close to the mouse's current position, else, keep it white.
      //   // if (distanceFromMouse < Math.min(height, height) / 15) {
      //   //   if (point.opacity < 1.0) point.opacity += 0.015;
      //   // } else {
      //   //   if (point.opacity > 0.2) point.opacity -= 0.011;
      //   // }
      //   // form.stroke(point.getHighlight()).point(point, point.size);
      //   // form.stroke(point.getLineFill()).fill(true).line(line);
      // }
    },
    onMouseAction: function(type, x, y, evt) {
      if (type == "move") {
        mousePosition.set(x, y);
        if (!aroundAnchor.center) {
          aroundAnchor.x = x;
          aroundAnchor.y = y;
          if (aroundAnchor.depth) {
            aroundAnchor.z = ((y % height) - yCenter) / height * radious;
          }
          // console.log(aroundAnchor.z);
        }
        // console.log('mouse x: '+x+', y: '+y);
        // console.log('mouse: ' + mousePosition);
      }
    },
    onTouchAction: function(type, x, y, evt) {
      this.onMouseAction(type, x, y);
    },
    onSpaceResize: function(x, y, evt) {
      width = window.innerWidth;
      height = window.innerHeight;
      xCenter = width / 2;
      yCenter = height / 2;
      switch (mainLineLocation) {
        case "UpperRight":
          mainLine = new Line(0, -getRandomIntInclusive(height / 4, height / 2.5)).to(width, 0);
          break;
        case "BottomRight":
          mainLine = new Line(0, 4 * height + getRandomIntInclusive(height / 4, height / 2.5)).to(width, 4 * height);
          break;
      }
    }

  });

  // space.add(normalEffect);

  space.bindMouse();
  space.play();

  $(window).resize(function() {
    console.log("It's Ok it's Ok, I handled it! :)");
    // updateCanvasSize();
  });

  // Canvas controls handlers
  const decreaseSpeedBTN = document.getElementById("speed_dec_btn");
  const increaseSpeedBTN = document.getElementById("speed_inc_btn");
  const degreeOfRotation = document.querySelector(".speed_degree");
  degreeOfRotation.innerHTML = rotationSpeed + 'º';

  xyPlane.icon = document.querySelector(".xy_icon");
  xyPlane.text = document.querySelector(".xy_text");
  xzPlane.text = document.querySelector(".xz_text");
  xzPlane.icon = document.querySelector(".xz_icon");
  yzPlane.icon = document.querySelector(".yz_icon");
  yzPlane.text = document.querySelector(".yz_text");

  initializePlaneControl(xyPlane);
  initializePlaneControl(xzPlane);
  initializePlaneControl(yzPlane);


  function initializePlaneControl(plane) {
    let isActive = plane.active;
    let theText = plane.text;
    let theIcon = plane.icon;
    if (isActive == 1) {
      addClass(theIcon, 'plane-active');
    }
    theIcon.addEventListener("click", function() {
      if (isActive == 1) {
        removeClass(theIcon, 'plane-active');
        isActive = 0;
      } else {
        addClass(theIcon, 'plane-active');
        isActive = 1;
      }
      plane.active = isActive;
      updateRotations();
    });
    theText.addEventListener("click", function() {
      if (isActive == 1) {
        removeClass(theIcon, 'plane-active');
        isActive = 0;
      } else {
        addClass(theIcon, 'plane-active');
        isActive = 1;
      }
      plane.active = isActive;
      updateRotations();
    });
    theIcon.addEventListener("mousedown", function() {
      if (!theIcon.classList.contains('scale_one_and_a_half')) {
        theIcon.classList.add('scale_one_and_a_half');
      }
    });
    theIcon.addEventListener("mouseup", function() {
      if (theIcon.classList.contains('scale_one_and_a_half')) {
        theIcon.classList.remove('scale_one_and_a_half');
      }
    });
    theText.addEventListener("mousedown", function() {
      if (!theIcon.classList.contains('scale_one_and_a_half')) {
        theIcon.classList.add('scale_one_and_a_half');
      }
    });
    theText.addEventListener("mouseup", function() {
      if (theIcon.classList.contains('scale_one_and_a_half')) {
        theIcon.classList.remove('scale_one_and_a_half');
      }
    });
    theIcon.addEventListener("mouseenter", function() {
      addClass(theText, 'plane-active');
    });
    theIcon.addEventListener("mouseleave", function() {
      removeClass(theText, 'plane-active');
    });
    theText.addEventListener("mouseenter", function() {
      if (isActive == 0) {
        addClass(theIcon, 'plane-active');
      }
    });
    theText.addEventListener("mouseleave", function() {
      if (isActive == 0) {
        removeClass(theIcon, 'plane-active');
      }
    });
  }

  function addClass(element, claz) {
    element.classList.add(claz);
  }

  function removeClass(element, claz) {
    element.classList.remove(claz);
  }

  function updateRotations() {
    // console.log(xyPlane.active);
    // console.log(xzPlane.active);
    // console.log(yzPlane.active);
    let indexOfNewRotationFunction = 4 * xyPlane.active + 2 * xzPlane.active + yzPlane.active;
    for (let i = 0; i < points.length; i++) {
      points[i].rotate = rotateFunctions[indexOfNewRotationFunction];
    }
  }

  function changeColor(textElement, color) {
    textElement.style.color = color;
  }

  function changeFill(iconElement, color) {
    iconElement.style.fill = color;
  }



  //
  // Speed Controls
  //

  let keepDecreasing = false;
  let keepIncreasing = false;

  let speedJump = 0.1;
  let delay = 200;

  decreaseSpeedBTN.addEventListener("mousedown", function() {
    keepDecreasing = true;
    decreaseSpeed();
  });
  decreaseSpeedBTN.addEventListener("mouseup", stopDecreasing);
  decreaseSpeedBTN.addEventListener("mouseleave", stopIncreasing);

  function stopDecreasing() {
    keepDecreasing = false;
    delay = 200;
    // console.log('false!!!!');
  }

  function decreaseSpeed() {
    if (keepDecreasing && rotationSpeed > 1) {
      // rotationSpeed+=rotationSpeed/10;
      // rotationSpeed+=rotationSpeed/5;
      rotationSpeed--;
      degreeOfRotation.innerHTML = rotationSpeed + 'º';
      // console.log('newSpeed:' + rotationSpeed);
      setTimeout(decreaseSpeed, delay -= delay / 10);
    }
  }
  increaseSpeedBTN.addEventListener("mousedown", function() {
    keepIncreasing = true;
    increaseSpeed();
  });
  increaseSpeedBTN.addEventListener("mouseup", stopIncreasing);
  increaseSpeedBTN.addEventListener("mouseleave", stopIncreasing);

  function stopIncreasing() {
    keepIncreasing = false;
    delay = 200;
    // console.log('false!!!!');
  }

  function increaseSpeed() {
    if (keepIncreasing && rotationSpeed < 360) {
      // rotationSpeed+=rotationSpeed/10;
      // rotationSpeed+=rotationSpeed/5;
      // rotationSpeed--;
      rotationSpeed++;
      degreeOfRotation.innerHTML = rotationSpeed + 'º';

      // console.log('newSpeed:' + rotationSpeed);
      setTimeout(increaseSpeed, delay -= delay / 10);
    }
  }

  //
  // Rotate Around Controls
  //

  const centerIcon = document.querySelector(".center_icon");
  const centerText = document.querySelector(".center_rot");
  const mouseIcon = document.querySelector(".mouse_icon");
  const mouseText = document.querySelector(".mouse_rot");
  const mouseDepthControls = document.querySelector(".controls_mouse");
  aroundAnchor.center = false;
  addClass(mouseIcon, 'around-active');


  function rotateAroundHandler() {
    if (aroundAnchor.center) {
      removeClass(centerIcon, 'around-active');
      addClass(mouseIcon, 'around-active');
    } else {
      addClass(centerIcon, 'around-active');
      removeClass(mouseIcon, 'around-active');
    }
    if (!(aroundAnchor.center = !aroundAnchor.center)) {
      removeClass(mouseDepthControls, 'controls_mouse_disable');
    } else {
      addClass(mouseDepthControls, 'controls_mouse_disable');
      aroundAnchor.x = xCenter;
      aroundAnchor.y = yCenter;
      aroundAnchor.z = 0;

    }
  }

  centerIcon.addEventListener("click", rotateAroundHandler);
  mouseIcon.addEventListener("click", rotateAroundHandler);
  centerText.addEventListener("click", rotateAroundHandler);
  mouseText.addEventListener("click", rotateAroundHandler);

  function scaleOnHandler(element) {
    if (!element.classList.contains('scale_one_and_a_half')) {
      addClass(element, 'scale_one_and_a_half');
    }
  }

  function scaleOffHandler(element) {
    if (element.classList.contains('scale_one_and_a_half')) {
      removeClass(element, 'scale_one_and_a_half');
    }
  }
  centerIcon.addEventListener("mousedown", function() {
    scaleOnHandler(centerIcon);
  });
  centerIcon.addEventListener("mouseup", function() {
    scaleOffHandler(centerIcon);
  });
  centerText.addEventListener("mousedown", function() {
    scaleOnHandler(centerIcon);
  });
  centerText.addEventListener("mouseup", function() {
    scaleOffHandler(centerIcon);
  });
  mouseIcon.addEventListener("mousedown", function() {
    scaleOnHandler(mouseIcon);
  });
  mouseIcon.addEventListener("mouseup", function() {
    scaleOffHandler(mouseIcon);
  });
  mouseText.addEventListener("mousedown", function() {
    scaleOnHandler(mouseIcon);
  });
  mouseText.addEventListener("mouseup", function() {
    scaleOffHandler(mouseIcon);
  });
  centerIcon.addEventListener("mouseenter", function() {
    addClass(centerText, 'around-active');
  });
  centerIcon.addEventListener("mouseleave", function() {
    removeClass(centerText, 'around-active');
  });
  centerText.addEventListener("mouseenter", function() {
    if (!aroundAnchor.center) {
      addClass(centerIcon, 'around-active');
    }
  });
  centerText.addEventListener("mouseleave", function() {
    if (!aroundAnchor.center) {
      removeClass(centerIcon, 'around-active');
    }
  });
  mouseIcon.addEventListener("mouseenter", function() {
    addClass(mouseText, 'around-active');
  });
  mouseIcon.addEventListener("mouseleave", function() {
    removeClass(mouseText, 'around-active');
  });
  mouseText.addEventListener("mouseenter", function() {
    if (aroundAnchor.center) {
      addClass(mouseIcon, 'around-active');
    }
  });
  mouseText.addEventListener("mouseleave", function() {
    if (aroundAnchor.center) {
      removeClass(mouseIcon, 'around-active');
    }
  });

  //
  // Mouse Depth Controls
  //
  const depthOnIcon = document.querySelector(".depth_on_icon");
  const depthOnText = document.querySelector(".depth_on_text");
  const depthOffIcon = document.querySelector(".depth_off_icon");
  const depthOffText = document.querySelector(".depth_off_text");

  aroundAnchor.depth = true;
  addClass(depthOnIcon, 'depth_on');

  function mouseDepthHandler() {
    if (aroundAnchor.depth) {
      addClass(depthOffIcon, 'depth_off');
      removeClass(depthOnIcon, 'depth_on');
    } else {
      removeClass(depthOffIcon, 'depth_off');
      addClass(depthOnIcon, 'depth_on');
    }
    if (!(aroundAnchor.depth = !aroundAnchor.depth)) {
      aroundAnchor.z = 0;
    }
  }

  depthOnIcon.addEventListener("click", mouseDepthHandler);
  depthOnText.addEventListener("click", mouseDepthHandler);
  depthOffIcon.addEventListener("click", mouseDepthHandler);
  depthOffText.addEventListener("click", mouseDepthHandler);


  depthOnIcon.addEventListener("mousedown", function() {
    scaleOnHandler(depthOnIcon);
  });
  depthOnIcon.addEventListener("mouseup", function() {
    scaleOffHandler(depthOnIcon);
  });
  depthOnText.addEventListener("mousedown", function() {
    scaleOnHandler(depthOnIcon);
  });
  depthOnText.addEventListener("mouseup", function() {
    scaleOffHandler(depthOnIcon);
  });
  depthOffIcon.addEventListener("mousedown", function() {
    scaleOnHandler(depthOffIcon);
  });
  depthOffIcon.addEventListener("mouseup", function() {
    scaleOffHandler(depthOffIcon);
  });
  depthOffText.addEventListener("mousedown", function() {
    scaleOnHandler(depthOffIcon);
  });
  depthOffText.addEventListener("mouseup", function() {
    scaleOffHandler(depthOffIcon);
  });

  depthOnIcon.addEventListener("mouseenter", function() {
    addClass(depthOnText, 'depth_on');
  });
  depthOnIcon.addEventListener("mouseleave", function() {
    removeClass(depthOnText, 'depth_on');
  });
  depthOnText.addEventListener("mouseenter", function() {
    if (!aroundAnchor.depth) {
      addClass(depthOnIcon, 'depth_on');
    }
  });
  depthOnText.addEventListener("mouseleave", function() {
    if (!aroundAnchor.depth) {
      removeClass(depthOnIcon, 'depth_on');
    }
  });

  depthOffIcon.addEventListener("mouseenter", function() {
    addClass(depthOffText, 'depth_off');
  });
  depthOffIcon.addEventListener("mouseleave", function() {
    removeClass(depthOffText, 'depth_off');
  });

  depthOffText.addEventListener("mouseenter", function() {
    if (aroundAnchor.depth) {
      addClass(depthOffIcon, 'depth_off');
    }
  });
  depthOffText.addEventListener("mouseleave", function() {
    if (aroundAnchor.depth) {
      removeClass(depthOffIcon, 'depth_off');
    }
  });


});
