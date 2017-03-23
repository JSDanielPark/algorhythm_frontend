var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var articles = [];
var maxPage = 0;


var loadBoardData = function(data) {
	articles = data.list;
	maxPage = data.maxPage;
}

var NewsStore = assign({}, EventEmitter.prototype, {
	getArticles: function () {
		return articles;
	},

	getMaxPage: function() {
		return maxPage;
	},

	emitChange: function () {
		this.emit('change');
	},

	addChangeListener: function (callback) {
		this.on('change', callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(function (payload) {
	var source = payload.source;
	var text;
	switch (source) {
		case "RECEIVE_BOARD_LIST":
			loadBoardData(payload.data);
			NewsStore.emitChange();
			break;
		default:
			return true;
	}
	return true;
});

module.exports = NewsStore;