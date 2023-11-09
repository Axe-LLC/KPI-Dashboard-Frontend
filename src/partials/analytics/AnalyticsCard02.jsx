import React from 'react';
import LineChart from '../../charts/LineChart04';
import { Link } from 'react-router-dom';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function AnalyticsCard02() {

  const chartData = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
      '06-01-2021', '07-01-2021', '08-01-2021',
      '09-01-2021', '10-01-2021', '11-01-2021',
      '12-01-2021', '01-01-2022', '02-01-2022',
      '03-01-2022', '04-01-2022', '05-01-2022',
      '06-01-2022', '07-01-2022', '08-01-2022',
      '09-01-2022', '10-01-2022', '11-01-2022',
      '12-01-2022', '01-01-2023',
    ],
    datasets: [
      // Indigo line
      {
        data: [
          732, 610, 610, 504, 504, 504, 349,
          349, 504, 342, 504, 610, 391, 192,
          154, 273, 191, 191, 126, 263, 349,
          252, 423, 622, 470, 532,
        ],
        fill: true,
        backgroundColor: `#FAD97F66`,
        borderColor: '#F09375',
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
    ],
  };

  return (
    <div className="flex flex-col col-span-full xl:col-span-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100 pt-2 pb-2">Appointments</h2>
      </header>
      {/* Card content */}
      <div className="flex flex-col h-full">
        {/* Live visitors number */}
        <div className="px-5 py-3">
          <div className="flex items-center">
            {/* Vistors number */}
            <div>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">347</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Total Appointments</div>
            </div>
          </div>
        </div>

        {/* Chart built with Chart.js 3 */}
        <div >
          {/* Change the height attribute to adjust the chart height */}
          <LineChart data={chartData} width={389} height={70} />
        </div>

        {/* Table */}
        <div className="grow px-5 pt-3 pb-1">
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500">
                <tr>
                  <th className="py-2">
                    <div className="font-semibold text-left">Appointment Types</div>
                  </th>
                  <th className="py-2">
                    <div className="font-semibold text-right">Count</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Completed</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-slate-800">94</div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Cancelled</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-slate-800">42</div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">New Patients</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-slate-800">12</div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Emegency Appointments</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-slate-800">4</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard02;
