import React from 'react';
import PieChart from '../../charts/PieChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function FintechCard09() {
  
  const chartData = {
    labels: ['Doctor', 'Hygiene'],
    datasets: [
      {
        label: 'Sessions By Device',
        data: [12, 13],
        backgroundColor: [
          '#F09375',
          '#FBD08F',
        ],
        hoverBackgroundColor: [
          '#F09375',
          '#FBD08F',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Production</h2>
      </header>
      <div className="px-5 py-3">
        <div className="text-sm italic mb-2">Hey Mark, here is the value of your portfolio:</div>
        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">$224,807.27</div>
      </div>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <PieChart data={chartData} width={389} height={220} />
    </div>
  );
}

export default FintechCard09;
