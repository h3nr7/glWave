let React = require('react');
let Router = require('react-router');
let { Route, RouteHandler, Link, DefaultRoute, NotFoundRoute, Navigation } = Router;

/**
 * App 
 */
class App extends React.Component {

	constructor(props) {
		super(props);
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


let Home = require('components/view/Home/Home')
let Visualiser = require('components/view/Visualiser/Visualiser')

let routes = (
	<Route path="/page" handle={App}>
		<DefaultRoute name="home" handler={Home} />
		<Route name="visualiser" path="/page/visualiser" handler={Visualiser} />
		<NotFoundRoute handler={Home}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});

