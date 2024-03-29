import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart01';
import StaffLineChart from '../../charts/StaffLineChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import { EMPLOYEE_STATUS_FULL_TIME, EMPLOYEE_STATUS_PART_TIME } from '../../utils/Consts';

function TypeStaffChart({data, isRendering}) {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    let labels = [];
    let values1 = [];
    let values2 = [];
    for (var key in data) {
      labels.push(key);
      values1.push(data[key][EMPLOYEE_STATUS_FULL_TIME].toFixed(2));
      values2.push(data[key][EMPLOYEE_STATUS_PART_TIME].toFixed(2));
    }
    
    setChartData({
      labels: labels,
      datasets: [
        // Indigo line
        {
          label: EMPLOYEE_STATUS_FULL_TIME,
          data: values1,
          backgroundColor: '#B49BC0',
          hoverBackgroundColor: '#B49BC0',
          barPercentage: 0.8,
          categoryPercentage: 0.8,
        },
        // Gray line
        {
          label: EMPLOYEE_STATUS_PART_TIME,
          data: values2,
          backgroundColor: '#66A6C4',
          hoverBackgroundColor: '#66A6C4',
          barPercentage: 0.8,
          categoryPercentage: 0.8,
        },
      ]
    })
  }, [data]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 mb-5">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Team Members</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className={`grow empty-line-chart-staff ${isRendering && 'flex items-center m-auto'}`}>
        {isRendering && <p>Loading now...</p>}
        {chartData?.labels?.length > 0 && !isRendering && <BarChart data={chartData} width={595} height={248} />}
      </div>
    </div>
  );
}

export default TypeStaffChart;
