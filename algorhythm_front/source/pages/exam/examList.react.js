import { Link } from 'react-router';
import { CommentHeader } from '../../component/header-comment.react';
import { TableBoard } from '../../component/exam-board.react';
var React = require('react');



var ExamList = React.createClass({
	render: function() {
		return (
		<section id="member">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <CommentHeader title="문제풀이" comment="알고리즘 문제풀이 공간" />
                </div>
            </div>
			<div className="row">
				<div className="col-lg-12">
					<TableBoard />
				</div>
            </div>
        </div>
    </section>);
	}
});

module.exports = ExamList;