import React from 'react';
import styles from './UserList.module.css';
import Card from "../UI/Card/Card";

function UserList(props) {
	// const usersTable = [...props.users];
	// console.log(usersTable);
	return (
		<div>
			{props.users.length > 0 ? (
				<Card className={styles.card}>
					<ul className={styles.users}>
						{props.users.map((item, index) => {
							console.log(`index : ${index}, item: ${item}`);
							return (
								<li key={index + item.name + item.age}>
									{`${item.name} (${item.age} years old)`}
								</li>
							);
						})}
					</ul>
				</Card>
			) : (
				''
			)}
		</div>
	);
}

export default UserList;
