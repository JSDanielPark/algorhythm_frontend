var AppDispatcher = require('../../dispatcher/AppDispatcher');


var ExamActions = {
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

module.exports = ExamActions;