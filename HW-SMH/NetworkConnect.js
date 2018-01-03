var Net = function(){
}

exports.connect = function() {
	PrimarySerial.setup(115200);
	var SSID = 'interzet48';
	var PSWD = '09876543210';
	var wifi = require('@amperka/wifi').setup(PrimarySerial, function(err) {
		// подключаемся к Wi-Fi сети
		wifi.connect(SSID, PSWD, function(err) {
			console.log('Connected');
		});
	});
	return new Net();
}

Net.prototype.BlynkCon = function(key){
	var BlynkLib = require('https://github.com/DanSpark1/espruino-libraries/blob/master/HW-SMH/BlynkLib.js');
	var blynk = new BlynkLib.Blynk(key);
	return blynk;
}