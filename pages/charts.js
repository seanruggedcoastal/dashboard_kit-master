import React from 'react'
import Layout from '../components/Layout'

import BarChart from '../components/Charts/BarChart'
import BubbleChart from '../components/Charts/BubbleChart'
import DoughnutChart from '../components/Charts/DoughnutChart'
import HorizontalBarChart from '../components/Charts/HorizontalBarChart'
import LineChart from '../components/Charts/LineChart'
import PieChart from '../components/Charts/PieChart'
import RadarChart from '../components/Charts/RadarChart'



const barChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dataSet: [
    {
      title: 'First bar chart',
      color: 'green',
      data: [65,59,80,32,50,76,23,90,23,40,52,68]
    },
    {
      title: 'Second bar chart',
      color: 'blue',
      data: [65,59,80,32,50,76,23,90,23,40,52,68]
    }

  ]
}

const bubbleChartData = [
  {
    title: 'First data set',
    color: 'green',
    dataSet: [
      {x:10,y:20,r:10}, 
      {x:12,y:25,r:18}, 
      {x:16,y:22,r:8}
    ]
  },
  {
    title: 'Second data set',
    color: 'blue',
    dataSet: [
      {x:3,y:10,r:5}, 
      {x:10,y:14,r:5}, 
      {x:6,y:22,r:8}
    ]
  }
]

const doughnutChartData = {
  labels: ['Red', 'Green', 'Blue'],
  dataSet: [
    [
      {color: 'red', data: 300}, 
      {color: 'green', data: 50}, 
      {color: 'blue', data: 100}
    ]
  ]
}

const lineChartData = {
  labels: ['Jan', 'Feb', "Mar", "Apr"],
  dataSet: [
    {
      title: 'Linechart data set 2',
      color: 'green',
      data: [32, 42, 64, 100]
    },
    {
      title: 'Linechart data set 1',
      color: 'blue',
      data: [65, 59, 80, 81]
    }

  ]
}

const pieChartData = {
  labels: ['Red', 'Green', 'Blue'],
  dataSet: [
    [
      {color: 'red', data: 300}, 
      {color: 'green', data: 50}, 
      {color: 'blue', data: 100}
    ]
  ]
}

const horizontalBarChartData = {
  labels: ['Jan', 'Feb', 'Mar'],
  dataSet: [
    {
      title: 'First bar chart',
      color: 'green',
      data: [65,59,80]
    },
    {
      title: 'Second bar chart',
      color: 'blue',
      data: [65,59,80]
    }
  ]
}

const radarChartData = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  dataSet: [
    {
      title: 'First',
      color: 'green',
      data: [65, 59, 90, 81, 56, 55, 40]
    },
    {
      title: 'Second',
      color: 'blue',
      data: [28, 48, 40, 19, 96, 27, 100]
    }
  ]
}

const Charts = () => {
  return (
    <Layout>
      <p>Charts</p>

      <BarChart 
        size={{width: '100%', height: '400px'}}
        data={barChartData}/>

      <BubbleChart 
        size={{width: '400px', height: '400px'}}
        data={bubbleChartData}/>
      <DoughnutChart 
        size={{width: '400px', height: '400px'}}
        data={doughnutChartData}/>
      <LineChart 
        size={{width: '400px', height: '400px'}}
        data={lineChartData} />
      <PieChart 
        size={{width: '200px', height: '200px'}}
        data={pieChartData}/>
      <HorizontalBarChart 
        size={{width: '400px', height: '400px'}}
        data={horizontalBarChartData}/>
      {/* <RadarChart 
        size={{width: '400px', height: '400px'}}
        data={radarChartData}/> */}
      
    </Layout>
  )
}

export default Charts