let React = require('react');
let Navi = require('components/common/Navi/Navi');
let User = require('services/endpoints/User');

class Home extends React.Component {

	constructor(props) {
		super(props);

		// User.loginWithSoundcloud('s%3ADauI-Qum814-ld4lV7Ix-340c3gal4_M.OjBst46gDwQ5xYkw8DbIfFo57FlXwA1RWX42Lz5gZl0');
	}


	render() {

		return(
			<div>
			<h2>Home</h2>
				<navi />
			</div>
		);
	}
}

module.exports = Home;