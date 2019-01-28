module.exports = {
	success: function(item) {
		const newItem = { ...item };
		const prefixes = ['PRI', 'DUO', 'TRI', 'TET', 'PEN'];
		newItem.enhancement += 1;
		if (newItem.enhancment <= 16) {
			newItem.name = `[+${newItem.enhancement}] ` + newItem.actualName;
		} else {
			newItem.name = `[${prefixes[newItem.enhancement - 16]}] ` + newItem.actualName;
		}

		return newItem;
	}
};
