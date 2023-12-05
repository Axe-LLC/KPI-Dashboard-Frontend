import React, { useEffect, useState } from 'react';
import AppointmentLineChart from '../../charts/AppointmentLineChart';

function AppointmentsChart({appointmentsData, isRendering}) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if(appointmentsData?.data) {
      let labels = [];
      let values = [];
      for (var key in appointmentsData.data) {
        labels.push(key);
        values.push(parseFloat(appointmentsData.data[key]));
      }
      setChartData({
        labels: labels,
        datasets: [
          // Indigo line
          {
            data: values,
            fill: true,
            backgroundColor: `#F4EBF9`,
            borderColor: '#B49BC0',
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointBackgroundColor: '#B49BC0',
            pointHoverBackgroundColor: '#B49BC0',
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,          
            clip: 20,
          },
        ],
      })
    }
  }, [appointmentsData])

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
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{appointmentsData?.total ? parseFloat(appointmentsData?.total.toFixed(2)).toLocaleString('en-US') : 0}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Total Appointments</div>
            </div>
          </div>
        </div>

        {/* Chart built with Chart.js 3 */}
        <div className={`grow ${isRendering && 'flex items-center m-auto empty-line-appointments'}`}>
          {/* Change the height attribute to adjust the chart height */}
          {isRendering && <p>Loading now...</p>}
          {chartData?.labels?.length > 0 && !isRendering && <AppointmentLineChart data={chartData} width={389} height={70} />}
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
                    <div className="font-medium text-right text-slate-800">{appointmentsData?.completed ? appointmentsData?.completed : 0}</div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Cancelled</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-slate-800">{appointmentsData?.cancelled ? appointmentsData?.cancelled : 0}</div>
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

export default AppointmentsChart;
