const prefixes = {
	16: 'PRI',
	17: 'DUO',
	18: 'TRI',
	19: 'TET',
	20: 'PEN'
};

function commonErrors(item) {
	if (!item.lvl || !item.actualName) {
		throw new Error('item must have enhancement and name properties');
	}

	if (typeof item.name !== 'string' || typeof item.lvl !== 'number') {
		throw new Error('name must be string and enhancement must be number');
	}
}

function successErrors(item) {
	if (item.lvl >= 20 || item.lvl < 0) {
		throw new Error('enhancement lvl can only be between 0 and 20 inclusive');
	}
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
		}
		if (item.type === '__weapon__') {
			throw new Error('weapon of lvl 7 and below cannot fail enhancment');
		}
	}
}

function enhance(item) {
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

function enhanceFail(item) {
	const failItem = { ...item };
	if (failItem.lvl > 16) {
		failItem.durability -= 10;
		failItem.lvl = item.lvl - 1;
		failItem.enhancement = prefixes[failItem.lvl];
		failItem.name = `[${failItem.enhancement}] ` + failItem.actualName;
	} else if (0 <= failItem.lvl <= 14) {
		failItem.durability -= 5;
	} else {
		failItem.durability -= 10;
	}
	return failItem;
}

module.exports = {
	success: function(item) {
		commonErrors(item);
		successErrors(item);
		return enhance(item);
	},
	repair: function(item) {
		repairErrors(item);
		const repaired = { ...item };
		repaired.durability = 100;
		return repaired;
	},
	failure: function(item) {
		commonErrors(item);
		failureErrors(item);
		return enhanceFail(item);
	}
};
