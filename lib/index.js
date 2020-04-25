//    ______               _     _      _     _
//   |  ____|             | |   | |    (_)   | |
//   | |____   _____ _ __ | |_  | |     _ ___| |_ ___ _ __   ___ _ __ ___
//   |  __\ \ / / _ \ '_ \| __| | |    | / __| __/ _ \ '_ \ / _ \ '__/ __|
//   | |___\ V /  __/ | | | |_  | |____| \__ \ ||  __/ | | |  __/ |  \__ \
//   |______\_/ \___|_| |_|\__| |______|_|___/\__\___|_| |_|\___|_|  |___/
//

const homeLink = document.querySelector("#home-link");
const aboutMeLink = document.querySelector("#aboutMe-link");
const myProjectsLink = document.querySelector("#myProjects-link");
const contactMeLink = document.querySelector("#contactMe-link");
const loadingSpinner = document.querySelector("#loading-spinner");

let lastClickedLink = undefined;
let lastClickedLinkClass = undefined;

homeLink.addEventListener("click", function() {
  switchActiveLinkTo(homeLink);
});
aboutMeLink.addEventListener("click", function() {
  switchActiveLinkTo(aboutMeLink);
});
myProjectsLink.addEventListener("click", function() {
  switchActiveLinkTo(myProjectsLink);
});
contactMeLink.addEventListener("click", function() {
  switchActiveLinkTo(contactMeLink);
});


function switchActiveLinkTo(link) {
  // homeLink.classList.add("active-aboutMeLink");
  // lastClickedLink = homeLink;

  if (link != lastClickedLink) {
    if (lastClickedLink != undefined) {
      lastClickedLink.classList.remove(lastClickedLinkClass);
    }
    console.log("lastClickedLink: " + lastClickedLink);
    switch (link) {
      case homeLink:
        lastClickedLinkClass = "active-homeLink";
        break;
      case aboutMeLink:
        lastClickedLinkClass = "active-aboutMeLink";
        break;
      case myProjectsLink:
        lastClickedLinkClass = "active-myProjectsLink";
        break;
      case contactMeLink:
        lastClickedLinkClass = "active-contactMeLink";
        break;
    }
    link.classList.add(lastClickedLinkClass);
    lastClickedLink = link;
    lastClickedLink.focus();
    console.log("new lastClickedLink: " + lastClickedLink);

  }
}



//    _   _ _            ____        _   _
//   | \ | (_)          |  _ \      | | | |
//   |  \| |_  ___ ___  | |_) |_   _| |_| |_ ___  _ __
//   | . ` | |/ __/ _ \ |  _ <| | | | __| __/ _ \| '_ \
//   | |\  | | (_|  __/ | |_) | |_| | |_| || (_) | | | |
//   |_| \_|_|\___\___| |____/ \__,_|\__|\__\___/|_| |_|
//


// const docStyle = document.documentElement.style
// const checkMeOutBTN = document.querySelector('a')
// let buttonsBoundingClient = checkMeOutBTN.getBoundingClientRect()
//
// checkMeOutBTN.onmousemove = function(e) {
//   const x = e.clientX - buttonsBoundingClient.left
//   const y = e.clientY - buttonsBoundingClient.top
//
//   const xc = buttonsBoundingClient.winWidth / 2
//   const yc = buttonsBoundingClient.winHeight / 2
//
//   const dx = x - xc
//   const dy = y - yc
//
//   docStyle.setProperty('--rx', `${ dy/-1.5 }deg`)
//   docStyle.setProperty('--ry', `${ dx/10 }deg`)
// }
//
// checkMeOutBTN.onmouseleave = function(e) {
//   docStyle.setProperty('--ty', '0')
//   docStyle.setProperty('--rx', '0')
//   docStyle.setProperty('--ry', '0')
// }
//
// checkMeOutBTN.onmousedown = function(e) {
//   docStyle.setProperty('--tz', '-25px')
// }
//
// document.body.onmouseup = function(e) {
//   docStyle.setProperty('--tz', '-12px')
// }


//                   _                 _   _
//       /\         (_)               | | (_)
//      /  \   _ __  _ _ __ ___   __ _| |_ _  ___  _ __  ___
//     / /\ \ | '_ \| | '_ ` _ \ / _` | __| |/ _ \| '_ \/ __|
//    / ____ \| | | | | | | | | | (_| | |_| | (_) | | | \__ \
//   /_/    \_\_| |_|_|_| |_| |_|\__,_|\__|_|\___/|_| |_|___/
//

var winWidth, winHeight;
var content, bounds;
var needsRestart = false;
var homePageShowing = true;


function resize() {
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
}

var timeline;
var first_time = true;

var blockSt, blockEn, quoteSt, quoteEn;
let spinnerRight = loadingSpinner.getBoundingClientRect().right;
let spinnerLeft = loadingSpinner.getBoundingClientRect().left;
let spinnerTop = loadingSpinner.getBoundingClientRect().top;
let spinnerBottom = loadingSpinner.getBoundingClientRect().bottom;

function translate() {
  resize();
  timeline = gsap.timeline({
    onComplete: function() {
      if (first_time) {
        fullpage_api.setAllowScrolling(true);
        fullpage_api.setKeyboardScrolling(true);
        first_time = false;
      }
    }
  });

  timeline.fromTo("#loading-spinner", {
    opacity: 0,
    // y: 0.5 * winHeight - loadingSpinner.getBoundingClientRect().bottom ,
    // y: -200 ,
    // x: 0.5 * winWidth - ((loadingSpinner.getBoundingClientRect().right - loadingSpinner.getBoundingClientRect().left)/2),
    scale: 0,
    rotate: -420,
  }, {
    scale: 3,
    opacity: 1,
    rotate: 0,
    duration: 4,
    // duration: 3,
    // ease: "power4.in"
    ease: "elastic.out(1, 0.6)",
  }).from(".section1__container__header", {
    // yPercent: -100,
    // scale: 0.8,
    // opacity: 0,
    // duration: 9,
    // ease: "elastic.out(1.2,0.3)",
    scale: 0.1,
    opacity: 0,
    duration: 3,
    // ease: "power4.in",
    ease: "circ.in"

  }, "<1").to("#loading-spinner", {
    x: winWidth - spinnerRight - (spinnerRight - spinnerLeft) * 2 / 3,
    y: winHeight - spinnerBottom - (spinnerBottom - spinnerTop) * 2 / 3,
    rotate: 360,
    // reverse: true,
    scale: 2,
    duration: 5,

  }, "+=1").
  /*to("#pt", {
      // scale: 1,
      opacity: 1,
      duration: 5,
      // delay: 1,

    }, "<0.5").*/
  from("#welcome_text-first_line", {
    // y: -100,
    // yPercent: -500,
    scale: 0,
    opacity: 0,
    duration: 3,
    // ease: "power.out(4)",
    // ease: "back.out(4)",
    // ease: "elastic.out(1.2,0.8)",
    // ease: "custom3"
    ease: "elastic.out(1,0.3)",
    onStart: function() {
      document.getElementById('pt').classList.add('canvas-show');
    }
    // delay: 0.5
  }, "-=3").from("#welcome_text-second_line", {
    // y: -100,
    yPercent: 500,
    scale: 0,
    opacity: 0,
    duration: 3,
    ease: "power.out(4)",
    // ease: "back.out(2)",
  }, "<").to("#loading-spinner", {
    scale: 1,
    opacity: 0,
    duration: 1,
  }, "+=0.5").from(".section1__container__footer", {
    y: 300,
    opacity: 0,
    scale: 0.2,
    duration: 2,
    ease: "elastic.out(2, 0.1)"
  });
}

var resizeTimer;

$(window).on('resize', function(e) {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    console.log('resized');
    resize();

    timeline.to(".side_container", {
      x: winWidth - 40 - 40 - 40,
      duration: 1
    });
  }, 400);

});


translate();
let tm = gsap.timeline();

tm.from(".side_container", {
  opacity: 0,
  yPercent: 100,
  scale: 0.5,
  duration: 3,
  delay: 9,
  ease: "elastic.out(1, 0.75)",
}).to("#menu", {
  opacity: 1,
  duration: 2,
}, "<1").to(".side_container", {
  x: winWidth - 40 - 40 - 40,
  duration: 3,
  // delay: 12,
  ease: "elastic.out(1, 0.75)",
}, "<1");
