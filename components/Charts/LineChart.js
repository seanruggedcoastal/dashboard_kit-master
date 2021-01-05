import React from 'react';
import {Line} from 'react-chartjs-2';
import randomColor from 'randomcolor';
import {useTheme} from '../Shared/ThemeContext';

const LineChart = (props) => {

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

  const getLabels = () => {
    const labels = []
    props.data.labels.map((item, i) => {
      labels.push(item)
    })

    return labels
  }

  const getData = (canvas) => {
    const data = []




    props.data.dataSet.map((item, i) => {
      const random = randomColor({luminosity: 'light', hue:item.color})

      const ctx = canvas.getContext("2d")

      const gradientFill = ctx.createLinearGradient(0, 100, 0, 380);
      gradientFill.addColorStop(0, colorSelect(item.color));
      let darkGradient = themeState.dark ? 'rgba(0,0,0, 0.3)' : 'rgba(255,255,255, 0.3)'
      gradientFill.addColorStop(1, darkGradient);
  
      const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, random);
      gradientStroke.addColorStop(1, colorSelect(item.color));


      data.push({
        label: item.title,
        fill: true,
        lineTension: 0.1,
        backgroundColor: gradientFill,
        borderColor: gradientStroke,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: gradientStroke,
        pointBackgroundColor: colorSelect(item.color),
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: gradientStroke,
        pointHoverBorderColor: gradientStroke,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: item.data
      })
    })

    return data
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
      <Line 
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

export default LineChart