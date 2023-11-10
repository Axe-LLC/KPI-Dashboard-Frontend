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
      values1.push(data[key][EMPLOYEE_STATUS_FULL_TIME]);
      values2.push(data[key][EMPLOYEE_STATUS_PART_TIME]);
    }
    
    setChartData({
      labels: labels,
      datasets: [
        // Indigo line
        {
          label: EMPLOYEE_STATUS_FULL_TIME,
          data: values1,
          borderColor: '#F09375',
          fill: true,
          backgroundColor: `#FAD97F66`,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
            pointBackgroundColor: '#F09375',
            pointHoverBackgroundColor: '#F09375',
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
            clip: 20,
        },
        // Gray line
        {
          label: EMPLOYEE_STATUS_PART_TIME,
          data: values2,
          borderColor: `#FBD08F`,
          fill: true,
          backgroundColor: `#FBD08F66`,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: `#FBD08F`,
          pointHoverBackgroundColor: `#FBD08F`,
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        },
      ]
    })
  }, [data]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Full Time VS Part Time</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <div className="grow">
        {chartData?.labels?.length > 0 && !isRendering && <StaffLineChart data={chartData} width={595} height={248} />}
      </div>
    </div>
  );
}

export default TypeStaffChart;
