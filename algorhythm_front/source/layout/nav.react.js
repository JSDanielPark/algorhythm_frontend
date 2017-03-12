import { Link } from 'react-router';
import { Collapse} from 'react-bootstrap';
var React = require('react');

var navData = [
	{title: 'Home', path: '/'}, {title: 'Login', path: '/loginForm'}, {title: 'Join', path: '/join'}
];


var NavItem = React.createClass({
	isActived: function(loc) {
		if(loc == this.props.path) {
			return 'active';
		}
		return '';
	},
	render: function() {
		return (
			<li onClick={this.props.clickEvent} className={this.isActived(this.props.nowpath)}>
				<Link className="page-scroll" to={this.props.path} >{this.props.title}</Link>
			</li>
		);
	}
});


var NavBar = React.createClass({
	getInitialState: function() {
		return {
			open: false
		}
	},
	closeCollapse: function() {
		this.setState({ open: false });
	},
	
	render: function(){
		var props = this.props;
		var closeCollapse = this.closeCollapse;
		return(
			<nav className="navbar navbar-default navbar-fixed-top" id="mainNav">
				<div className="container">
					<div  className="navbar-header">
						<Link className="navbar-brand page-scroll navbar-brand" to="/">AlgoRhythm<i className="fa fa-music" aria-hidden="true"></i></Link>
						<button type="button" className="navbar-toggle" onClick={ ()=> this.setState({ open: !this.state.open })}>
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
					</div>

					<Collapse in={this.state.open}>
						<div  id="devdogs-nav" className="navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								{navData.map(function(nav){
									return <NavItem clickEvent={closeCollapse} nowpath={props.path.pathname} path={nav.path} title={nav.title} key={nav.title}/>
								})}
							</ul>
						</div>
					</Collapse>
				</div>
			</nav>
		);
	}
});

module.exports = NavBar;