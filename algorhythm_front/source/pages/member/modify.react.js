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
        return {
            inputs: {
            }
        }
    },

    componentWillMount: function() {
        var me = this;
        $.ajax({
            url: '/api/member/myinfo',
            method: 'GET'
        }).done(function(resData, status) {
            if(resData.result == "success" && resData.info) {
                me.setState({
                    inputs: resData.info
                });
            } else {
                alert("에러가 발생했습니다.");
                location.href="/";
            }
        }).error(function(res, status) {
            if(res.error) {
                alert(res.error);
                location.href="/";
            } else {
                alert("에러가 발생했습니다.");
                location.href="/";
            }
        });
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

    modifyProc: function(e) {
        var inputs = this.state.inputs;
        if(inputs['newPw'] != inputs['newPw_confirm']) {
            alert("새 비밀번호가 서로 틀립니다.");
        } else {
            $.ajax({
                url: '/api/member/modifyMyinfo',
                data: inputs,
                method: 'POST'
            }).done(function(resData, status) {
                if(resData.result == "success") {
                    alert("수정되었습니다.");
                } else {
                    alert(resData.err);
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
                        <h2 className="section-heading">정보수정</h2>
                        <hr className="primary" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 sr-contact">
                        <form className="form-horizontal" onSubmit={this.modifyProc}>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">이메일</label>
                            <div className="col-sm-10">
                              <input type="email" required className="form-control" 
                              value={this.state.inputs['email']} disabled="disabled"
                              onChange={this.handleChangeInputs} name="email" placeholder="Email" onBlur={this.validateEmail}/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">닉네임</label>
                            <div className="col-sm-10">
                              <input type="text" required className="form-control" disabled="disabled"
                              value={this.state.inputs['nickname']}
                              onChange={this.handleChangeInputs} name="nickname" placeholder="Nickname" />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">기존 비밀번호</label>
                            <div className="col-sm-10">
                              <input type="password" required className="form-control" 
                              onChange={this.handleChangeInputs} name="pw" placeholder="Password" />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">새 비밀번호</label>
                            <div className="col-sm-10">
                              <input type="password" required className="form-control" 
                              onChange={this.handleChangeInputs} name="newPw" placeholder="Password" />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">새 비밀번호 확인</label>
                            <div className="col-sm-10">
                              <input type="password" required className="form-control" 
                              onChange={this.handleChangeInputs} name="newPw_confirm" placeholder="Password Confirm" />
                            </div>
                          </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-success btn-lg">정보수정</button>
                            <button type="button" className="btn btn-primary btn-lg">회원탈퇴</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>);
	}
});

module.exports = Join;