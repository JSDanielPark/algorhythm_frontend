var AppDispatcher = require('../../dispatcher/AppDispatcher');

var LoginActions = {
	loginProc: function (data) {
		AppDispatcher.dispatch({
			source: 'MEMBER_LOGIN',
			data: data
		});
	}
}

module.exports = LoginActions;