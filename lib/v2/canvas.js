Pts.namespace(window);
const docStyle = document.documentElement.style;

(function() {

  function MyPoint(thePoint, brightness) {
    this.thePoint = thePoint;
    this.brightness = brightness;
    this.direction = Math.random() < 0.5 ? -1 : 1;
  }

  var space = new CanvasSpace("#overlay").setup({
    // bgcolor: "#2F3542",
    bgcolor: "transparent",
    // bgcolor: "black",
    retina: true,
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
    [1, `rgba(47, 53, 66, 1)`],
    // // [0, `rgba(47, 53, 66,0)`]
    [0, `transparent`]

    // [0, `rgba(47, 53, 66, 1)`],
    // [0, `rgba(47, 53, 66,0)`]
    // [1, `transparent`]
  ]);
  let radialBackGroundReversed = form.gradient([
    // // [0.1, `rgba(255, 255, 255, 0.05)`],
    // [0.1, `rgba(47, 53, 66, 1)`],
    // // [0.5, `rgba(47, 53, 66, 0.5)`],
    // [1, `rgba(47, 53, 66,0.05)`]

    [0.5, `rgba(47, 53, 66, 1)`],
    // [0.6, `rgba(47, 53, 66, 0.9)`],
    [0.7, `rgba(47, 53, 66, 0.8)`],
    // [0.5, `rgba(47, 53, 66, 0.9)`],
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
            y: Util.randomInt(20) * i
              /* The next line is my attemp to add 3rd coordinate */
              ,
            z: Util.randomInt(20) * i
          });

          pts.push(point);
          points[i] = new MyPoint(point, 0.7);
        }
      }
    },

    animate: (time, ftime) => {
      form.composite('source-over');


      /* The following for loop and its alternative "Geom.rot..." work both
         with and without the z coordinate, and it gives the same result: points rotate.*/

      // for (let i = 0; i < 100; i++) {
      // points[i].thePoint.rotate2D(Const.one_degree / 12, space.center);
      // }
      /* For's alternative */
      // Geom.rotate2D(pts,Const.one_degree, space.center);


   // form.fill("white").rect(space.innerBound);


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
      // form.composite('source-in');

      // form.strokeOnly("#2F3542", 1).lines(perpends);
      // form.fillOnly("#2F3542").points(pts, 5, "circle");
      form.strokeOnly("#2F3542", 1).lines(perpends);
      form.fillOnly("#2F3542").points(pts, 5, "circle");

      // form.fill(
      //   radialBackGroundReversed(Circle.fromCenter(space.pointer, space.center.y), Circle.fromCenter(space.pointer, space.size.y))
      // ).circle(
      //   Circle.fromCenter(space.pointer, 100));

      form.composite('destination-out');



      form.fill(
        radialBackGroundReversed(
          // Circle.fromCenter(new Pt(space.width * 1, space.height), space.height/1.5),
          // Circle.fromCenter(new Pt(space.width * 1, space.height), space.height/6)
          Circle.fromCenter(new Pt(space.width * 1, space.height), space.height/3.5),
          Circle.fromCenter(new Pt(space.width * 1, space.height), space.height )
        )
      ).rect(space.innerBound);
      form.composite('xor');
// form.fill("black").rect(space.innerBound);

            form.fill(
              radialBackGround(
                // Circle.fromCenter(new Pt(space.width * 1, space.height), space.height/1.5),
                // Circle.fromCenter(new Pt(space.width * 1, space.height), space.height/6)
                Circle.fromCenter(new Pt(space.width * 1, space.height), space.height / 6),
                Circle.fromCenter(new Pt(space.width * 1, space.height), space.height / 1.5)
              )
            ).rect(space.innerBound);




      //
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


      // console.log(space.height);

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
