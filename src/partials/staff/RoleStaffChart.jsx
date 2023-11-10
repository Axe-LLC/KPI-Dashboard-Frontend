import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart01';
import LineChart from '../../charts/LineChart06';
import StaffLineChart from '../../charts/StaffLineChart';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

// Import utilities
import { STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE } from '../../utils/Consts';

function RoleStaffChart({data, isRendering}) {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    let labels = [];
    let values1 = [];
    let values2 = [];
    for (var key in data) {
      labels.push(key);
      values1.push(data[key][STAFF_TYPE_DOCTOR]);
      values2.push(data[key][STAFF_TYPE_HYGIENE]);
    }
    
    setChartData({
      labels: labels,
      datasets: [
        // Indigo line
        {
          label: STAFF_TYPE_DOCTOR,
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
          label: STAFF_TYPE_HYGIENE,
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
    });
  }, [data]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Doctor VS Hygiene</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <div className="grow">
        {chartData?.labels?.length > 0 && !isRendering && <StaffLineChart data={chartData} width={595} height={248} />}
      </div>
    </div>
  );
}

export default RoleStaffChart;
