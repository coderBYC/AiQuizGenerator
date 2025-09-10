"use client"

import React from 'react'
import HeatMap from '@uiw/react-heat-map';
import { convertDate } from '@/lib/utils';

type Props ={
    data:{
        createdAt: Date;
        count: number
    }[]
} ;

const value = [
  { date: '2016/01/11', count: 2 },
  { date: '2016/01/12', count: 20 },
  { date: '2016/01/13', count: 10 },
  ...[...Array(17)].map((_, idx) => ({
    date: `2016/02/${idx + 10}`, count: idx, content: ''
  })),
  { date: '2016/04/11', count: 2 },
  { date: '2016/05/01', count: 5 },
  { date: '2016/05/02', count: 5 },
  { date: '2016/05/04', count: 11 },
];

const Quizheatmap = (props: Props) => {
  
  const formattedData = props.data.map((item) => ({
    date: convertDate(item.createdAt), // Format date to 'YYYY/MM/DD'}))
    count: item.count,
  }))

  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  return (
    <div>
        <HeatMap
        value={formattedData}
        width="100%"
        weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
        startDate={oneYearAgo}
        panelColors={{
        0: '#e1f5f1',
        2: '#b3e5fc',
        4: '#81d4fa',
        6: '#4fc3f7',
        8: '#29b6f6',
        10: '#03a9f4'
      }}
        />
    </div>
  )
}

export default Quizheatmap