import React from 'react';
import {Bubble} from 'react-chartjs-2';
import {useTheme} from '../Shared/ThemeContext'


const BubbleChart = (props) => {
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

  const createDataSet = () => {
    const dataset = []
    props.data.map((set, i) => {
      dataset.push({
        label: set.title,
        fill: false,
        lineTension: 0.1,
        backgroundColor: colorSelect(set.color),
        borderColor: borderSelect(set.color),
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: borderSelect(set.color),
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: borderSelect(set.color),
        pointHoverBorderColor: borderSelect(set.color),
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: set.dataSet
      })
    })

    return dataset
  }

  createDataSet()

  const data = {
    datasets: createDataSet()
  };
  const themeState = useTheme()
  return (
    <div style={{width: props.size.width, height: props.size.height}}>
      <Bubble 
        data={data}
        redraw={true} 
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
                ticks: {
                  fontColor: themeState.dark ? '#fcfcfc' : '#454f5b'
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: themeState.dark ? '#fcfcfc' : '#454f5b'
                }
              }
            ]
          }
        }}/>
    </div>
  );
}

export default BubbleChart