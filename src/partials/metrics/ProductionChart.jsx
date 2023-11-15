import React, { useEffect, useState } from 'react';
import ProductionPieChart from '../../charts/ProductionPieChart';

// Import utilities
import { METRICS_DOCTOR_PRODUCTION, METRICS_HYGIENE_PRODUCTION, METRICS_PRODUCTION } from '../../utils/Consts';

function ProductionChart({metricsData, isRendering}) {
  const [total, setTotal] = useState(0);
  const [chartData, setChartData] = useState(0);

  useEffect(() => {
    let totalValue = 0;
    let totalDoctorValue = 0;
    let totalHygieneValue = 0;

    for (var key in metricsData) {
      totalValue += metricsData[key][METRICS_PRODUCTION];
      totalDoctorValue += metricsData[key][METRICS_DOCTOR_PRODUCTION];
      totalHygieneValue += metricsData[key][METRICS_HYGIENE_PRODUCTION];
    }
    setTotal(totalValue);
    setChartData({
      labels: ['Doctor', 'Hygiene'],
      datasets: [
        {
          label: 'Production By Role',
          data: [totalDoctorValue, totalHygieneValue],
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
    });

  }, [metricsData]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Production</h2>
      </header>
      <div className="px-5 py-3">
        {!isRendering && <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">${parseFloat(total.toFixed(2)).toLocaleString('en-US')}</div>}
      </div>
      <div className={`grow ${isRendering && 'flex items-center m-auto empty-line-chart-metrics'}`}>
        {/* Chart built with Chart.js 3 */}
        {/* Change the height attribute to adjust the chart height */}
        {isRendering && <p>Loading now...</p>}
        {!isRendering && <ProductionPieChart data={chartData} width={389} height={220} />}
      </div>
    </div>
  );
}

export default ProductionChart;
