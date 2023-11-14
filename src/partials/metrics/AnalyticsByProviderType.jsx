import React, { useEffect, useState } from 'react';
import AnalyticsTypeChart from '../../charts/AnalyticsTypeChart';
import axios from 'axios';
import { METRICS_DOCTOR_PRODUCTION, METRICS_HYGIENE_PRODUCTION, METRICS_PRODUCTION, SERVER_ADDRESS, STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE } from '../../utils/Consts';
// Import utilities
import RoleSelect from '../../components/RoleSelect';
import { getFilteredDays, kFormatter } from '../../utils/Utils';

function AnalyticsByProviderType({metricsData, startDate, endDate, clinic, outerRendering}) {
  const [role, setRole] = useState(STAFF_TYPE_DOCTOR);
  const [selectedItem, setSelectedItem] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [isRendering, setRendering] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [totalProduction, setTotalProduction] = useState(0);
  const [totalRoleProduction, setTotalRoleProduction] = useState(0);

	const labels = [
    ['Doctor Hours', 'Doctor Production', 'Production per Doctor Hour', 'Percentage of Doctor Production'],
    ['Hygiene Hours', 'Hygiene Production', 'Production per Hygiene Hour', 'Percentage of Hygiene Production']
];

  useEffect(() => {
    if(startDate && endDate) {
      fetchStaffs();
    }
  }, [startDate, endDate, clinic, role]);

  useEffect(() => {
    if (!outerRendering) {
      let graphLabels = [];
      let hoursValues = [];
      let productionValues = [];
      let productionPerHourValues = [];
      let percentageValues = [];
      let hours = 0;
      let production = 0;
      let totalProductionValue = 0;
  
      for (var key in staffData) {
        graphLabels.push(key);
        hoursValues.push(staffData[key][role]);
        hours += staffData[key][role];
      }
      setTotalHours(hours);

      for (var key in metricsData) {
        totalProductionValue += metricsData[key][METRICS_PRODUCTION];
        if (role === STAFF_TYPE_DOCTOR) {
          production += metricsData[key][METRICS_DOCTOR_PRODUCTION];
          productionValues.push(metricsData[key][METRICS_DOCTOR_PRODUCTION]);
          productionPerHourValues.push(staffData[key][role] === 0 ? 0 : parseFloat(metricsData[key][METRICS_DOCTOR_PRODUCTION] / staffData[key][role]).toFixed(2));
          percentageValues.push(metricsData[key][METRICS_PRODUCTION] === 0 ? 0 : parseFloat(metricsData[key][METRICS_DOCTOR_PRODUCTION] / metricsData[key][METRICS_PRODUCTION] * 100).toFixed(2));
        }
        else {
          production += metricsData[key][METRICS_HYGIENE_PRODUCTION];
          productionValues.push(metricsData[key][METRICS_HYGIENE_PRODUCTION]);
          productionPerHourValues.push(staffData[key][role] === 0 ? 0 : parseFloat(metricsData[key][METRICS_HYGIENE_PRODUCTION] / staffData[key][role]).toFixed(2));
          percentageValues.push(metricsData[key][METRICS_PRODUCTION] === 0 ? 0 : parseFloat(metricsData[key][METRICS_HYGIENE_PRODUCTION] / metricsData[key][METRICS_PRODUCTION] * 100).toFixed(2));
        }
      }
  
      setTotalProduction(totalProductionValue);
      setTotalRoleProduction(production);
  
      setChartData({
        labels: graphLabels,
        datasets: [
          // Indigo line
          {
            label: labels[role === STAFF_TYPE_DOCTOR ? 0 : 1][selectedItem],
            data: selectedItem === 0 ? hoursValues :  (selectedItem === 1 ? productionValues : ( selectedItem === 2 ? productionPerHourValues : percentageValues)),
            fill: true,
            backgroundColor: `#E1EFF9`,
            borderColor: '#66A6C4',
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointBackgroundColor: '#66A6C4',
            pointHoverBackgroundColor: '#66A6C4',
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,          
            clip: 20,
          }
        ],
      });
  
      setRendering(false);
    }
  }, [role, staffData, selectedItem, outerRendering])

  const fetchStaffs = () => {
    setRendering(true);
    axios.get(`${SERVER_ADDRESS}/team`, { params: { start: startDate, end: endDate } }).then((res) => {
      let dayArray = getFilteredDays(startDate, endDate);
      const filteredDataByClinic = clinic !== 0 ? res.data.filter(d => d.clinic == clinic) : res.data;
      for (let i=0; i<filteredDataByClinic.length; i++) {
        let data = dayArray[filteredDataByClinic[i].start_date];
        if(data) {
          if (filteredDataByClinic[i].role === STAFF_TYPE_DOCTOR) {
            data[STAFF_TYPE_DOCTOR] += filteredDataByClinic[i].hours;
          }
          else {
            data[STAFF_TYPE_HYGIENE] += filteredDataByClinic[i].hours;
          }
          dayArray[filteredDataByClinic[i].start_date] = data;
        }
      }
      setStaffData(dayArray);
    });
  }


  return (
    <div className="flex flex-col col-span-full xl:col-span-8 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100 pt-2 pb-2">Analytics By Provider Type</h2>
        <RoleSelect setRole={setRole} setChartData={setChartData} />
      </header>
      <div className="px-5 py-1">
        <div className="flex flex-wrap">
          {/* Unique Visitors */}
          <div className="flex items-center py-2 cursor-pointer" onClick={() => { if(selectedItem !== 0) {setSelectedItem(0); setChartData(null); }}}>
            <div className="mr-5">
              <div className="flex items-center">
                <div className={`text-3xl font-bold ${selectedItem === 0 ? 'text-slate-800' : 'text-slate-200'} dark:text-slate-100 mr-2`}>{totalHours.toFixed(2)}</div>
                <div className="text-sm font-medium text-emerald-500">+49%</div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">{`${role}  Hours`}</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700 mr-5" aria-hidden="true"></div>
          </div>
          {/* Total Pageviews */}
          <div className="flex items-center py-2 cursor-pointer" onClick={() => { if(selectedItem !== 1) {setSelectedItem(1); setChartData(null); }}}>
            <div className="mr-5">
              <div className="flex items-center">
                <div className={`text-3xl font-bold ${selectedItem === 1 ? 'text-slate-800' : 'text-slate-200'} dark:text-slate-100 mr-2`}>${kFormatter(totalRoleProduction.toFixed(2))}</div>
                <div className="text-sm font-medium text-emerald-500">+7%</div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">{`${role} Production`}</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700 mr-5" aria-hidden="true"></div>
          </div>
          {/* Bounce Rate */}
          <div className="flex items-center py-2 cursor-pointer" onClick={() => { if(selectedItem !== 2) {setSelectedItem(2); setChartData(null); }}}>
            <div className="mr-5">
              <div className="flex items-center">
                <div className={`text-3xl font-bold ${selectedItem === 2 ? 'text-slate-800' : 'text-slate-200'} dark:text-slate-100 mr-2`}>${totalHours === 0 ? 0 : kFormatter(parseFloat(totalRoleProduction / totalHours).toFixed(2))}</div>
                <div className="text-sm font-medium text-amber-500">-7%</div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">{`Production per ${role} Hour`}</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700 mr-5" aria-hidden="true"></div>
          </div>
          {/* Visit Duration*/}
          <div className="flex items-center cursor-pointer" onClick={() => { if(selectedItem !== 3) {setSelectedItem(3); setChartData(null); }}}>
            <div>
              <div className="flex items-center">
                <div className={`text-3xl font-bold ${selectedItem === 3 ? 'text-slate-800' : 'text-slate-200'} dark:text-slate-100 mr-2`}>{totalProduction === 0 ? 0 : parseFloat(totalRoleProduction / totalProduction * 100).toFixed(2)}%</div>
                <div className="text-sm font-medium text-amber-500">+7%</div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">{`Percentage of ${role} Production`}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className={`grow ${(isRendering || outerRendering) && 'flex items-center m-auto empty-line-chart-metrics'}`}>
        {/* Change the height attribute to adjust the chart height */}
        {(isRendering || outerRendering) && <p>Loading now...</p>}
        {chartData?.labels?.length > 0 && !isRendering && !outerRendering && <AnalyticsTypeChart data={chartData} width={800} height={300} />}
      </div>
    </div>
  );
}

export default AnalyticsByProviderType;
