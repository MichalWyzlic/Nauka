import React, { useContext } from 'react';
import Card from './Card';

import CodeContext from '../store/code-context';

import styles from './CodeOutput.module.css';

function CodeOutput(props) {
	const codeCtx = useContext(CodeContext);

	return (
		<Card className={styles.multiline}>
			<h2>{props.title}</h2>
			<Card className={styles['multiline-p']}>
				<p>{codeCtx.gettersAndSetters}</p>
			</Card>
		</Card>
	);
}

export default CodeOutput;
