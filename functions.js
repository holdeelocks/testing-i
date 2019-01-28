function errorCheck(item) {
	if (!item.lvl || !item.actualName) {
		throw new Error('item must have enhancement and name properties');
	}

	if (typeof item.name !== 'string' || typeof item.lvl !== 'number') {
		throw new Error('name must be string and enhancement must be number');
	}

	if (item.lvl >= 20 || item.lvl < 0) {
		return new Error('enhancement can only be between 0 and 20 inclusive');
	}

	if (0 <= item.level <= 14 && item.durability <= 20) {
		throw new Error('durability cannot be less than 20 when item enhancement between +0 and +14');
	}

	if (item.durability < 0 && 15 <= item.lvl <= 20) {
		throw new Error(
			'durability cannot be less than zero for item with enhancement between +15 and TET'
		);
	}

	// return item;
}

function increment(item) {
	const newItem = { ...item };
	newItem.lvl += 1;

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
		errorCheck(item);
	}
};
