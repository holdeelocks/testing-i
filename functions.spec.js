const enhancer = require('./functions');

describe('success(item) testing', () => {
	// const prefixes = ['PRI', 'DUO', 'TRI', 'TET', 'PEN'];

	const item = {
		actualName: 'Weenie Hut Junior Sword',
		name: '[DUO] Weenie Hut Junior Sword',
		type: '__weapon__',
		durability: 100,
		enhancement: 17
	};
	const expected = {
		actualName: 'Weenie Hut Junior Sword',
		name: '[TRI] Weenie Hut Junior Sword',
		type: '__weapon__',
		durability: 100,
		enhancement: 18
	};

	const result = enhancer.success(item);

	it('should return a new object', () => {
		expect(result).toEqual(expected);
		// expect(result).toEqual(expected);
	});
	it('should +1 the item enhancement', () => {
		const expected = enhancer.success(item);
		expect(expected.enhancement).toEqual(item.enhancement + 1);
	});
	it('should change the display name', () => {
		expect(expected.name).not.toEqual(item.name);
	});
	it('should display a prefix not a number', () => {
		// expected(prefixes).toContain(expected.)
	});
});
