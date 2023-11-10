import React, { useEffect, useState } from 'react';
import CollectionLineChart from '../../charts/CollectionLineChart';
import { METRICS_COLLECTIONS } from '../../utils/Consts';
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function CollectionsChart({metricsData, isRendering}) {
  const [total, setTotal] = useState(0);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let totalValue = 0;
    let labels = [];
    let values = [];
    for (var key in metricsData) {
      labels.push(key);
      values.push(metricsData[key][METRICS_COLLECTIONS]);
      totalValue += metricsData[key][METRICS_COLLECTIONS];
    }
    setTotal(totalValue);

    setChartData({
      labels: labels,
      datasets: [
        // Indigo line
        {
          label: METRICS_COLLECTIONS,
          data: values,
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
        }
      ]
    })
  }, [metricsData]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Collections</h2>
      </header>
      <div className="px-5 py-3">
        {!isRendering && <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">${total.toLocaleString('en-US')}</div>}
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className={`grow ${isRendering && 'flex items-center m-auto empty-line-chart-metrics'}`}>
        {/* Change the height attribute to adjust the chart height */}
        {isRendering && <p>Loading now...</p>}
        {chartData?.labels?.length > 0 && !isRendering && <CollectionLineChart data={chartData} width={389} height={262} />}
      </div>
    </div>
  );
}

export default CollectionsChart;
