import React, { useEffect, useState } from 'react';
import AdjustmentLineChart from '../../charts/AdjustmentLineChart';
import { METRICS_ADJUSTMENTS } from '../../utils/Consts';

function AdjustmentChart({metricsData, isRendering}) {
  const [total, setTotal] = useState(0);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let totalValue = 0;
    let labels = [];
    let values = [];
    for (var key in metricsData) {
      labels.push(key);
      values.push(parseFloat(metricsData[key][METRICS_ADJUSTMENTS]) * -1);
      totalValue += metricsData[key][METRICS_ADJUSTMENTS];
    }
    setTotal(totalValue);
    setChartData({
      labels: labels,
      datasets: [
        // Indigo line
        {
          label: METRICS_ADJUSTMENTS,
          data: values,
          borderColor: '#EFB351',
          fill: true,
          backgroundColor: `#F9EDCA`,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
            pointBackgroundColor: '#EFB351',
            pointHoverBackgroundColor: '#EFB351',
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
            clip: 20,
        }
      ]
    });
  }, [metricsData]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Adjustment</h2>
      </header>
      <div className="px-5 py-3">
        {!isRendering && <div className="flex items-center">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">${parseFloat(total.toFixed(2)).toLocaleString('en-US')}</div>
        </div>}
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className={`grow ${isRendering && 'flex items-center m-auto empty-line-chart-metrics'}`}>
        {/* Change the height attribute to adjust the chart height */}
        {isRendering && <p>Loading now...</p>}
        {chartData?.labels?.length > 0 && !isRendering && <AdjustmentLineChart data={chartData} width={389} height={262} />}
      </div>      
    </div>
  );
}

export default AdjustmentChart;
