import { Pagination, FormGroup, InputGroup, FormControl, Button, Form, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router';
var React = require('react');
var ExamStore = require('../store/exam/examStore');
var ExamAction = require('../action/exam/examAction');

var searchBtnStyle= {
	backgroundColor: '#F05F40',
	color: '#fff',
	marginLeft: '10px',
	fontSize: '20px',
	display: 'inline-block'
};

var searchFieldStyle = { display: 'inline-block', width: 'auto' };

var examListAjaxData = {
	url: '/api/exam/list/1',
	type: 'GET',
	dataType: 'json',
	data: {
		category: 0
	}
};

var BoardItem = React.createClass({
	render: function() {
		var difficulty = "";
		for(var i=0; i<this.props.item.difficulty; i++) {
			difficulty += "★";
		}
		return (
			<tr>
				<td>{this.props.item.exam_no}</td>
				<td>
				{difficulty}
				</td>
				<td className="text-left"><Link to={'/exam/view/'+ this.props.item.exam_no}>{this.props.item.subject}</Link></td>
				<td>{this.props.item.dt}</td>
			</tr>	
		);
	}
});

var TableBoard = React.createClass({
	getInitialState: function() {
		return {
			activePage: 1,
			maxPage: 0,
			articles: ExamStore.getArticles(),
			searchString: ''
		};
	},
	updateArticleState: function() {
		this.setState({
			articles: ExamStore.getArticles(),
			maxPage: ExamStore.getMaxPage()
		});
	},
	componentWillMount: function() {
		ExamStore.addChangeListener(this.updateArticleState);
		$.ajax(examListAjaxData).done(function(data, status) {
			ExamAction.receiveBoardList(data);
		}).error(function() {
			alert('데이터를 불러오지 못했습니다.');
		});
	},
	componentWillUnmount: function() {
		ExamStore.removeChangeListener(this.updateArticleState);
	},

	handleSelect(eventKey) {
		examListAjaxData.url = '/api/exam/list/' + eventKey;
		$.ajax(examListAjaxData).done(function(data, status) {
			ExamAction.receiveBoardList(data);
		}).error(function() {
			alert('데이터를 불러오지 못했습니다.');
		});
		this.setState({
			activePage: eventKey
		});
	},

	handleChangeSearch: function(event) {
		this.setState({
			searchString: event.target.value
		});
	},

	search: function(evt) {
		examListAjaxData.url = '/api/exam/list/1';
		examListAjaxData.data.subject = this.state.searchString;
		$.ajax(examListAjaxData).done(function(data, status) {
			ExamAction.receiveBoardList(data);
		}).error(function() {
			alert('데이터를 불러오지 못했습니다.');
		});
		evt.preventDefault();
		
		this.setState({
			activePage: 1
		});
	},
	render: function() {
		return (
		<div className="text-center">
			<table className="table table-board">
				<thead>
					<tr>
						<th className="text-center">번호</th>
						<th className="text-center">난이도</th>
						<th className="text-center">제목</th>
						<th className="text-center">등록일</th>
					</tr>
				</thead>
				<tbody>
					{this.state.articles.map(function(article){
						return (<BoardItem item={article} key={article.dt + '' + article.exam_no} />);
					})}
				</tbody>
			</table>
			<Pagination first last ellipsis boundaryLinks 
				items={this.state.maxPage}
				maxButtons={5}
				activePage={this.state.activePage}
				onSelect={this.handleSelect} />

			<div className="text-center">
				<Form inline onSubmit={this.search}>
					<FormGroup style={searchFieldStyle}>
						<FormControl type="text" placeholder="검색" style={searchFieldStyle} onChange={this.handleChangeSearch} value={this.state.searchString}/>
					</FormGroup>
					<Button type="submit" style={searchBtnStyle}>
						<i className="fa fa-search" aria-hidden="true"></i>
					</Button>
				</Form>
			</div>
		</div>
		);
	}
});

module.exports = {
	TableBoard: TableBoard
};