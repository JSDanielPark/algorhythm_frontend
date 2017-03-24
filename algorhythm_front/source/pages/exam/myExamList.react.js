import { Link } from 'react-router';
import { CommentHeader } from '../../component/header-comment.react';
import { TableBoard } from '../../component/myexam.react';
var React = require('react');


var MyExamList = React.createClass({
	render: function() {
		return (
		<section id="member">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <CommentHeader title="내 문제" comment="내가 푼 문제들" />
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

module.exports = MyExamList;