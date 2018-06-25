

var ESP = function(SSID, PSWD, UDP_HOST, UDP_PORT) {
  this._SSID = SSID;
  this._PSWD = PSWD;
  this._UDP_HOST = UDP_HOST;
  this._UDP_PORT = UDP_PORT;
};

exports.setup = function(usart) {
  return new Promise((resolve, reject) => {
    ESP.at = require('AT');
  });
}
