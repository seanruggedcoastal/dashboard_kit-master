import React from 'react';
import {Pie} from 'react-chartjs-2';
import {useTheme} from '../Shared/ThemeContext'
import randomColor from 'randomcolor'

const PieChart = (props) => {
	const colorSelect = (color) => {
		switch(color) {
			case "green":
				return 'rgba(150,250,0,0.6)'
			case "blue":
				return 'rgba(47,82,224,0.6)'
			case "red":
				return 'rgba(255,99,132,0.6)'
			default:
				return 'rgba(255,99,132,0.6)'
		}
	}
	
	const getLabels = () => {
		const labels = []
		props.data.labels.map((item, i) => {
			labels.push(item)
		})

		return labels
	}

	const getData = (canvas) => {
		const dataArray = []



		props.data.dataSet.map((item, i) => {


			dataArray.push({
				data: item.map(d => d.data),
				backgroundColor: item.map(d => {

					const random = randomColor({
						luminosity: 'light', 
						hue: d.color,
						alpha: 0.4
					})
					

					const ctx = canvas.getContext("2d")
			
					const gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
					gradientFill.addColorStop(0, random);
					gradientFill.addColorStop(1, colorSelect(d.color));
		
					// return gradientFill
					return colorSelect(d.color)
				}),
				borderColor: item.map(d => {
					const random = randomColor({
						luminosity: 'light', 
						hue: d.color,
						alpha: 0.4
					})

					const ctx = canvas.getContext("2d")
					const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
					gradientStroke.addColorStop(0, random);
					gradientStroke.addColorStop(1, colorSelect(d.color));

					return gradientStroke

				})
			})
		})

		return dataArray
	}

	const data = (canvas) => {
		return {
		labels: getLabels(),
		datasets: getData(canvas)
		}
	};
	const themeState = useTheme()
	return (
		<div style={{width: props.size.width, height: props.size.height}}>
			<Pie 
				data={data}
				options={{
					maintainAspectRatio: false,
					legend: {
						labels: {
							fontColor: themeState.dark ? '#fcfcfc' : '#454f5b'
						}
					},
				}} />
		</div>
	);
}

export default PieChart