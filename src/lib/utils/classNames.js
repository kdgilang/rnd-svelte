/**
 * Multiple class names
 * @param {string[]} classes
 */
export default function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}
