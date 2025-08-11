import { v4 as uuidv4 } from 'uuid';

export function getRandomNumber(max: number) {
	return Math.floor(Math.random() * max);
}

export function getDeviceId() {
	let id = localStorage.getItem('deviceId');
	if (!id) {
		id = uuidv4();
		localStorage.setItem('deviceId', id);
	}
	return id;
}

export function setDeviceAsMain() {
	if (!isDeviceMain()) {
		localStorage.setItem('isDeviceMain', 'true');
	}
}

export function isDeviceMain() {
	return localStorage.getItem('isDeviceMain') === 'true';
}

export function clearMainStatus() {
	if (isDeviceMain()) {
		localStorage.removeItem('isDeviceMain');
	}
}

