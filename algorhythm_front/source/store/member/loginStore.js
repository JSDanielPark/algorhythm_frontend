var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var loginState = false;
var email = '';
var nickname = '';


var setData = function(data) {
	loginState = data.loginState;
	email = data.email;
	nickname = data.nickname;
}

var LoginStore = assign({}, EventEmitter.prototype, {
	isLogin: function () {
		return loginState;
	},

	getEmail: function() {
		return email;
	},

	getNickname: function() {
		return nickname;
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
		case "MEMBER_LOGIN":
			setData(payload.data);
			LoginStore.emitChange();
			break;
		case "MEMBER_LOGOUT":
			setData(payload.data);
			LoginStore.emitChange();
			break;
		default:
			return true;
	}
	return true;
});

module.exports = LoginStore;