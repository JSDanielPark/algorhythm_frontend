import { Link } from 'react-router';
import { CommentHeader } from '../../component/header-comment.react';

var LoginStore = require('../../store/member/loginStore');
var { browserHistory} = require('react-router');
var React = require('react');
var Router = require('react-router');

var CODE_JOIN_SUCCESS = "success";
var CODE_JOIN_FAIL = "fail";
var CODE_USABLE_EMAIL = 0;
var CODE_DUPLECATE_EMAIL = 1;

var Join = React.createClass({
    getInitialState: function() {
        if(LoginStore.isLogin() == true) {
            alert("로그인 중에는 할 수 없습니다.");
            Router.browserHistory.push('/');
            return;
        }
        return {
            inputs: {},
            msgs: {
                email: 'asd'
            }
        }
    },

    validateEmail: function() {
        var inputs = this.state.inputs;
        var me = this;
        var msgs = this.state.msgs;
        $.ajax({
            url: '/api/member/check/id',
            data: inputs,
            method: 'GET'
        }).done(function(resData, status) {
            if(resData.result == CODE_DUPLECATE_EMAIL) {
                msgs['email'] = "중복된 이메일입니다.";
                me.setState({
                    msgs: msgs
                });
            } else {
                msgs['email'] = "사용 가능한 이메일입니다.";
                me.setState({
                    msgs: msgs
                });
            }
        });
    },

    validatePw: function() {

    },

    validateNickname: function() {

    },

    handleChangeInputs: function(event) {
        var inputs = this.state.inputs;
        inputs[event.target.name] = event.target.value;
        this.setState({
            inputs: inputs
        });
    },

    handleCheckInputs: function(event) {
        var inputs = this.state.inputs;
        inputs[event.target.name] = event.target.checked;
        this.setState({
            inputs: inputs
        });
    },

    joinProc: function(e) {
        var inputs = this.state.inputs;
        if(inputs['pw'] != inputs['pw_confirm']) {
            alert("비밀번호가 틀립니다.");
        } else {
            $.ajax({
                url: '/api/member/join',
                data: inputs,
                method: 'POST'
            }).done(function(resData, status) {
                if(resData.result == CODE_JOIN_SUCCESS) {
                    alert("가입되셨습니다.");
                    Router.browserHistory.push('/');
                } else {
                    alert(resData.errMsg);
                }
            }).error(function(resData, status) {
                alert("에러가 발생하였습니다.");
            });
        }
        e.preventDefault();
    },

	render: function() {
		return (
		<section id="join">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 text-center">
                        <h2 className="section-heading">회원가입</h2>
                        <hr className="primary" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 sr-contact">
                        <form className="form-horizontal" onSubmit={this.joinProc}>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">이메일</label>
                            <div className="col-sm-10">
                              <input type="email" required className="form-control" 
                              onChange={this.handleChangeInputs} name="email" placeholder="Email" onBlur={this.validateEmail}/>
                              <span className="msg-warning">{this.state.msgs['email']}</span>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">비밀번호</label>
                            <div className="col-sm-10">
                              <input type="password" required className="form-control" 
                              onChange={this.handleChangeInputs} name="pw" placeholder="Password" />
                              <span className="msg-warning">{this.state.msgs['pw']}</span>
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">비밀번호 확인</label>
                            <div className="col-sm-10">
                              <input type="password" required className="form-control" 
                              onChange={this.handleChangeInputs} name="pw_confirm" placeholder="Password Confirm" />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">닉네임</label>
                            <div className="col-sm-10">
                              <input type="text" required className="form-control" 
                              onChange={this.handleChangeInputs} name="nickname" placeholder="Nickname" />
                              <span className="msg-warning">{this.state.msgs['nickname']}</span>
                            </div>
                          </div>
                          <table className="table use-info-table">
                            <thead>
                                <tr><th colSpan={2}>개인정보 이용내역</th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>이메일</th>
                                    <td>개인식별, 이메일발송</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <input type="checkbox" onChange={this.handleCheckInputs} name="agree"/>
                                        개인정보 이용에 동의합니다.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-lg">회원가입</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>);
	}
});

module.exports = Join;