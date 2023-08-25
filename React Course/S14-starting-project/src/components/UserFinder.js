import React, { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component {
	static contextType = UsersContext;

	constructor() {
		super();
		this.state = {
			filteredUsers: [],
			searchTerm: ''
		};
	}

	componentDidMount() {
		this.setState({ filteredUsers: this.context.users });
	}

	searchChangeHandler(event) {
		this.setState({ searchTerm: event.target.value });
		console.log(this.state.searchTerm);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.searchTerm !== prevState.searchTerm) {
			this.setState({
				filteredUsers: this.state.filteredUsers.filter((user) =>
					user.name.includes(this.state.searchTerm)
				)
			});
		}
	}

	render() {
		return (
			<Fragment>
				<div className={classes.finder}>
					<input
						type='search'
						onChange={this.searchChangeHandler.bind(this)}
					/>
				</div>
				<ErrorBoundary>
					<Users users={this.state.filteredUsers} />
				</ErrorBoundary>
			</Fragment>
		);
	}
}

// const UserFinder = () => {
// 	const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
// 	const [searchTerm, setSearchTerm] = useState('');

// 	useEffect(() => {
// 		setFilteredUsers(
// 			DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
// 		);
// 	}, [searchTerm]);

// 	const searchChangeHandler = (event) => {
// 		setSearchTerm(event.target.value);
// 	};
// };

export default UserFinder;
