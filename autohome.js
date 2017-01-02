'use strict';

const PORT = 8080;

const express = require('express');
const    app = express();
const server = require('http').Server(app);
const     io = require('socket.io')(server);
const   five = require('johnny-five');

server.listen(PORT, err => {
	console.log('AutoHome.  Listening on %j', PORT);
});
app.use(express.static('./public'));

const board = new five.Board({repl:false});

const devices = [
	{id:'lamp',		name:'Dresser Lamp',	state:false,	type:'relay'},
	{id:'night',	name:'Night Light',		state:false,	type:'led'},
	{id:'closet',	name:'Closet Light',	state:false,	type:'relay'}
];

function getDeviceById(id) {
	for(var i=0;i<devices.length;i++) if(devices[i].id===id) return devices[i];
	return null;
}

function getDeviceList() {
	 return devices.filter(d => (d.relay || d.led)).map(device => {
		return {
			id: device.id,
			name: device.name,
			state: device.state
		};
	 });
}

board.on('ready', () => {
	var relays = new five.Relays([4,5,6,7]);
	getDeviceById('lamp').relay = relays[0];
	getDeviceById('closet').relay = relays[1];
	// relays.open();
	var led = new five.Led(11);
	getDeviceById('night').led = led;
	// led.on();
	io.emit('devices', getDeviceList());
});


io.on('connection', socket => {
	console.log('New connection from %j', socket.request.connection.remoteAddress);
	socket.on('devices', () => {
		socket.emit('devices',  getDeviceList());
	});

	socket.on('device-state', (data) => {
		console.log('device-state: id=%j, state=%j', data.id, data.state);
		var device = getDeviceById(data.id);
		if(!device) return;
		device.state = data.state;
		if(device.relay) {
			if(data.state) device.relay.on(); else device.relay.off();
		}
		if(device.led) {
			if(data.state) device.led.on(); else device.led.off();
		}
		io.emit('devices', getDeviceList());
	});

});
