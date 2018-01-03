var Ls = require('@amperka/ultrasonic').connect({
	trigPin : P12,
	echoPin : P11
});
var Rs = require('@amperka/ultrasonic').connect({
	trigPin : P9,
	echoPin : P8
});

var DoorChecker = function(opts) {
	opts = opts || {};
}

exports.connect = function(opts) {
	return new DoorChecker(opts);
}

DoorChecker.prototype.checking = function() {
	chel = 0;
	setInterval(function() {
		Ls.ping(function(err, value) {
			console.log("Ls = " + value);
			if (value < 20) {
				Rs.ping(function(err, value) {
					if (value < 20) {
						chel--;
					}
				}, 'cm');
			}
		}, 'cm');

		Rs.ping(function(err, value) {
			console.log("Rs = " + value);
			if (value < 20) {
				Ls.ping(function(err, value) {
					if (value < 20) {
						chel++;
					}
				}, 'cm');
			}
		}, 'cm');
		console.log("CHEL = " + chel);
	}, 200);
}

function timer(){
	i = 0;
	setInterval(function(){i++}, 100)
}

DoorChecker.prototype.checking1 = function() {
	timer();
	flag1 = false, flag2 = false, t1 = 0, t2 = 0, chel = 0;
	var date = new Date();
	setInterval(function() {
		var date = new Date();
		Ls.ping(function(err, value) {
			console.log("Ls = " + value);
			if (value < 20) {
				flag1 = true;
				t1 = i;
			}
		}, 'cm');

		Rs.ping(function(err, value) {
			console.log("Rs = " + value);
			if (value < 20) {
				flag2 = true;
				t2 = i;
			}
		}, 'cm');
		
		if (flag1 && flag2) {
			if (t1 > t2)
				chel--;
			if(t1 < t2)
				chel++;
			flag1 = flag2 = false;
			t1 = t2 = 0;
		}
		
		if((i - t1) > 400 || (i - t2) > 300)
			i=0;
		
		console.log("chel = " + chel + "       time: " + i);
	}, 200);
}