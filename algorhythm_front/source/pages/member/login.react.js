import { Link } from 'react-router';
var React = require('react');

var LoginStore = require('../../store/member/loginStore');
console.log(LoginStore);
var LoginAction = require('../../action/member/loginAction');

var CODE_LOGIN_SUCCESS = 0;
var CODE_LOGIN_FAIL = 1;

var Login = React.createClass({
	getInitialState: function() {
		if(LoginStore.isLogin() == true) {
			alert("로그인중");
		}
		return {
			inputEmail: '',
			inputPw: ''
		}
	},

	handleChangeEmail: function(event) {
		this.setState({
			inputEmail: event.target.value
		});
	},
	handleChangePw: function(event) {
		this.setState({
			inputPw: event.target.value
		});
	},

	loginProc: function() {
		var email = this.state.inputEmail;
		var pw = this.state.inputPw;
		$.ajax({
			url: '/api/member/login',
			data: {
				email: email,
				pw: pw
			},
			method: 'POST'
		}).done(function(resData, status) {
			if(resData.result == CODE_LOGIN_SUCCESS) {
				alert("로그인성공");
				LoginAction.loginProc({
					email: email,
					loginState: true
				});
			} else {
				alert("로그인 실패");
			}
		}).error(function(resData, status) {
			//alert(resData.error);
		});
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
                        <form role="form">
                            <fieldset>
                                <div className="form-group">
                                	<div className="input-group">
									  <span className="input-group-addon" id="basic-addon1">
									  	<i className="fa fa-user" aria-hidden="true"></i>
									  </span>
									  <input type="email" className="form-control" 
									  placeholder="E-mail" autofocus 
									  onChange={this.handleChangeEmail} value={this.state.inputEmail} />
									</div>
								</div>
                                <div className="form-group">
                                	<div className="input-group">
									  <span className="input-group-addon" id="basic-addon1">
									  	<i className="fa fa-lock" aria-hidden="true"></i>
									  </span>
									  <input type="password" className="form-control" placeholder="Password" 
									   onChange={this.handleChangePw} value={this.state.inputPw} />
									</div>
                                </div>
                                <button type="button" onClick={this.loginProc} className="btn btn-lg btn-success btn-block">로그인</button>
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