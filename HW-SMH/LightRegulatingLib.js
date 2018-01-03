var LightReg = function(opts){
	opts = opts || {};
	this.blynk = opts.blnk;
}

exports.connect = function(opts){
	return new LightReg(opts)
}

var ls = require('@amperka/light-sensor').connect(A0);

LightReg.prototype.regulate = function(param){
	if(param.time > 09 && param.time < 18){
		if(ls.read('lx') < 20 && param.chel != 0 && param.auto == 1){
			digitalWrite(P7, 0);
			digitalWrite(P3, 1);
		}
		else if(param.auto == 1){
			digitalWrite(P7, 1);
			digitalWrite(P3, 0);
		}
	}
}