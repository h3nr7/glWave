let React = require('react');
let Router = require('react-router');
let { Route, RouteHandler, Link, DefaultRoute, NotFoundRoute, Navigation } = Router;

/**
 * App 
 */
class App extends React.Component {

	constructor(props) {
		super(props);
		console.log('main started');
	}

	componentWillMount() {

	}

	render() {
		return(
			<RouteHandler />
		);
	}

}

App.contextTypes = {
	router: React.PropTypes.func
}

let Home = require('./components/view/Home/Home')

let routes = (
	<Route path="/" handle={App}>

	</Route>
);

Router.run(routes, (Handler) => React.render(<Handler />, document.body));
