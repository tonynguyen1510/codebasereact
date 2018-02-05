/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-17 09:42:32
*------------------------------------------------------- */
const isEmpty = value => value === undefined || value === null || value === '' || value.length === 0 || value === '<p><br></p>';

export const required = value => (value && value.length > 0 && value !== '<p><br></p>' ? undefined : 'Required');

export const maxLength = (max, value) => (value && value.length > max ? `Must be ${max} characters or less` : undefined);

export const minLength = (min, value) => (value && value.length < min ? `Must be ${min} characters or more` : undefined);

export const number = value => (value && Number.isNaN(Number(value)) ? 'Must be a number' : undefined);

export const minValue = (min, value) => (value && value < min ? `Must be at least ${min}` : undefined);

export const email = value => {
	return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Invalid email address'
		: undefined;
};

export const tooOld = value => (value && value > 65 ? 'You might be too old for this' : undefined);

export const aol = value => {
	return value && /.+@aol\.com/.test(value)
		? 'Really? You still use AOL for your email?'
		: undefined;
};

export const alphaNumeric = value => {
	return value && /[^a-zA-Z0-9 ]/i.test(value)
		? 'Only alphanumeric characters'
		: undefined;
};

export const phoneNumber = value => {
	return value && !/^(0|[1-9][0-9]{9})$/i.test(value)
		? 'Invalid phone number, must be 10 digits'
		: undefined;
};

export const username = (value) => {
	if (!isEmpty(value) && !/^[0-9a-z_]+$/.test(value)) {
		return 'Invalid username';
	}
};

export const integer = (value) => {
	if (!Number.isInteger(Number(value))) {
		return 'Must be an integer';
	}
};

export const oneOf = (enumeration, value) => {
	return !~enumeration.indexOf(value) ? `Must be one of: ${enumeration.join(', ')}` : undefined;
};

export const match = (field, value) => {
	return value !== field ? 'Do not match' : undefined;
};
