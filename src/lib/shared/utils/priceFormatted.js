/**
 *
 * @param {number} value
 * @returns string
 */
export const priceFormatted = (value) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR'
	}).format(value);
};
