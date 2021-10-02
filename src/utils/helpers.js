import {Dimensions, Platform} from 'react-native';

export function isValidEmail(inputText) {
	const mailformat =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (inputText.match(mailformat)) {
		return true;
	} else {
		return false;
	}
}

export function formatNumber(number, noZeros) {
	let formattedValue = (number / 100)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	formattedValue = formattedValue.includes('.')
		? formattedValue
		: noZeros === undefined
		? formattedValue + '.00'
		: formattedValue;
	return formattedValue;
}

export const isIphoneWithNotch = () => {
	const dimen = Dimensions.get('window');
	return (
		Platform.OS === 'ios' &&
		!Platform.isPad &&
		!Platform.isTVOS &&
		(dimen.height === 780 ||
			dimen.width === 780 ||
			dimen.height === 812 ||
			dimen.width === 812 ||
			dimen.height === 844 ||
			dimen.width === 844 ||
			dimen.height === 896 ||
			dimen.width === 896 ||
			dimen.height === 926 ||
			dimen.width === 926)
	);
};

export function timeSince(date) {
	const seconds = Math.floor((new Date() - date) / 1000);

	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) < 2
			? Math.floor(interval) + ' year'
			: Math.floor(interval) + 'years';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) < 2
			? Math.floor(interval) + ' month'
			: Math.floor(interval) + ' months';
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) < 2
			? Math.floor(interval) + ' day'
			: Math.floor(interval) + ' days';
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) < 2
			? Math.floor(interval) + ' hour'
			: Math.floor(interval) + ' hours';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) < 2
			? Math.floor(interval) + ' minute'
			: Math.floor(interval) + ' minutes';
	}
	return Math.floor(seconds) < 2
		? Math.floor(seconds) + ' second'
		: Math.floor(seconds) + 'seconds';
}

export function formatAMPM(date) {
	let hours = new Date(date).getHours();
	const minutes = '00';
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours || 12; // the hour '0' should be '12'
	// minutes = minutes < 10 ? '0' + minutes : minutes;
	const strTime = hours + ':' + minutes + ampm;
	return strTime;
}

// To be refactored later
export const convertISODateString = date => {
	switch (date) {
		case '1:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T01:00:00Z'
			);
		case '2:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T02:00:00Z'
			);
		case '3:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T03:00:00Z'
			);
		case '4:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T04:00:00Z'
			);
		case '5:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T05:00:00Z'
			);
		case '6:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T06:00:00Z'
			);
		case '7:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T07:00:00Z'
			);
		case '8:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T08:00:00Z'
			);
		case '9:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T09:00:00Z'
			);
		case '10:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T10:00:00Z'
			);
		case '11:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T11:00:00Z'
			);
		case '12:00am':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T00:00:00Z'
			);
		case '12:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T12:00:00Z'
			);
		case '1:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T13:00:00Z'
			);
		case '2:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T14:00:00Z'
			);
		case '3:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T15:00:00Z'
			);
		case '4:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T16:00:00Z'
			);
		case '5:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T17:00:00Z'
			);
		case '6:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T18:00:00Z'
			);
		case '7:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T19:00:00Z'
			);
		case '8:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T20:00:00Z'
			);
		case '9:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T21:00:00Z'
			);
		case '10:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T22:00:00Z'
			);
		case '11:00pm':
			return (
				new Date(Date.now()).toISOString().split('T')[0] + 'T23:00:00Z'
			);
	}
};
