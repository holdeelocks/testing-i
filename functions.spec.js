const enhancer = require('./functions');

describe('success(item) testing', () => {
	const item = {
		actualName: 'Weenie Hut Junior Sword',
		name: '[DUO] Weenie Hut Junior Sword',
		type: '__weapon__',
		durability: 100,
		enhancement: 'DUO',
		lvl: 17
	};

	const result = enhancer.success(item);

	const expected = {
		actualName: 'Weenie Hut Junior Sword',
		name: '[TRI] Weenie Hut Junior Sword',
		type: '__weapon__',
		durability: 100,
		enhancement: 'TRI',
		lvl: 18
	};

	it('should throw error for no name or enhancement', () => {
		delete item.name;
		expect(() => enhancer.success(item)).toThrow();
	});

	it('should error for wrong input types', () => {
		item.name = 178;
		expect(() => enhancer.success(item)).toThrow();
	});

	it('should error for more than 20 or less than 0', () => {
		item.lvl = 2345;
		expect(() => enhancer.success(item)).toThrow();
	});

	it('should return a new object', () => {
		expect(result).toEqual(expected);
		expect(result).not.toBe(item);
		expect(typeof result).toBe('object');
	});

	it('should +1 the item enhancement', () => {
		expect(result.enhancement).toEqual(expected.enhancement);
		expect(typeof result.lvl).toBe('number');
		expect(typeof result.enhancement).toBe('string');
	});

	it('should change the display name', () => {
		expect(result.name).toEqual(expected.name);
	});

	it('should display a prefix not a number', () => {
		expect(result.name).toEqual(expected.name);
	});
});

describe('repair(item) test', () => {
	const item = {
		actualName: 'Weenie Hut Junior Sword',
		name: '[DUO] Weenie Hut Junior Sword',
		type: '__weapon__',
		durability: 100,
		enhancement: 'DUO',
		lvl: 17
	};

	const result = enhancer.success(item);

	const expected = {
		actualName: 'Weenie Hut Junior Sword',
		name: '[TRI] Weenie Hut Junior Sword',
		type: '__weapon__',
		durability: 100,
		enhancement: 'TRI',
		lvl: 18
	};

	it('should throw error for no name or enhancement', () => {
		delete item.name;
		expect(() => enhancer.repair(item)).toThrow();
	});

	it('should error for wrong input types', () => {
		item.name = 178;
		expect(() => enhancer.repair(item)).toThrow();
	});

	it('should error for more than 20 or less than 0', () => {
		item.lvl = 2345;
		expect(() => enhancer.repair(item)).toThrow();
	});

	it('should error for durability lower than allowed', () => {
		item.durability = -1;
		expect(() => enhancer.repair(item)).toThrow();
	});
});
