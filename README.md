AutoHome
========

This is a pretty simple and quick project I did to automate a few lights in my house.

![AutoHome screenshot](https://cloud.githubusercontent.com/assets/15058464/21755775/3b279c8c-d5de-11e6-8869-c75a8193f6bc.png)


The basic components:
- angular/bootstrap for the front-end interface
- socket.io to sync all the clients together
- johnny-five to control an arduino connected to a Raspberry Pi


![Arduino with relay and prototyping shield](https://cloud.githubusercontent.com/assets/15058464/21755819/d375ac40-d5de-11e6-92f1-e2d3cd9ce63a.jpg)

The arduino has a relay shield on it that I have connected to two AC lamps.
The night light is simply a bright white LED connected to a output pin on the arduino.
