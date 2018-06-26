# Espruino Libs
# 1. WIFI_UDP
This library will allow your Espruino Board to exchange messages via UDP Protocol.
## Functions definition
### ESP.setup("WIFI_SSID", "WIFI_PSWD", "UDP_HOST_IP", UDP_PORT, SERIAL).then( d => { ... })
This function creates the ESP object. It needs to pass:
1. WIFI_SSID - a string with the ssid of your router.
2. WIFI_PSWD - a string with the password of your router.
3. UDP_HOST_IP - a string with the ip of 2nd device e.g. espruino board / pc / phone
4. UDP_PORT - the port is used on both this device and the paired device. It's an integer.
5. SERIAL - e.g Serial3 / Serial2 / ...
### ESP.connect().then( d => { ... })
This function connects the Espruino Board to the network
### ESP.udp_start(socket).then( d => { ... })
This feature connects the Espruino Board to another device. You need a socket number to access this connection. The socket number can range from 0 to 4. You can connect to multiple devices on different sockets.
### ESP.send(socket, message, message2, message3, ...).then( d => { ... })
This function sends a message (or multiple) to a specific socket. All passed function arguments will be converted to strings.
### ESP.on('msg', message => { ... })
"Msg" event handler.
## Lyrical digression
In my library I abandoned the usual callbacks in favor of promises. Why? Well, because I had to deal with a large sequence of callbacks once, and I didn't like the structure of the code. It was difficult to navigate all these callbacks and it seemed to me that promises look much more decent.
Below you can see some code examples with my library.
## Examples
```JS
//My ESP8266 WIFI Module is connected to Serial3 of Espruino Board
Serial3.setup(115200);

var esp = require('https://github.com/DanSpark1/espruino-libraries/blob/master/modules/WIFI_UDP/wifi.js').setup("interzet48", "09876543210", "192.168.0.102", 4445, Serial3);

esp.connect()
    .then(d => {
      console.log(d); //prints "Connected"
      return esp.udp_start(4); //To continue the sequential chain of promises, you need to return what should be done as follows
  }).then(d => {
      esp.send(4, "Hello", "World", " :D"); //The chain doesn't continue anymore, so we don't return the command, we just run it.
  });
  
  //listener
  esp.on('msg', message => {
      console.log("There is new message: " + message);
  })
```
