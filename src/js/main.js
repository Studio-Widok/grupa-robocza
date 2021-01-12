import './../scss/base.scss';
import $ from 'cash-dom';
import Clipboard from 'clipboard';

function parseInput(input, def) {
  return void 0 === input ? def : input;
}

class Box {
  constructor(obj) {
    this.el = obj.el;
    this.start = obj.start;
    this.step = obj.step;
    this.isAnimating = false;
    this.duration = parseInput(obj.duration, 300);
    this.friction = parseInput(obj.friction, 1.1);
    this.amplification = parseInput(obj.amplification, 0.005);
    this.saturation = parseInput(obj.saturation, Infinity);
    this.names = Object.getOwnPropertyNames(this.start);

    this.x = {};
    for (let i = 0; i < this.names.length; i++) {
      this.x[this.names[i]] = {
        value: this.start[this.names[i]],
        target: this.start[this.names[i]],
        isAnimating: false,
        dx: 0,
        percent: 0,
        startTimestamp: 0,
      };
    }
  }

  startAnimation() {
    if (!this.isAnimating) {
      this.animationStep();
    }
  }

  animate(target) {
    const targetNames = Object.getOwnPropertyNames(target);
    for (let i = 0; i < targetNames.length; i++) {
      this.x[targetNames[i]].target = target[targetNames[i]];
      this.x[targetNames[i]].percent = 0;
      this.x[targetNames[i]].startTimestamp = new Date().getTime();
      this.x[targetNames[i]].isAnimating = true;
    }
    this.startAnimation();
    return this;
  }

  animationStep() {
    this.isAnimating = true;
    let nextStep = false;
    const response = {};
    for (let i = 0; i < this.names.length; i++) {
      const c = this.x[this.names[i]];
      if (c.isAnimating) {
        let diff = c.target - c.value;
        c.dx += Math.max(Math.min(diff, this.saturation), -this.saturation);
        c.value += c.dx * this.amplification;
        c.dx /= this.friction;
        diff = c.target - c.value;
        if (Math.abs(c.dx) > 0.01 || Math.abs(diff) > 0.1) {
          nextStep = true;
        }
      }
      response[this.names[i]] = c.value;
    }
    this.step(this.el, response);
    if (nextStep) {
      requestAnimationFrame(() => this.animationStep());
    } else {
      this.isAnimating = false;
    }
  }
}

const width = 50;
const lines = {
  el: $('#line-container'),
  proto: $('.line-proto'),
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  h_bodies: 0,
  v_bodies: 0,
};
const bodies = [];

let t_width = 0;
let t_height = 0;
function resize() {
  lines.height = lines.el.height();
  lines.width = lines.el.width();
  lines.top = (lines.el.outerHeight() - lines.height) / 2;
  lines.left = (lines.el.outerWidth() - lines.width) / 2;
  lines.h_bodies = Math.floor(lines.width / width);
  lines.v_bodies = Math.floor(lines.height / width);
  while (bodies.length < lines.h_bodies * lines.v_bodies) {
    const c = lines.proto.clone().removeClass('line-proto');
    const b = new Box({
      el: {
        container: c,
        paths: c.find('path'),
      },
      start: { r1: 0, r2: 0 },
      step: function (el, x) {
        el.paths.eq(0).attr({ transform: 'rotate(' + x.r1 + ' 50 50)' });
        el.paths.eq(1).attr({ transform: 'rotate(' + x.r2 + ' 50 50)' });
        el.container.css({ transform: 'scale(' + x.s + ')' });
      },
      animationType: 'regulator',
      friction: 1.2,
      amplification: 1 / 60,
      saturation: 1000,
    });
    lines.el.append(b.el.container);
    bodies.push(b);
  }
  if (bodies.length) {
    while (
      bodies.length > lines.h_bodies * lines.v_bodies &&
      bodies.length > 0
    ) {
      bodies.pop().el.container.remove();
    }
  }

  // set positions
  t_width = lines.width % width;
  t_height = lines.height % width;
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].el.container.css({
      left:
        (i % lines.h_bodies) * (width + t_width / (lines.h_bodies - 1)) +
        lines.left,
      top:
        Math.floor(i / lines.h_bodies) *
          (width + t_height / (lines.v_bodies - 1)) +
        lines.top,
    });
  }
}
resize();

const states = [
  { r1: 0, r2: 0 },
  { r1: 0, r2: 0 },
  { r1: 0, r2: 0 },
  { r1: 0, r2: 0 },
  { r1: 90, r2: 90 },
  { r1: 45, r2: 45 },
  { r1: -45, r2: -45 },
  { r1: 0, r2: 90 },
  { r1: -45, r2: 45 },
];

setInterval(function () {
  if (bodies.length) {
    const r = Math.floor(Math.random() * bodies.length);
    const r2 = Math.floor(Math.random() * states.length);
    bodies[r].animate(states[r2]);
  }
}, 200);

const cp = new Clipboard('#write-text');
cp.on('success', function () {
  if (window.getSelection) window.getSelection().removeAllRanges();
  else if (document.selection) document.selection.empty();
  $('#write-text').append(
    $(document.createElement('div'))
      .addClass('tooltip')
      .text('mail skopiowany do schowka')
      .addClass('shown')
  );
  setTimeout(function () {
    $('#write-text .tooltip').removeClass('shown');
    setTimeout(() => {
      $(this).remove();
    }, 300);
  }, 1500);
});
