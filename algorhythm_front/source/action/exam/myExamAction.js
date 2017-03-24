var AppDispatcher = require('../../dispatcher/AppDispatcher');


var MyExamActions = {
	receiveBoardList: function (data) {
		AppDispatcher.dispatch({
			source: 'RECEIVE_MY_EXAM_LIST',
			data: data
		});
	}
}

module.exports = MyExamActions;