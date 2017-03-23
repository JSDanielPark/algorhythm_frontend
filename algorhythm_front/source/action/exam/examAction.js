var AppDispatcher = require('../../dispatcher/AppDispatcher');


var NewsActions = {
	receiveBoardList: function (data) {
		AppDispatcher.dispatch({
			source: 'RECEIVE_BOARD_LIST',
			data: data
		});
	},

	receiveBoardContent: function(data) {
		AppDispatcher.dispatch({
			source: 'RECEIVE_BOARD_CONTENT',
			data: data
		});
	}
}

module.exports = NewsActions;