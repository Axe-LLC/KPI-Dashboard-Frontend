import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart08';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import { STAFF_TYPE_TOTAL } from '../../utils/Consts';

function TotalSupplyChart({data, isRendering}) {
  const [chartData, setChartData] = useState(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let labels = [];
    let values = [];
    let totalValue = 0;
    for (var key in data) {
      labels.push(key);
      values.push(data[key][STAFF_TYPE_TOTAL]);
      totalValue += data[key][STAFF_TYPE_TOTAL];
    }
    
    setTotal(totalValue);
    setChartData({
      labels: labels,
      datasets: [
        // Line
        {
          data: values,
          fill: true,
          backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.rose[500])}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.rose[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.rose[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.rose[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        },
      ],
    })
  }, [data]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header>
          <h3 className="text-sm font-semibold text-slate-500 uppercase mb-1">
            <span className="text-slate-800 dark:text-slate-100">Total Spend in Supplies</span>
          </h3>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1"> {total} hrs</div>
        </header>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        {chartData?.labels?.length && !isRendering && <LineChart data={chartData} width={286} height={98} />}
      </div>
    </div>
  );
}

export default TotalSupplyChart;
