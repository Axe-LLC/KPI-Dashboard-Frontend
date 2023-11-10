import React, { useEffect, useState } from 'react';
import PieChart from '../../charts/PieChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import { METRICS_PRODUCTION } from '../../utils/Consts';

function ProductionChart({metricsData, isRendering}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalValue = 0;

    for (var key in metricsData) {
      totalValue += metricsData[key][METRICS_PRODUCTION];
    }
    setTotal(totalValue);

  }, [metricsData]);

  const chartData = {
    labels: ['Doctor', 'Hygiene'],
    datasets: [
      {
        label: 'Sessions By Device',
        data: [12, 13],
        backgroundColor: [
          '#609696',
          '#C8D7D1',
        ],
        hoverBackgroundColor: [
          '#609696',
          '#C8D7D1',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Production</h2>
      </header>
      <div className="px-5 py-3">
        {!isRendering && <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">${total.toLocaleString('en-US')}</div>}
      </div>
      <div className={`grow ${isRendering && 'flex items-center m-auto empty-line-chart-metrics'}`}>
        {/* Chart built with Chart.js 3 */}
        {/* Change the height attribute to adjust the chart height */}
        {isRendering && <p>Loading now...</p>}
        {!isRendering && <PieChart data={chartData} width={389} height={220} />}
      </div>
    </div>
  );
}

export default ProductionChart;
