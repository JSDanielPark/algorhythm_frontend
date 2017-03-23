import { Link } from 'react-router';
import { Collapse} from 'react-bootstrap';
var LoginStore = require('../store/member/loginStore');
var LoginAction = require('../action/member/loginAction');
var React = require('react');
var Router = require('react-router');

var navData = [
	{title: 'Home', path: '/'}
];

var notLoginNav = [{title: '로그인', path: '/member/loginForm'}, {title: '회원가입', path: '/member/join'}];
var loginNav = [
	{title: '정보수정', path: '/member/modify'},
	{title: '문제목록', path: '/exam/list'},
	{title: '문제출제', path: '/exam/write'},
	{ title: '로그아웃', path: '', fun: function() {
			$.ajax({
				url: '/api/member/logout',
				method: 'GET'
			}).done(function() {
				LoginAction.logoutProc();
				Router.browserHistory.push('/');
			})
		}
	}
];


var NavItem = React.createClass({
	isActived: function(loc) {
		if(loc == this.props.path) {
			return 'active';
		}
		return '';
	},
	clickFunc: function() {
		if(this.props.clickEvent)
			this.props.clickEvent();
		if(this.props.fun)
			this.props.fun();
	},
	render: function() {
		return (
			<li onClick={this.clickFunc} className={this.isActived(this.props.nowpath)}>
					<Link className="page-scroll" to={this.props.path} >{this.props.title}</Link>
			</li>
		);
	}
});


var NavBar = React.createClass({
	getInitialState: function() {
		return { 
			open: false,
			navData: navData.concat(notLoginNav),
			isLogin: false
		};
	},
	updateLoginState: function() {
		if(LoginStore.isLogin()) {
			this.setState({
				navData: navData.concat(loginNav),
				isLogin: LoginStore.isLogin()
			});
		} else {
			this.setState({
				navData: navData.concat(notLoginNav),
				isLogin: LoginStore.isLogin()
			});
		}
	},
	componentWillMount: function() {
		LoginStore.addChangeListener(this.updateLoginState);
	},

	componentDidMount: function() {
		if(this.state.isLogin) {
			this.setState({
				navData: navData.concat(loginNav)
			});
		} else {
			this.setState({
				navData: navData.concat(notLoginNav)
			});
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
								{this.state.navData.map(function(nav){
									return <NavItem clickEvent={closeCollapse} nowpath={props.path.pathname} path={nav.path} title={nav.title} key={nav.title} fun={nav.fun}/>
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