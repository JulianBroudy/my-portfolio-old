// var space = new CanvasSpace("#pts");
// space.setup({ bgcolor: "#fff" });
// Pts.quickStart( "#pts","transparent")( t => form.point( space.pointer, 10 ) );
// space.bindMouse().bindTouch().play();
Pts.namespace(window);
const docStyle = document.documentElement.style;

(function() {

  /* Because I would like to have some more properties that
     I will be using (not showing the usage here) */
  function MyPoint(thePoint, brightness) {
    this.thePoint = thePoint;
    this.brightness = brightness;
    this.direction = Math.random() < 0.5 ? -1 : 1;
  }

  var space = new CanvasSpace("#overlay").setup({
    // bgcolor: "#2F3542",
    bgcolor: "transparent",
    // bgcolor: "black",
    // retina: true,
    resize: true
  });

  var form = space.getForm();
  var mainPath = [new Pt(), new Pt(-Util.randomInt(20), 0)];
  let points;
  let pts;
  let radial = form.gradient([
    [0.1, `rgba(255, 255, 255,1)`],
    [0.7, `rgba(0, 0, 0,0)`]
  ]);
  let radialBackGround = form.gradient([
    // [0.1, `rgba(255, 255, 255, 0.05)`],
    [1, `rgba(47, 53, 66, 1)`],
    // [0.7, `rgba(47, 53, 66, 1)`],
    // [0.5, `rgba(47, 53, 66, 0.5)`],
    // [0.5, `rgba(47, 53, 66, 0.5)`],
    [0, `rgba(47, 53, 66,0)`]
  ]);
  let radialBackGroundReversed = form.gradient([
    // [0.1, `rgba(255, 255, 255, 0.05)`],
    [0.1, `rgba(47, 53, 66, 1)`],
    // [0.5, `rgba(47, 53, 66, 0.5)`],
    [1, `rgba(47, 53, 66,0.05)`]
  ]);
  space.add({
    start: (bound) => {
      if (!points) {
        points = [];
        pts = [];
        for (let i = 0; i < 100; i++) {
          var point = new Pt({
            x: Util.randomInt(20) * i,
            y: Util.randomInt(20) * i
            /* The next line is my attemp to add 3rd coordinate */
            // ,z: Util.randomInt(20) * i
          });

          pts.push(point);
          points[i] = new MyPoint(point, 0.7);
        }
      }
    },

    animate: (time, ftime) => {


      // form.fill(
      // radial( Circle.fromCenter(space.pointer, space.center.y/2), Circle.fromCenter(space.pointer, space.size.y*1.5) )
      // ).rect( space.innerBound );

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
        //     points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.xz);
        /*OR*/
        //     points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.yz);
      }
      // Geom.rotate2D(pts,Const.one_degree, space.center,Const.xy);
      /*OR*/
      // Geom.rotate2D(pts,Const.one_degree, space.center,Const.xz);
      /*OR*/
      // Geom.rotate2D(pts,Const.one_degree, space.center,Const.yz);

      let perpends = pts.map((p) => [p, Line.perpendicularFromPt(mainPath, p)]);

      form.strokeOnly("#2F3542", 1).lines(perpends);
      form.fillOnly("#2F3542").points(pts, 5, "circle");



      // form.composite('source-over');
      form.composite('xor');
      // form.fill(
      //   radialBackGround(
      //     Circle.fromCenter(new Pt(space.width * 0.9, space.height), space.center.x / 2000),
      //     // Circle.fromCenter(new Pt(space.width * 0.8, space.height * 0.8), space.center.x / 2)
      //     Circle.fromCenter(new Pt(space.width * 0.9, space.height), space.center.y)
      //   )
      // ).rect(space.innerBound);



      // form.fill("black").rect(space.innerBound);



      // form.fill(
      //   radialBackGround(Circle.fromCenter(space.pointer, space.center.y / 10),
      //   Circle.fromCenter(space.pointer, space.size.y / 5))
      // ).rect(space.innerBound);

      // form.composite('source-in');
      form.fill(
        radialBackGround(
          // Circle.fromCenter(new Pt(space.width * 1, space.height), space.center.y),
          // Circle.fromCenter(new Pt(space.width * 1, space.height), space.center.x)
          Circle.fromCenter(new Pt(space.width * 1, space.height), 140),
          Circle.fromCenter(new Pt(space.width * 1, space.height), 600)
        )
      ).rect(space.innerBound);
      // console.log("x:"+space.pointer.x);
      // console.log("y:"+space.pointer.y);

      // form.composite('xor');



      // form.composite('destination-over');

      // form.composite('source-out');

      // form.fill(
      //   radialBackGround(
      //     Circle.fromCenter(new Pt(space.width * 0.9, space.height), space.center.x / 2000),
      //     Circle.fromCenter(new Pt(space.width * 0.9, space.height), space.center.y)
      //   )
      // ).rect(space.innerBound);


      // form.composite('xor');

      // form.fillOnly("#2F3542").point( space.pointer, 200, "circle" );



      // form.composite('source-in');
      // form.composite('destination-in');
      // form.composite('destination-atop');



      // form.composite('source-atop');



      // form.composite('source-out');



      // form.fill(
      //   radialBackGround(Circle.fromCenter(space.width - space.width * 0.2, space.height-space.height * 0.2),
      //     Circle.fromCenter(space.width - space.width * 0.4, space.height-space.height * 0.4))
      // ).rect(space.innerBound);
      /*
      form.fill(
        radialBackGround(Circle.fromCenter(space.width * 0.8, space.height * 0.8),
          Circle.fromCenter(space.width * 0.6, space.height * 0.6))
      ).rect(space.innerBound);
      */
      //

    }
  });

  space.bindMouse().bindTouch().play();

})();

// (function() {
//
//   function MyPoint(thePoint, brightness) {
//     this.thePoint = thePoint;
//     this.brightness = brightness;
//     this.direction = Math.random() < 0.5 ? -1 : 1;
//   }
//
//   var space = new CanvasSpace("#pts").setup({
//     // bgcolor: "#99eeff",
//     retina: true,
//     resize: true
//   });
//
//   var form = space.getForm();
//   var mainPath = [new Pt(), new Pt(-Util.randomInt(20), 0)];
//   let points;
//   let pts;
//   let radial = form.gradient([
//     [0.1, `rgba(255, 255, 255,1)`],
//     [0.7, `rgba(0, 0, 0,0)`]
//   ]);
//
//   space.add({
//     start: (bound) => {
//       if (!points) {
//         points = [];
//         pts = [];
//         for (let i = 0; i < 100; i++) {
//           var point = new Pt({
//             x: Util.randomInt(20) * i,
//             y: Util.randomInt(20) * i
//             /* The next line is my attemp to add 3rd coordinate */
//             // ,z: Util.randomInt(20) * i
//           });
//
//           pts.push(point);
//           points[i] = new MyPoint(point, 0.7);
//         }
//       }
//     },
//
//     animate: (time, ftime) => {
//
//
//       // form.fill(
//       // radial( Circle.fromCenter(space.pointer, space.center.y/2), Circle.fromCenter(space.pointer, space.size.y*1.5) )
//       // ).rect( space.innerBound );
//
//       /* The following for loop and its alternative "Geom.rot..." work both
//          with and without the z coordinate, and it gives the same result: points rotate.*/
//
//       // for (let i = 0; i < 100; i++) {
//       // points[i].thePoint.rotate2D(Const.one_degree / 12, space.center);
//       // }
//       /* For's alternative */
//       // Geom.rotate2D(pts,Const.one_degree, space.center);
//
//
//
//       /* The following for loop and its alternative "Geom.rot..." does not create the
//          expected result whether I include the z coordinate or not! */
//
//       for (let i = 0; i < 100; i++) {
//         points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.xy);
//         /*OR*/
//         //     points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.xz);
//         /*OR*/
//         //     points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.yz);
//       }
//       // Geom.rotate2D(pts,Const.one_degree, space.center,Const.xy);
//       /*OR*/
//       // Geom.rotate2D(pts,Const.one_degree, space.center,Const.xz);
//       /*OR*/
//       // Geom.rotate2D(pts,Const.one_degree, space.center,Const.yz);
//
//
//       let perpends = pts.map((p) => [p, Line.perpendicularFromPt(mainPath, p)]);
//       // form.fill("black").rect(space.innerBound);
//       form.strokeOnly("#123", 1).lines(perpends);
//       form.fillOnly("#123").points(pts, 5, "circle");
//
//       form.composite('xor');
//
//       form.fill(
//         radial(Circle.fromCenter(space.pointer, space.center.y / 10),
//           Circle.fromCenter(space.pointer, space.size.y / 5))
//       ).rect(space.innerBound);
//
//
//       // form.point(space.pointer, 10);
//
//
//
//     }
//   });
//
//   space.bindMouse().bindTouch().play();
//
//
//   // var run = Pts.quickStart("#pts", "transparent");
//   // run((time, ftime) => {
//   //   let radial = form.gradient([
//   //     [0.1, `rgba(255, 255, 255,1)`],
//   //     [0.7, `rgba(0, 0, 0,0)`]
//   //   ]);
//   //   form.composite('xor');
//   //   form.fill("black").rect(space.innerBound);
//   //
//   //   form.fill(
//   //     radial(Circle.fromCenter(space.pointer, space.center.y / 10),
//   //       Circle.fromCenter(space.pointer, space.size.y / 5))
//   //   ).rect(space.innerBound);
//   //
//   // });
//
// })();



// (function() {
//
//   /**
//    * Option 1: a single one-liner
//    */
//   Pts.quickStart( "#overlay","transparent" )( t => form.point( space.pointer, 5 ) );
//
//
//   /**
//    * Option 2: Same quickStart mode, but storing the animate function in a `run` variable.
//    */
//   // let run = Pts.quickStart("#overlay", "transparent");
//   // run((time, ftime) => {
//   //   form.point(space.pointer, 10);
//   //   form.fillOnly("#123").points(pts, 5, "circle")
//   // });
//
//
//   /**
//    * Option 3: Using quickStart to initiate space and form variables, then add a player to space.
//    */
//   // Pts.quickStart( "#pt", "#ee99ff" );
//   // space.add( {
//   //   animate: (time, ftime) => { form.point( space.pointer, 10 ); }
//   // });
//
//
//   /**
//    * Option 4: Advanced mode to initiate space and form, allowing for more options
//    */
//   // var space = new CanvasSpace("#pt").setup({ bgcolor: "#99eeff", retina: true, resize: true });
//   // var form = space.getForm();
//   // space.add( {
//   //   start: (bound) => {},
//
//   //   animate: (time, ftime) => {
//   //     form.point( space.pointer, 10 );
//   //   },
//
//   //   action: (type, x, y) => {}
//   // });
//
//
//   //// ----
//
//   space.bindMouse().bindTouch().play();
//
// })();
// $(document).ready(function() {
//
//     /* Because I would like to have some more properties that
//        I will be using (not showing the usage here) */
//     function MyPoint(thePoint, brightness) {
//         this.thePoint = thePoint;
//         this.brightness = brightness;
//         this.direction = Math.random() < 0.5 ? -1 : 1;
//     }
//
//     var space = new CanvasSpace("#pts").setup({
//         bgcolor: "#99eeff",
//         retina: true,
//         resize: true
//     });
//
//     var form = space.getForm();
//     var mainPath = [new Pt(), new Pt(-Util.randomInt(20), 0)];
//     let points;
//     let pts;
//     let radial = form.gradient(["#f00", "#00f"]);
//     // form.fill( grad( c1, c2 ) ).circle( c1 )
//
//
//     space.add({
//         start: (bound) => {
//             if (!points) {
//                 points = [];
//                 pts = [];
//                 for (let i = 0; i < 100; i++) {
//                     var point = new Pt({
//                         x: Util.randomInt(20) * i,
//                         y: Util.randomInt(20) * i
//                         /* The next line is my attemp to add 3rd coordinate */
//                         // ,z: Util.randomInt(20) * i
//                     });
//
//                     pts.push(point);
//                     points[i] = new MyPoint(point, 0.7);
//                 }
//             }
//         },
//
//         animate: (time, ftime) => {
//
//                 form.fill(
//                 radial( Circle.fromCenter(space.pointer, space.center.y/2), Circle.fromCenter(space.pointer, space.size.y*1.5) )
//                 ).rect( space.innerBound );
//
//             /* The following for loop and its alternative "Geom.rot..." work both
//                with and without the z coordinate, and it gives the same result: points rotate.*/
//
//             // for (let i = 0; i < 100; i++) {
//                 // points[i].thePoint.rotate2D(Const.one_degree / 12, space.center);
//             // }
//             /* For's alternative */
//             // Geom.rotate2D(pts,Const.one_degree, space.center);
//
//
//
//             /* The following for loop and its alternative "Geom.rot..." does not create the
//                expected result whether I include the z coordinate or not! */
//
//             for (let i = 0; i < 100; i++) {
//                 points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.xy);
//                     /*OR*/
//                 //     points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.xz);
//                     /*OR*/
//                 //     points[i].thePoint.rotate2D(Const.one_degree / 12, space.center, Const.yz);
//             }
//             // Geom.rotate2D(pts,Const.one_degree, space.center,Const.xy);
//                 /*OR*/
//             // Geom.rotate2D(pts,Const.one_degree, space.center,Const.xz);
//                 /*OR*/
//             // Geom.rotate2D(pts,Const.one_degree, space.center,Const.yz);
//
//
//             let perpends = pts.map((p) => [p, Line.perpendicularFromPt(mainPath, p)]);
//
//             form.strokeOnly("#123", 1).lines(perpends);
//             form.fillOnly("#123").points(pts, 5, "circle");
//             form.point(space.pointer, 10);
//         }
//     });
//
//     space.bindMouse().bindTouch().play();
//
// })();
