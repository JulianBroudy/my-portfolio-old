Pts.namespace(window);
const docStyle = document.documentElement.style;

var width = window.innerWidth,
  height = window.innerHeight;
var space;

(function() {

  function MyPoint(thePoint, brightness) {
    this.thePoint = thePoint;
    this.brightness = brightness;
    this.direction = Math.random() < 0.5 ? -1 : 1;
  }

  space = new CanvasSpace("#overlay").setup({
    // bgcolor: "#2F3542",
    bgcolor: "transparent",
    // bgcolor: "black",
    // offscreen: true,
    retina: true,
    resize: false
  });
  var form = space.getForm();
  var mainPath = [new Pt(), new Pt(-Util.randomInt(20), 0)];
  let points;
  let pts;
  let radialBackGround = form.gradient([
    [1, `rgba(47, 53, 66, 1)`],
    [0, `transparent`]
  ]);
  let radialBackGroundReversed = form.gradient([
    [0.5, `rgba(47, 53, 66, 1)`],
    [0.7, `rgba(47, 53, 66, 0.8)`],
    [1, `transparent`]
  ]);



  space.add({
    start: (bound) => {
      if (!points) {
        points = [];
        pts = [];
        for (let i = 0; i < 100; i++) {
          var point = new Pt({
            x: Util.randomInt(20) * i,
            y: Util.randomInt(20) * i,
            z: Util.randomInt(20) * i
          });

          pts.push(point);
          points[i] = new MyPoint(point, 0.7);
        }
      }
    },

    animate: (time, ftime) => {


      /* The following for loop and its alternative "Geom.rot..." work both
         with and without the z coordinate, and it gives the same result: points rotate.*/

      // for (let i = 0; i < 100; i++) {
      // points[i].thePoint.rotate2D(Const.one_degree / 12, space.center);
      // }
      /* For's alternative */
      // Geom.rotate2D(pts,Const.one_degree, space.center);




      /* The following for loop and its alternative "Geom.rot..." does not create the
         expected result whether I include the z coordinate or not! */

      for (let i = 0; i < 100; i++) {
        points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.xy);
        /*OR*/
        // points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.xz);
        /*OR*/
        // points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.yz);
      }
      // Geom.rotate2D(pts,Const.one_degree, space.center,Const.xy);
      /*OR*/
      // Geom.rotate2D(pts,Const.one_degree, space.center,Const.xz);
      /*OR*/
      // Geom.rotate2D(pts,Const.one_degree, space.center,Const.yz);


      let perpends = pts.map((p) => [p, Line.perpendicularFromPt(mainPath, p)]);

      form.strokeOnly("#2F3542", 1).lines(perpends);
      form.fillOnly("#2F3542").points(pts, 5, "circle");


      form.composite('destination-out');



      form.stroke(false).fill(
        radialBackGroundReversed(
          Circle.fromCenter(new Pt(width, height), height / 3.5),
          Circle.fromCenter(new Pt(width, height), height)
        )
      // ).rect(Rectangle.from([0, 0], width, height));
      ).rect(space.innerBound);
      form.composite('xor');

      form.stroke(false).fill(
        radialBackGround(
          Circle.fromCenter(new Pt(width, height), height / 6),
          Circle.fromCenter(new Pt(width, height), height / 1.5)
        )
      // ).rect(Rectangle.from([0, 0], width, height));
    ).rect(space.innerBound);




      // var h = space.height;
      // var w = space.width;
      //
      // var backY, backX;
      // if(w>h){
      //   backY = h/6;
      //   backX = h/1.5;
      // }else{
      //   backY = w/6;
      //   backX = w/1.5;
      // }



    }
  });

  space.bindMouse().bindTouch().play();

})();

$(window).resize(function() {
  // space.pause();
  width = window.innerWidth;
  height = window.innerHeight;
  // space.clear();

  // space.resume();

  docStyle.setProperty('--overlay-position', Math.round(currentSection.item.offsetTop) + 'px');

  docStyle.setProperty('--navbar-height', nav.offsetTop + 'px');

  // space.resume();
});
