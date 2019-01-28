module.exports = {
	success: function(item) {
		const newItem = { ...item };
		const prefixes = ['PRI', 'DUO', 'TRI', 'TET', 'PEN'];

		if (!item.enhancement || !item.name) {
			throw new Error('item must have enhancement and name properties');
		}
		if (typeof item.name !== 'string' || typeof item.enhancement !== 'number') {
			throw new Error('name must be string and enhancement must be number');
		}

		newItem.enhancement += 1;
		if (newItem.enhancment <= 16) {
			newItem.name = `[${newItem.enhancement}] ` + newItem.actualName;
		} else {
			newItem.name = `[${prefixes[newItem.enhancement - 16]}] ` + newItem.actualName;
		}

		return newItem;
	}
};
