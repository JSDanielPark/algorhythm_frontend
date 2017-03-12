import { Link } from 'react-router';
import { CommentHeader } from '../component/header-comment.react';
var React = require('react');



var Login = React.createClass({
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
                        <form className="form-horizontal">
                          <div className="form-group">
                            <label className="col-sm-2 control-label">이메일</label>
                            <div className="col-sm-10">
                              <input type="email" className="form-control" name="email" placeholder="Email" />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">비밀번호</label>
                            <div className="col-sm-10">
                              <input type="password" className="form-control" name="password" placeholder="Password" />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">비밀번호 확인</label>
                            <div className="col-sm-10">
                              <input type="password" className="form-control" name="password_confirm" placeholder="Password Confirm" />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">닉네임</label>
                            <div className="col-sm-10">
                              <input type="password" className="form-control" name="password_confirm" placeholder="Nickname" />
                            </div>
                          </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8 col-md-offset-2 sr-contact">
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
                                        <input type="checkbox" />
                                        개인정보 이용에 동의합니다.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-lg">회원가입</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>);
	}
});

module.exports = Login;