import { Link } from 'react-router';
var React = require('react');

var LoginStore = require('../../store/member/loginStore');
var LoginAction = require('../../action/member/loginAction');
var Router = require('react-router');

var CODE_LOGIN_SUCCESS = 0;
var CODE_LOGIN_FAIL = 1;

var Login = React.createClass({
	getInitialState: function() {
		if(LoginStore.isLogin()) {
			alert("로그인 중에는 할 수 없습니다.");
			Router.browserHistory.push('/');
            return;
		}
		return {
			inputs: {}
		}
	},

	handleChangeInputs: function(event) {
		var inputs = this.state.inputs;
		inputs[event.target.name] = event.target.value;
		this.setState({
			inputs: inputs
		});
	},

	handleEnter: function(event) {
		if(event.keyCode == 13) {
			this.loginProc();
		}
	},

	loginProc: function(e) {
		var inputs = this.state.inputs;
		$.ajax({
			url: '/api/member/login',
			data: inputs,
			method: 'POST'
		}).done(function(resData, status) {
			if(resData.result == CODE_LOGIN_SUCCESS) {
				LoginAction.loginProc({
					email: inputs['email'],
					loginState: true
				});
				Router.browserHistory.push('/');
			} else {
				alert("아이디나 비밀번호가 틀립니다.");
			}
		}).error(function(resData, status) {
			alert("에러가 발생하였습니다.");
		});

		e.preventDefault();
	},

	render: function() {
		return (
		<section id="login">
        <div className="container sr-contact">
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title"> 로그인</h3>
                    </div>
                    <div className="panel-body">
                        <form role="form" onSubmit={this.loginProc} onsubmit="return false;">
                            <fieldset>
                                <div className="form-group">
                                	<div className="input-group">
									  <span className="input-group-addon" id="basic-addon1">
									  	<i className="fa fa-user" aria-hidden="true"></i>
									  </span>
									  <input type="email" className="form-control" 
									  placeholder="E-mail" autofocus required name="email"
									  onKeyPress={this.handleEnter}
									  onChange={this.handleChangeInputs} value={this.state.inputEmail} />
									</div>
								</div>
                                <div className="form-group">
                                	<div className="input-group">
									  <span className="input-group-addon" id="basic-addon1">
									  	<i className="fa fa-lock" aria-hidden="true"></i>
									  </span>
									  <input type="password" required className="form-control" placeholder="Password" 
									  	name="pw"
									   onChange={this.handleChangeInputs} value={this.state.inputPw} onKeyPress={this.handleEnter}/>
									</div>
                                </div>
                                <button type="submit" className="btn btn-lg btn-success btn-block">로그인</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </section>);
	}
});

module.exports = Login;