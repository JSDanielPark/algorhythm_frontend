import { Link } from 'react-router';
var React = require('react');

var Home = React.createClass({
	render: function() {
		return (
		<header id="home">
			<div className="header-content">
				<div className="header-content-inner">
					<h1 id="homeHeading" key="asdasda">알고리듬 <i className="fa fa-music" aria-hidden="true"></i></h1>
					<hr />
					<p>Algorithm Training</p>
					<Link to="/" className="btn btn-success btn-xl page-scroll btn-radius">문제풀러 가기</Link>
				</div>
			</div>
		</header>);
	}
});

module.exports = Home;