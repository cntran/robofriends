import React from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import '../containers/App.css';


class App extends React.Component  {
	
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value});
	}

	render() {		

		const filteredRobots = this.state.robots.filter((robot) => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		});

		if (this.state.robots.length === 0) {
			return <h1>Loading</h1>
		} else {			
			return (
				<div className='tc'>
					<h1 class="f1">RoboFriends</h1>
					<SearchBox searchfield={this.state.searchfield} searchChange={this.onSearchChange} />
					<Scroll>
						<CardList robots={filteredRobots}  />
					</Scroll>
				</div>
			);
		}

	}

}

export default App;