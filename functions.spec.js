const enhancer = require('./functions');

const item = {
	actualName: 'Weenie Hut Junior Sword',
	name: '[DUO] Weenie Hut Junior Sword',
	type: '__weapon__',
	durability: 100,
	enhancement: 'DUO',
	lvl: 17
};

const expected = {
	actualName: 'Weenie Hut Junior Sword',
	name: '[TRI] Weenie Hut Junior Sword',
	type: '__weapon__',
	durability: 100,
	enhancement: 'TRI',
	lvl: 18
};

describe('common errors', () => {
	it('should throw error for no name or enhancement', () => {
		delete item.name;
		expect(() => enhancer.success(item)).toThrow();
		expect(() => enhancer.failure(item)).toThrow();
		expect(() => enhancer.failure({})).toThrow();
	});

	it('should error for wrong input types on name', () => {
		item.name = 178;
		expect(() => enhancer.success(item)).toThrow();
		expect(() => enhancer.failure(item)).toThrow();
		item.name = '[DUO] Weenie Hut Junior Sword';
	});

	it('should return a new object', () => {
		expect(enhancer.success(item)).toEqual(expected);
		expect(enhancer.success(item)).not.toBe(item);
		expect(typeof enhancer.success(item)).toBe('object');

		expect(enhancer.failure(item)).not.toBe(item);
		expect(typeof enhancer.failure(item)).toBe('object');
	});
});

describe('success(item) testing', () => {
	describe('success specific errors', () => {
		it('should error for lvl greater than 20 or less than 0', () => {
			let highLvl = { ...item };
			highLvl.lvl = 2345;
			expect(() => enhancer.success(highLvl)).toThrow();
		});
	});

	describe('ouput tests', () => {
		it('should return a new object', () => {
			expect(enhancer.success(item)).toEqual(expected);
			expect(enhancer.success(item)).not.toBe(item);
			expect(typeof enhancer.success(item)).toBe('object');
		});

		it('should +1 the item enhancement', () => {
			expect(enhancer.success(item).enhancement).toEqual(expected.enhancement);
			expect(typeof enhancer.success(item).lvl).toBe('number');
			expect(typeof enhancer.success(item).enhancement).toBe('string');
		});

		it('should change the display name', () => {
			expect(enhancer.success(item).name).toEqual(expected.name);
		});

		it('should display a prefix not a number', () => {
			expect(enhancer.success(item).name).toEqual(expected.name);
		});
	});
});

describe('repair tests', () => {
	describe('repair specific errors', () => {
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
			expect(enhancer.repair(item)).toEqual(item);
			expect(enhancer.repair(item)).not.toBe(item);
			expect(typeof enhancer.repair(item)).toBe('object');
		});
	});

	describe('output test', () => {
		it('should output durability 100', () => {
			expect(enhancer.repair(item).durability).toEqual(expected.durability);
		});
	});
});

describe('failure(item) errors', () => {
	describe('failure specific errors', () => {
		it('should not fail for weapon up to lvl 5', () => {
			expect(() => enhancer.failure({ ...item, lvl: 5, type: '__armor__' })).toThrow();
			expect(() => enhancer.failure({ ...item, lvl: 6, type: '__weapon__' })).toThrow();
		});
	});

	describe('output tests', () => {
		it('should -5 durability for lvls 7-14', () => {
			expect(enhancer.failure({ ...item, lvl: 8 }).durability).toBe(95);
			expect(enhancer.failure({ ...item, lvl: 13, durability: 54 }).durability).toBe(49);
		});

		it('should -10 for lvls 15-20', () => {
			expect(enhancer.failure({ ...item, lvl: 17, durability: 100 }).durability).toBe(90);
			expect(enhancer.failure({ ...item, lvl: 15, durability: 66 }).durability).toBe(61);
		});

		it('should subtract lvl for 17-20', () => {
			expect(enhancer.failure({ ...item, lvl: 19 }).lvl).toBe(18);
			expect(enhancer.failure({ ...item, lvl: 19 }).enhancement).toBe('TRI');
			expect(enhancer.failure({ ...item, lvl: 19 }).name).toBe('[TRI] Weenie Hut Junior Sword');
			expect(enhancer.failure({ ...item, lvl: 17 }).lvl).toBe(16);
			expect(enhancer.failure({ ...item, lvl: 17 }).enhancement).toBe('PRI');
			expect(enhancer.failure({ ...item, lvl: 17 }).name).toBe('[PRI] Weenie Hut Junior Sword');
		});
	});
});
