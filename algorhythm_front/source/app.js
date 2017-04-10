import { Router, Route, IndexRoute, Link, browserHistory, applyRouterMiddleware } from 'react-router'
import { Home, Login, Join, Modify, ViewExam, ExamList, ExamWrite, ExamRank, MyExam } from './layout/pages.react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {useTransitions, withTransition} from 'react-router-transitions';
var LoginAction = require('./action/member/loginAction');

var React = require('react');
var ReactDOM = require('react-dom');

var Nav = require('./layout/nav.react');
var Footer = require('./layout/footer.react');
var AnimateSR = require('./lib/animatesr.react');
//require('console-polyfill');

var App = React.createClass({
	componentDidUpdate: function() {
		AnimateSR($);
		$('body').scrollTop(0);
	},
	componentDidMount: function() {
		window.sr = ScrollReveal();
		$.ajax({
			url: "/api/member/check/login",
			method: "GET"
		}).done(function(data, status) {
			if(data.isLogin == "yes") {
				data['loginState'] = true;
				LoginAction.loginProc(data);
			}
		});
	},
	render: function() {
		return (
			<span>

				<div className="mask">
					<div className="mask-wrap">
						<div className="mask-content">
						<img src="/img/loading2.gif" />
						</div>
					</div>
				</div>
				<Nav path={this.props.location}/>
					{this.props.children}
				<Footer />
			</span>
		);
	}
});

var requireAuth = function() {
	var isLogin = false;
	$.ajax({
		url: "/api/member/check/login",
		method: "GET",
		async: false
	}).done(function(data, status) {
		if(data.isLogin != "yes") {
			alert("로그인이 필요합니다.");
        	location.href="/member/loginForm";
		}
	}).error(function() {
		alert("에러가 발생했습니다.");
        location.href="/member/loginForm";
	});
}

ReactDOM.render((
  <Router history={browserHistory}
	render={applyRouterMiddleware(useTransitions({
      TransitionGroup: ReactCSSTransitionGroup,
      defaultTransition: {
        transitionName: 'page-effect',
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 100
      }
    }))}>
    <Route path="/" component={withTransition(App)}>
	  <IndexRoute component={Home} />
	  <Route path="/home" component={Home}/>
	  <Route path="/member/loginForm" component={Login}/>
	  <Route path="/member/join" component={Join}/>
	  <Route path="/member/modify" component={Modify} onEnter={requireAuth}/>
	  <Route path="/exam/view/:exam_no" component={ViewExam} onEnter={requireAuth}/>
	  <Route path="/exam/list" component={ExamList} onEnter={requireAuth}/>
	  <Route path="/exam/write" component={ExamWrite} onEnter={requireAuth}/>
	  <Route path="/exam/rank" component={ExamRank}/>
	  <Route path="/exam/my" component={MyExam} onEnter={requireAuth}/>
    </Route>
  </Router>
), document.body);