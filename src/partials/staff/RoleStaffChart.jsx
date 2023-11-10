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
          backgroundColor: '#FFBBA8',
          hoverBackgroundColor: '#FFBBA8',
          barPercentage: 0.66,
          categoryPercentage: 0.66,
        },
        {
          label: STAFF_TYPE_HYGIENE,
          data: values2,
          backgroundColor: '#EFB351',
          hoverBackgroundColor: '#EFB351',
          barPercentage: 0.66,
          categoryPercentage: 0.66,
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
      {chartData?.labels?.length > 0 && !isRendering && <BarChart data={chartData} width={595} height={248} />}
    </div>
  );
}

export default RoleStaffChart;
