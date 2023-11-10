import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart03';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import RoleSelect from '../../components/RoleSelect';

function AnalyticsByProviderType() {
  const [role, setRole] = useState('Doctor');
  const [selectedItem, setSelectedItem] = useState(0);
  const [chartData, setChartData] = useState(null);

  const dataArray = [
    [
      8000, 5000, 6500, 5000, 6500, 12000, 8000,
      9000, 8000, 8000, 12500, 10000, 10000, 12000,
      11000, 16000, 12000, 10000, 10000, 14000, 9000,
      10000, 15000, 12500, 14000, 11000,
    ],
    [
      5000, 8700, 7500, 12000, 11000, 9500, 10500,
      10000, 15000, 9000, 10000, 7000, 22000, 7200,
      9800, 9000, 10000, 8000, 15000, 12000, 11000,
      13000, 11000, 15000, 17000, 18000,
    ],
    [
      6000, 4000, 7500, 2000, 4500, 11000, 5000,
      12000, 11000, 3000, 10500, 7000, 7000, 9000,
      13000, 17000, 13000, 5000, 4000, 7000, 12000,
      11000, 12000, 15500, 12000, 15000,
    ],
    [
      9000, 11700, 3500, 10000, 12000, 4500, 8500,
      7000, 12000, 5000, 8000, 9000, 12000, 9200,
      9000, 12000, 11000, 4000, 12000, 11000, 10000,
      13000, 15000, 12000, 10000, 12000,
    ]
  ];

	const labels = ['Doctor Hours', 'Doctor Production', 'Production per Doctor Hour', 'Percentage of Doctor Production'];

	useEffect(() => {
		setChartData({
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
					label: labels[selectedItem],
					data: dataArray[selectedItem],
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
	}, [selectedItem])

  return (
    <div className="flex flex-col col-span-full xl:col-span-8 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100 pt-2 pb-2">Analytics By Provider Type</h2>
        <RoleSelect setRole={setRole} />
      </header>
      <div className="px-5 py-1">
        <div className="flex flex-wrap">
          {/* Unique Visitors */}
          <div className="flex items-center py-2 cursor-pointer" onClick={() => { if(selectedItem !== 0) {setSelectedItem(0); setChartData(null); }}}>
            <div className="mr-5">
              <div className="flex items-center">
                <div className={`text-3xl font-bold ${selectedItem === 0 ? 'text-slate-800' : 'text-slate-200'} dark:text-slate-100 mr-2`}>24.7K</div>
                <div className="text-sm font-medium text-emerald-500">+49%</div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{`${role}  Hours`}</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700 mr-5" aria-hidden="true"></div>
          </div>
          {/* Total Pageviews */}
          <div className="flex items-center py-2 cursor-pointer" onClick={() => { if(selectedItem !== 1) {setSelectedItem(1); setChartData(null); }}}>
            <div className="mr-5">
              <div className="flex items-center">
                <div className={`text-3xl font-bold ${selectedItem === 1 ? 'text-slate-800' : 'text-slate-200'} dark:text-slate-100 mr-2`}>56.9K</div>
                <div className="text-sm font-medium text-emerald-500">+7%</div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{`${role} Production`}</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700 mr-5" aria-hidden="true"></div>
          </div>
          {/* Bounce Rate */}
          <div className="flex items-center py-2 cursor-pointer" onClick={() => { if(selectedItem !== 2) {setSelectedItem(2); setChartData(null); }}}>
            <div className="mr-5">
              <div className="flex items-center">
                <div className={`text-3xl font-bold ${selectedItem === 2 ? 'text-slate-800' : 'text-slate-200'} dark:text-slate-100 mr-2`}>54%</div>
                <div className="text-sm font-medium text-amber-500">-7%</div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{`Production per ${role} Hour`}</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700 mr-5" aria-hidden="true"></div>
          </div>
          {/* Visit Duration*/}
          <div className="flex items-center cursor-pointer" onClick={() => { if(selectedItem !== 3) {setSelectedItem(3); setChartData(null); }}}>
            <div>
              <div className="flex items-center">
                <div className={`text-3xl font-bold ${selectedItem === 3 ? 'text-slate-800' : 'text-slate-200'} dark:text-slate-100 mr-2`}>2m 56s</div>
                <div className="text-sm font-medium text-amber-500">+7%</div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{`Percentage of ${role} Production`}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        {chartData?.labels?.length > 0 && <LineChart data={chartData} width={800} height={300} />}
      </div>
    </div>
  );
}

export default AnalyticsByProviderType;
