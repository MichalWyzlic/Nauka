import React from 'react';
import './Chart.css';
import ChartBar from './ChartBar';

function Chart(props) {
	const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
	const totalMax = Math.max(...dataPointValues);
	return (
		<div className='chart'>
			{props.dataPoints.map((dataPoint) => (
				<ChartBar
					value={dataPoint.value}
					maxValue={totalMax}
					label={dataPoint.label}
					key={dataPoint.label}
				/>
			))}
		</div>
	);
}

export default Chart;
