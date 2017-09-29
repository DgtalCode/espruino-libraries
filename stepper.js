/**
 * Êîíñòðóêòîð îáúåêòà stepper
 * @constructor
 * @param {object} pins - îáúåêò ñî ñâîéñòâàìè step, direction, enable òèïà Pin
 * @param {Object} opts - îáúåêò ñî ñâîéñòâàìè pps (ñêîðîñòü) è holdPower (pwm)
 */
var Stepper = function(pins, opts) {
  this._pins = pins;
  opts = opts || {};

  this._pps = opts.pps || 20;
  this._holdPower = opts.holdPower || 0;

  this._pins.step.mode('output');
  this._pins.enable.mode('output');
  this._pins.direction.mode('output');

  this.hold();

  this._intervalId = null;
};

/**
 * Ðåãóëèðóåò ØÈÌ ïîäà÷è ïèòàíèÿ íà äâèãàòåëü
 * @param {float} power - Ñêâàæíîñòü ØÈÌ îò 0 äî 1
 */
Stepper.prototype.hold = function(power) {
  
  if (this._intervalId !== null) {
    clearInterval(this._intervalId);
    this._intervalId = null;
  }

  if (typeof(power) === 'undefined') {
    power = this._holdPower;
  }

  if(power == 1)
    power=0;
  else
    power=1;
  
  analogWrite(this._pins.enable, power);
};
/**
 * Ïðîâîðà÷èâàåò âàë íà step øàãîâ, ïîñëå ÷åãî âûïîëíÿåò callback.
 * @param {number} steps - êîëè÷åñòâî øàãîâ. Ïðè îòðèöàòåëüíîì çíà÷åíèè ïðîèñõîäèò äâèæåíèå íàçàä
 * @param {function} callback - ôóíêöèÿ, âûïîëíÿåìàÿ ïîñëå ïðîâîðîòà âàëà
 */
Stepper.prototype.rotate = function(steps, callback) {

  if (steps === undefined) {
    steps = 1;
  }

  if (steps < 0) {
    this._pins.direction.write(1);
    steps *= -1;
  } else {
    this._pins.direction.write(0);
  }

  var self = this;
  this._intervalId = setInterval(function() {
    if (steps > 0){
      digitalPulse(self._pins.step, 1, 1);
      steps--;
    } else {
      if (callback) {
        callback();
      }
    }
  }, 1000 / this._pps);
};

/**
 * Ðåãóëèðóåò êîëè÷åñòâî øàãîâ â ñåêóíäó
 */
Stepper.prototype.pps = function(pps) {
  if (pps === undefined) return this._pps;
  this._pps = pps;
  return this;
};

/**
 * Ïåðåóñòàíàâëèâàåò çíà÷åíèå óäåðæàíèÿ âàëà çàäàííîå ïðè èíèöèàëèçàöèè
 */
Stepper.prototype.holdPower = function(holdPower) {
  if (holdPower === undefined) return this._holdPower;
  this._holdPower = holdPower;
  return this;
};

/**
 * Ýêñïîðò ôóíêöèè ñîçäàíèÿ îáúåêòà Stepper
 * @param {object} pins - îáúåêò ñî ñâîéñòâàìè step, direction, enable òèïà Pin
 * @param {Object} opts - îáúåêò ñî ñâîéñòâàìè pps (ñêîðîñòü) è holdPower (pwm)
 */
exports.connect = function(pins, opts) {
  return new Stepper(pins, opts);
};
