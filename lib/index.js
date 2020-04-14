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
    console.log("lastClickedLink: "+lastClickedLink);
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
    console.log("new lastClickedLink: "+lastClickedLink);

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
//   const xc = buttonsBoundingClient.width / 2
//   const yc = buttonsBoundingClient.height / 2
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

var width, height;
var content, bounds;
var needsRestart = false;
var homePageShowing = true;


function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
}

var timeline;
var first_time = true;


function translate() {
  resize();
  timeline = gsap.timeline({onComplete: function(){
    if(first_time){
      fullpage_api.setAllowScrolling(true);
      fullpage_api.setKeyboardScrolling(true);
      first_time = false;
    }
  }});

  timeline.from(".section1__container__header", {
    yPercent: -100,
    scale: 0.8,
    opacity: 0,
    duration: 9,
    ease: "elastic.out(1.2,0.3)",
  }).from("#welcome_text-first_line", {
    // y: -100,
    // yPercent: -500,
    scale: 0,
    opacity: 0,
    duration: 6,
    // ease: "power.out(4)",
    // ease: "back.out(4)",
    // ease: "elastic.out(1.2,0.8)",
    // ease: "custom3"
    ease: "elastic.out(1,0.3)"
    // delay: 0.5
  }, "<2").from("#welcome_text-second_line", {
    // y: -100,
    yPercent: 500,
    scale: 0,
    opacity: 0,
    duration: 2,
    ease: "power.out(4)",
    // ease: "back.out(2)",
  }, "<1.5").from(".section1__container__footer", {
    // y: -100,
    // xPercent: -500,
    opacity: 0,
    y: -500,
    scale: 0,
    rotate: 2400,
    duration: 3.5,
    // ease: "bounce.out",
    ease: "elastic.out(2.5, 0.3)",
  }, "<1");
}

$(window).resize(function() {
  if(timeline.isActive()){
    timeline.pause();
  }
  if(homePageShowing){
    timeline.restart();
  } else{
    needsRestart = true;
  }


  // timeline.invalidate();
  // first_time = false;
  // timeline.kill();
  // gsap.set("#top-quote, #welcome_text-first_line,#welcome_text-second_line, #im_intrigued", {
  //   clearProps: true
  // });
  // translate();
});

translate();
let tm = gsap.timeline();
tm.from(".side_container", {
  opacity: 0,
  yPercent: 100,
  scale: 0.5,
  duration: 3.5,
  delay: 7,
  ease: "elastic.out(1, 0.75)",
});



// const nav = document.querySelector("#myNavbar");
// console.log(nav);
// console.log(window.scrollY);
// console.log(height);
// const topOfNav = nav.offsetTop;
//
// function handleNav(){
//   console.log(window.scrollY);
//
//   console.log(window.scrollY, height)
//   if(window.scrollY >= window.innerHeight){
//     nav.classList.delete('hidden');
//   }else{
//     nav.classList.add('hidden');
//   }
// }

// window.addEventListener('scroll',handleNav);


// $(document).ready(function(){
//     $("ul.nav li a[href^='#']").click(function(){
//         $("html, body").stop().animate({
//             scrollTop: $($(this).attr("href")).offset().top
//         }, 400);
//     });
// });
