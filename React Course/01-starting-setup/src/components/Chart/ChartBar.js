import React from 'react';
import './ChartBar.css';

function ChartBar(props) {
	let barFillHeight = '0%';

	if (props.maxValue > 0) {
		barFillHeight =
			Math.round((100 * props.value) / props.maxValue).toString() + '%';
	}

	return (
		<div className='chart-bar'>
			<div className='chart-bar__inner'>
				<div
					className='chart-bar__fill'
					style={{ height: barFillHeight }}
				></div>
			</div>
			<div className='chart-bar__label'>{props.label}</div>
		</div>
	);
}

export default ChartBar;
