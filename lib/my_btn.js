const docStyle = document.documentElement.style;
const my_btn = document.querySelector('a');
const boundingClientRect = my_btn.getBoundingClientRect();

my_btn.onmousemove = function (e) {

  const x = e.clientX - boundingClientRect.left;
  const y = e.clientY - boundingClientRect.top;

  const xc = boundingClientRect.width / 2;
  const yc = boundingClientRect.height / 2;

  const dx = x - xc;
  const dy = y - yc;

  docStyle.setProperty('--rx', `${dy / -1}deg`);
  docStyle.setProperty('--ry', `${dx / 10}deg`);

};

my_btn.onmouseleave = function (e) {

  docStyle.setProperty('--ty', '0');
  docStyle.setProperty('--rx', '0');
  docStyle.setProperty('--ry', '0');

};

my_btn.onmousedown = function (e) {

  docStyle.setProperty('--tz', '-25px');

};

document.body.onmouseup = function (e) {

  docStyle.setProperty('--tz', '-12px');

};
