function errorCheck(item) {
	if (!item.lvl || !item.actualName) {
		throw new Error('item must have enhancement and name properties');
	}

	if (typeof item.name !== 'string' || typeof item.lvl !== 'number') {
		throw new Error('name must be string and enhancement must be number');
	}

	if (item.lvl >= 20 || item.lvl < 0) {
		throw new Error('enhancement can only be between 0 and 20 inclusive');
	}

	// return item;
}

function repairErrors(item) {
	if (0 <= item.lvl <= 14 && item.durability <= 20) {
		throw new Error('durability cannot be less than 20 when item enhancement between +0 and +14');
	}

	if (item.durability < 0 && 15 <= item.lvl <= 20) {
		throw new Error(
			'durability cannot be less than zero for item with enhancement between +15 and TET'
		);
	}

	if (item.durability > 100) {
		throw new Error('durability has a max of 100');
	}
}

function failureErrors(item) {
	if (item.lvl <= 7) {
		if (item.type === '__armor__' && item.lvl <= 5) {
			throw new Error('armor of lvl 5 and below cannot fail enhancement');
		} else {
			throw new Error('armor of lvl7 and below cannot fail enhancment');
		}
	}
}

function increment(item) {
	const newItem = { ...item };
	newItem.lvl++;

	if (newItem.lvl < 16) {
		newItem.enhancement = `+${newItem.lvl}`;
		newItem.name = `[${newItem.enhancement}] ` + newItem.actualName;
	} else {
		newItem.enhancement = prefixes[newItem.lvl];
		newItem.name = `[${newItem.enhancement}] ` + newItem.actualName;
	}
	return newItem;
}

const prefixes = {
	16: 'PRI',
	17: 'DUO',
	18: 'TRI',
	19: 'TET',
	20: 'PEN'
};

module.exports = {
	success: function(item) {
		errorCheck(item);
		return increment(item);
	},
	repair: function(item) {
		repairErrors(item);
		const repaired = { ...item };
		repaired.durability = 100;
		return repaired;
	},
	failure: function(item) {
		failureErrors(item);
	}
};
