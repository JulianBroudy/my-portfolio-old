var width, height;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
}

var timeline;

function translate() {
  timeline = gsap.timeline();

  timeline.from("#fade1", {
      opacity: 0,
      y: height / 3,
      duration: 1.8,
      ease: "elastic",
      delay: 0.8
    })
    .from("#fade2", {
      opacity: 0,
      y: -height / 3,
      duration: 2,
      ease: "elastic",
    }, "+=0.5").to("#fade1", {
      // y: -height / 3,
      y: function(index, target, targets) { //function-based value
        console.log(window.innerHeight);
        console.log(window.innerHeight/8);

        return window.innerHeight/8;

      },
      ease: "expo",
      duration: 1.7
    });
}

$(window).resize(function() {
  // timeline.stop();
  // timeline.kill();
  resize();
  timeline.restart();
  // translate();
});

resize();
translate();
