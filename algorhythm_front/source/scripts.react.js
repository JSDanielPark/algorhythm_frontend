var React = require('react');

var Scripts = React.createClass({
	render: function() {
		return (
			<div>
				<script src="vendor/jquery/jquery.min.js"></script>
				<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
				<script src="vendor/scrollreveal/scrollreveal.min.js"></script>
				<script src="vendor/magnific-popup/jquery.magnific-popup.min.js"></script>
				<script src="js/creative.min.js"></script>
			</div>
		);
	}
});

module.exports = Scripts;