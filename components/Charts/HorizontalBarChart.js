import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import {useTheme} from '../Shared/ThemeContext'


const HorizontalBarChart = (props) => {
  const colorSelect = (color) => {
    switch(color) {
      case "green":
        return 'rgba(150,250,0,0.4)'
      case "blue":
        return 'rgba(47,82,224,0.4)'
      case "red":
        return 'rgba(255,99,132,0.4)'
      default:
        return 'rgba(255,99,132,0.4)'
    }
  }

  const borderSelect = (color) => {
    switch(color) {
      case "green":
        return 'rgba(150,250,0,1)'
      case "blue":
        return 'rgba(47,82,224,1)'
      case "red":
        return 'rgba(255,99,132,1)'
      default:
        return 'rgba(255,99,132,1)'
    }
  }

  const getLabels = () => {
    const labels = []
    props.data.labels.map((item, i) => {
      labels.push(item)
    })

    return labels
  }

  const getData = () => {
    const data = []
    props.data.dataSet.map((item, i) => {
      data.push({
        label: item.title,
        backgroundColor: colorSelect(item.color),
        borderColor: borderSelect(item.color),
        borderWidth: 1,
        hoverBackgroundColor: colorSelect(item.color),
        hoverBorderColor: borderSelect(item.color),
        data: item.data,
      })
    })

    return data
  }

  const data = {
    labels: getLabels(),
    datasets: getData()
  };
  const themeState = useTheme()
  return (
    <div style={{width: props.size.width, height: props.size.height}}>
      <HorizontalBar 
        data={data}
        options={{
					maintainAspectRatio: false,
					legend: {
						labels: {
							fontColor: themeState.dark ? '#fcfcfc' : '#454f5b'
						}
          },
          scales: {
            yAxes: [
              {
                barPercentage: 0.9,
                categoryPercentage: 0.4,
              }
            ]
          },
				}} />
    </div>
  );
}

export default HorizontalBarChart