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

