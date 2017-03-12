var React = require('react');

var multilineStyle = { display: 'block' };

var CommentHeader = React.createClass({
	render: function() {
		if(this.props.multiline) {
			return (
				<div className="comment-header">
					<h1 className="comment-header-title" style={multilineStyle}>{this.props.title}</h1>
					<span className="comment-header-comment" style={multilineStyle}>{this.props.comment}</span>
				</div>
			);
		}
		return (
			<div className="comment-header">
				<h1 className="comment-header-title">{this.props.title}</h1>
				<span className="comment-header-comment">{this.props.comment}</span>
			</div>
		);
	}
});

module.exports = {
	CommentHeader: CommentHeader
};