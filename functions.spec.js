const enhancer = require('./functions');

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

describe('success errors', () => {
	it('should throw error for no name or enhancement', () => {
		delete item.name;
		expect(() => enhancer.success(item)).toThrow();
	});

	it('should error for wrong input types on name', () => {
		item.name = 178;
		expect(() => enhancer.success(item)).toThrow();
		item.name = '[DUO] Weenie Hut Junior Sword';
	});

	it('should error for lvl greater than 20 or less than 0', () => {
		let highLvl = { ...item };
		highLvl.lvl = 2345;
		expect(() => enhancer.success(highLvl)).toThrow();
	});

	it('should return a new object', () => {
		let output = enhancer.success(item);
		expect(output).toEqual(expected);
		expect(result).not.toBe(item);
		expect(typeof result).toBe('object');
	});
});

describe('success(item) testing', () => {
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

describe('repair errors', () => {
	it('should error for durability lower than allowed', () => {
		let testItem = { ...item };
		testItem.durability = -1;
		expect(() => enhancer.repair(testItem)).toThrow();
		testItem.lvl = 10;
		expect(() => enhancer.repair(testItem)).toThrow();
	});

	it('should error over max durability', () => {
		let testItem = { ...item };
		testItem.durability = 1000;
		expect(() => enhancer.repair(testItem)).toThrow();
	});

	it('should return a new object', () => {
		let output = enhancer.repair(item);

		expect(output).toEqual(item);
		expect(output).not.toBe(item);
		expect(typeof result).toBe('object');
	});
});

describe('repair(item) test', () => {
	it('should output durability 100', () => {
		expect(result.durability).toEqual(expected.durability);
	});
});

describe('failure(item) errors', () => {});
