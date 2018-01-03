var Buttons = function(opts) {
	this.pin = opts.pin;
	this.blynk = opts.blnk;
}

exports.connect = function(opts) {
	return new Buttons(opts);
}

Buttons.prototype.on = function() {
	vPin = new blynk.VirtualPin(this.pin);
	spinn;
	switch (this.pin) {
	case 0:
		pinn = P0;
		break;
	case 1:
		pinn = P1;
		break;
	case 2:
		pinn = P2;
		break;
	case 3:
		pinn = P3;
		break;
	case 4:
		pinn = P4;
		break;
	case 5:
		pinn = P5;
		break;
	case 6:
		pinn = P6;
		break;
	case 7:
		pinn = P7;
		break;
	case 8:
		pinn = P8;
		break;
	case 9:
		pinn = P9;
		break;
	case 10:
		pinn = P10;
		break;
	case 11:
		pinn = P11;
		break;
	case 12:
		pinn = P12;
		break;
	case 13:
		pinn = P13;
		break;
	}
	console.log(pinn);

	vPin.on('write', function(par) {
		digitalWrite(pinn, par);
	});
}