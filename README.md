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
