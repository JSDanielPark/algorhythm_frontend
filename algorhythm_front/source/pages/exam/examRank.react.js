import { Link } from 'react-router';
import { CommentHeader } from '../../component/header-comment.react';
var React = require('react');



var ExamRank = React.createClass({
    getInitialState: function() {
        console.log("??");
        return {
            rank: []
        };
    },
    componentWillMount: function() {
        var me = this;
        $.ajax({
            url: "/api/exam/rank",
            method: "GET"
        }).done(function(data, status) {
            me.setState({
                rank: data.rank
            });
        });
    },
	render: function() {
		return (
		<section id="examRank">
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <CommentHeader title="명예의 전당" comment="점수는 최초로 제출한 코드의 점수로 집계됩니다." />
                </div>
            </div>
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					<table className="table text-center">
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>닉네임</th>
                                <th>평균점수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.rank.map(function(obj, idx) {
                                    return (
                                        <tr>
                                            <td>{idx+1}</td>
                                            <td>{obj.nickname}</td>
                                            <td>{obj.score}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
				</div>
            </div>
        </div>
    </section>);
	}
});

module.exports = ExamRank;