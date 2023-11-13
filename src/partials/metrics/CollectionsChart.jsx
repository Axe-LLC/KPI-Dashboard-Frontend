import React, { useEffect, useState } from 'react';
import CollectionLineChart from '../../charts/CollectionLineChart';
import { METRICS_COLLECTIONS, METRICS_PRODUCTION } from '../../utils/Consts';
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function CollectionsChart({metricsData, isRendering}) {
  const [total, setTotal] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let totalValue = 0;
    let totalProduction = 0;
    let labels = [];
    let values = [];
    for (var key in metricsData) {
      labels.push(key);
      values.push(metricsData[key][METRICS_COLLECTIONS]);
      totalValue += metricsData[key][METRICS_COLLECTIONS];
      totalProduction += metricsData[key][METRICS_PRODUCTION];
    }
    setTotal(totalValue);
    setPercentage(totalValue / totalProduction * 100);

    setChartData({
      labels: labels,
      datasets: [
        // Indigo line
        {
          label: METRICS_COLLECTIONS,
          data: values,
          borderColor: '#FFBBA8',
          fill: true,
          backgroundColor: `#FFF1EC`,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
            pointBackgroundColor: '#FFBBA8',
            pointHoverBackgroundColor: '#FFBBA8',
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
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Collection Percentage</h2>
      </header>
      <div className="px-5 py-3">
        {!isRendering && <div className="flex items-center">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">${total.toFixed(2).toLocaleString('en-US')}</div>
            <div className="text-xs"><span className="font-medium text-amber-500">{percentage.toFixed(2)}%</span></div>
          </div>
        }
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
