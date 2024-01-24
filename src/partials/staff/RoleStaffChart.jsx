import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from '../../charts/BarChart01';
import LineChart from '../../charts/LineChart06';
import StaffLineChart from '../../charts/StaffLineChart';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

// Import utilities
import { WEEK_DAYS, SERVER_ADDRESS } from '../../utils/Consts';

const colors = [
  {
    backgroundColor: '#FFBBA8',
    hoverBackgroundColor: '#FFBBA8'
  },
  {
    backgroundColor: '#EFB351',
    hoverBackgroundColor: '#EFB351'
  },
]

function RoleStaffChart({clinics, clinic, data, isRendering}) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(clinics.length > 1) {
      generateData();
    }
  }, [clinics, data, clinic]);

  const generateData = async () => {
    setLoading(true);
    let labels = [];
    let datasets = [];
    if(clinic === 0) {
      for (let i=1; i<clinics.length; i++) {
        const clinicsHours = await axios.get(`${SERVER_ADDRESS}/clinic_hours/${clinics[i].id}`);
        let values = [];
        
        for (var key in data) {
          if(i === 1) labels.push(key);
          const date = new Date(key);
          const hourValue = clinicsHours.data.find(item => item.day === WEEK_DAYS[date.getDay()]).hours;
          values.push(hourValue);
        }
  
        datasets.push({
          label: clinics[i].name,
          data: values,
          backgroundColor: colors[i%2].backgroundColor,
          hoverBackgroundColor: colors[i%2].hoverBackgroundColor,
          barPercentage: 0.8,
          categoryPercentage: 0.8,        
        })
      }
    }
    else {
      const clinicsHours = await axios.get(`${SERVER_ADDRESS}/clinic_hours/${clinic}`);
        let values = [];
        
        for (var key in data) {
          labels.push(key);
          const date = new Date(key);
          const hourValue = clinicsHours.data.find(item => item.day === WEEK_DAYS[date.getDay()]).hours;
          values.push(hourValue);
        }
  
        datasets.push({
          label: clinics.find(item => item.id === clinic).name,
          data: values,
          backgroundColor: colors[clinic%2].backgroundColor,
          hoverBackgroundColor: colors[clinic%2].hoverBackgroundColor,
          barPercentage: 0.8,
          categoryPercentage: 0.8,        
        })
    }
      
    setChartData({
      labels: labels,
      datasets: datasets
    });
    
    setLoading(false);
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 mb-5">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Hours Open</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className={`grow empty-line-chart-staff ${(isRendering || loading) && 'flex items-center m-auto'}`}>
        {(isRendering || loading) && <p>Loading now...</p>}
        {chartData?.labels?.length > 0 && !isRendering && !loading && <BarChart data={chartData} width={595} height={248} />}
      </div>
    </div>
  );
}

export default RoleStaffChart;
