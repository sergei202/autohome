'use strict';

angular.module('app', ['btford.socket-io','ui.bootstrap']);

angular.module('app').factory('socket', function(socketFactory) {
 	var ioSocket = io.connect('/');
	return socketFactory({ioSocket: ioSocket});
});

angular.module('app').controller('MainCtrl', function($scope, socket) {
	console.log('MainCtrl()');

	socket.on('connect', () => {
		console.log('connected');
		socket.emit('devices');
	});
	socket.on('devices', devices => {
		console.log('devices = %o', devices);
		$scope.devices = devices;
	});

	$scope.onDeviceChange = function(device) {
		console.log('onDeviceChange: %o', device);
		socket.emit('device-state', {id:device.id, state:device.state});
	};

});
