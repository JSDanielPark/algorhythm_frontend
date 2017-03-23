import { Link } from 'react-router';
import { CommentHeader } from '../../component/header-comment.react';

var LoginStore = require('../../store/member/loginStore');
var { browserHistory} = require('react-router');
var React = require('react');
var Router = require('react-router');


var ViewExam = React.createClass({
    getInitialState: function() {
        return {
            exam: {},
            codeMirror: new Object(),
            result: ''
        };
    },
    componentWillMount: function() {
        var examNo = this.props.params.exam_no;
        var me = this;
        $.ajax({
            url: '/api/exam/view/' + examNo,
            method: "GET"
        }).done(function(data, status) {
            me.setState({
                exam: data.exam
            });
        });
    },
    componentDidMount: function() {
        var codeMirror = CodeMirror(this.refs.codemirror, {
            value: "public class Solution {\n\tpublic static void main(String[] args){\n\t\tSystem.out.println(\"Hello World!\");\n\t}\n}",
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/x-java"
        });
        codeMirror.setOption("theme", "monokai");
        this.setState({
            codeMirror: codeMirror
        });
    },
    compile: function() {
        var me = this;
        $.ajax({
            url: '/api/exam/compile',
            data: {
                source: this.state.codeMirror.getValue()
            },
            method: "POST"
        }).done(function(data, status) {
            if(data.result == "success") {
                alert("컴파일에 성공했습니다!");
            } else {
                me.setState({
                    result: data.error
                });
            }
        });
    },

    run: function() {
        var me = this;
        if(confirm("제출하시겠습니까?")) {
            $.ajax({
                url: '/api/exam/run',
                data: {
                    source: this.state.codeMirror.getValue(),
                    examNo: this.props.params.exam_no
                },
                method: "POST"
            }).done(function(data, status) {
                me.setState({
                    result: data.result
                });
            });
        }
    },

    createContentMarkup: function() {
        return { __html: this.state.exam.content };
    },

	render: function() {
        var star = "";
        for(var i=0; i<this.state.exam.difficulty; i++) {
            star += "★";
        }
		return (
		<section id="exam">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2 className="section-heading">{this.state.exam.subject}</h2>
                        <p className="text-center section-heading-comment">{star}</p>
                        <hr className="primary" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="exam-content" dangerouslySetInnerHTML={this.createContentMarkup()}></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="exam-test-area">
                            <p>예시</p>
                            <div className="col-md-3">
                                <label>입력</label>
                                <pre>{this.state.exam.test_input}</pre>
                            </div>
                            <div className="col-md-3">
                                <label>출력</label>
                                <pre>{this.state.exam.test_output}</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 sr-contact codemirror-java" ref="codemirror">
                    </div>
                    <div className="col-xs-12 text-center">
                        <button className="btn btn-success btn-lg" onClick={this.compile}>컴파일</button>
                        <button className="btn btn-success btn-lg" onClick={this.run}>제출</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 sr-contact">
                        <h3>출력결과</h3>
                        <pre>
                            {this.state.result}
                        </pre>
                    </div>
                </div>
            </div>
        </section>);
	}
});

module.exports = ViewExam;