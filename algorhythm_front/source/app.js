import { Router, Route, IndexRoute, Link, browserHistory, applyRouterMiddleware } from 'react-router'
import { Home, Login, Join } from './layout/pages.react'
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
				<Nav path={this.props.location}/>
					{this.props.children}
				<Footer />
			</span>
		);
	}
});

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
	  <Route path="/loginForm" component={Login}/>
	  <Route path="/join" component={Join}/>
    </Route>
  </Router>
), document.body);