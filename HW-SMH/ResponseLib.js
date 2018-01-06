var RespCheck = function(opts) {
	opts = opts || {};
	this._termPin = opts.termPin;
	this.blynk = opts.blnk;
}

exports.connect = function(opts) {
	return new RespCheck(opts);
}

RespCheck.prototype.listen = function() {
	var str, a, b;
	var term = new blynk.WidgetTerminal(this._termPin);
	term.on('write', function(data) {
		console.log(data);
		//для светодиода в корпусе
		//включение
		if (data == "LedOn") {
			led.turnOn();
		}
		//выключение
		if (data == "LedOff")
			led.turnOff();
		//переключение
		if (data == "LedTgl")
			led.toggle();
		//мигние
		if (data.toString().indexOf("LedPulse") != -1) {
			str = data.toString();
			a = str.split(" ")[1];
			b = str.split(" ")[2];
			led.blink(a, b);
		}
		//яркость
		if (data.toString().indexOf("LedBright") != -1) {
			str = data.toString();
			a = str.split(" ")[1];
			led.brightness(a);
		}

		//для пищалки
		//включение
		if (data == "BuzzerdOn")
			buzzer.turnOn();
		//переключение
		if (data == "BuzzerTgl")
			buzzer.toggle();
		//выключение
		if (data == "BuzzerOff")
			buzzer.turnOff();
		//частота писка
		if (data.toString().indexOf("BuzzerFrq") != -1) {
			str = data.toString();
			a = str.split(" ")[1];
			buzzer.frequency(a);
		}
		//тиканье
		if (data.toString().indexOf("BuzzerPulse") != -1) {
			str = data.toString();
			a = str.split(" ")[1];
			b = str.split(" ")[2];
			buzzer.beep(a, b);
		}
		
		//для настольной лампы
		//вкючение
		if (data == "LampOff") {
			lamp.turnOff()
		}
		//выключение
		if (data == "LampOn")
			lamp.turnOn();
		//переключение
		if (data == "LampTgl")
			lamp.toggle();
		//мигание
		if (data.toString().indexOf("LampPulse") != -1) {
			str = data.toString();
			a = str.split(" ")[1];
			b = str.split(" ")[2];
			lamp.blink(a, b);
		}
	});
}