import styles from './Card.module.css';

function Card(props){
	const classes = styles.card + (props.className ? (' '+ props.className) : '');
	return <div className={classes}>{props.children}</div>;

};

export default Card;