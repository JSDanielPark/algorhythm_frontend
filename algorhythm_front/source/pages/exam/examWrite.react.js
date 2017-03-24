import { Link } from 'react-router';
import { CommentHeader } from '../../component/header-comment.react';

var { browserHistory} = require('react-router');
var React = require('react');
var Router = require('react-router');



var Join = React.createClass({
    getInitialState: function() {
        return {
            inputs: {
                difficulty: 1
            },
            testcase: [],
            msgs: {
                email: ''
            }
        }
    },

    componentDidMount: function() {
        CKEDITOR.replace( 'ckeditor', {
            filebrowserUploadUrl: '/api/file/upload/photo'
        });
        this.addTestcase();
    },

    addTestcase: function() {
        var testcase = this.state.testcase;
        testcase.push({
            testcase_input: '',
            testcase_output: ''
        });
        this.setState({
            testcase: testcase
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

    handleTestcaseInputs: function(event) {
        var testcase = this.state.testcase;
        testcase[event.target.id][event.target.name] = event.target.value;
        this.setState({
            testcase: testcase
        });
    },

    writeProc: function(e) {
        var inputs = this.state.inputs;
        var content = CKEDITOR.instances.ckeditor.getData();
        var testcase_input = [];
        var testcase_output = [];
        var testcase = this.state.testcase;
        for(var i=0; i<testcase.length; i++) {
            testcase_input[i] = testcase[i]['testcase_input'];
            testcase_output[i] = testcase[i]['testcase_output'];
        }
        inputs['content'] = content;
        inputs['testcase_input'] = testcase_input;
        inputs['testcase_output'] = testcase_output;
        
        $.ajax({
            url: "/api/exam/write",
            method: "POST",
            data: inputs
        }).done(function(data, status) {
            alert("등록되었습니다.");
            Router.browserHistory.push('/exam/list');
        }).error(function(data, status) {
            alert("오류가 발생했습니다.");
        });

        e.preventDefault();
    },

	render: function() {
        var me = this;
		return (
		<section id="exam">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 text-center">
                        <h2 className="section-heading">문제출제</h2>
                        <hr className="primary" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1 sr-contact">
                        <form className="form-horizontal" onSubmit={this.writeProc}>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">문제제목</label>
                            <div className="col-sm-10">
                              <input type="text" required className="form-control" 
                              onChange={this.handleChangeInputs} name="subject" placeholder="title"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">난이도</label>
                            <div className="col-sm-10">
                              <select required className="form-control"
                              onChange={this.handleChangeInputs} name="difficulty">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">내용</label>
                            <div className="col-sm-10">
                              <textarea name="content" className="form-control" id="ckeditor" required></textarea>
                            </div>
                          </div>

                          <div className="form-group form-group-big">
                            <label className="col-sm-2 control-label">예시</label>
                            <div className="col-md-5">
                                <label className="col-sm-12 exam-label text-center">예시 입력</label>
                                <div className="col-sm-12">
                                  <textarea required className="form-control" rows="5"
                                  onChange={this.handleChangeInputs} name="test_input"></textarea>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <label className="col-sm-12 exam-label text-center">예시 출력</label>
                                <div className="col-sm-12">
                                  <textarea required className="form-control" rows="5"
                                  onChange={this.handleChangeInputs} name="test_output"></textarea>
                                </div>
                            </div>
                          </div>

                          <div className="form-group form-group-big">
                            <label className="col-sm-2 control-label">채점용</label>
                            <div className="col-sm-10">
                              <button type="button" className="btn btn-success" onClick={this.addTestcase}>채점용 입출력 추가</button>
                              <span className="plusinfo">* 점수 = 100/채점용 입출력개수*맞춘 개수</span>
                            </div>
                          </div>
                          <div className="form-group">
                            {
                                this.state.testcase.map(function(obj, idx) {
                                    return (
                                        <div>
                                        <div className="col-md-5 col-md-offset-2">
                                            <label className="col-sm-12 exam-label text-center">채점용 입력{idx+1}</label>
                                            <div className="col-sm-12">
                                              <textarea required className="form-control" rows="5" 
                                              onChange={me.handleTestcaseInputs} name="testcase_input" id={idx}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <label className="col-sm-12 exam-label text-center">채점용 출력{idx+1}</label>
                                            <div className="col-sm-12">
                                              <textarea required className="form-control" rows="5"
                                              onChange={me.handleTestcaseInputs} name="testcase_output" id={idx}></textarea>
                                            </div>
                                        </div>
                                        </div>
                                    )
                                })
                            }
                          </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-lg">문제출제</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>);
	}
});

module.exports = Join;