var AppDispatcher = require('../../dispatcher/AppDispatcher');

var LoginActions = {
	loginProc: function (data) {
		AppDispatcher.dispatch({
			source: 'MEMBER_LOGIN',
			data: data
		});
	},
	logoutProc: function () {
		AppDispatcher.dispatch({
			source: 'MEMBER_LOGOUT',
			data: {
				loginState: false,
				email: '',
				nickname: ''
			}
		});
	}
}

module.exports = LoginActions;