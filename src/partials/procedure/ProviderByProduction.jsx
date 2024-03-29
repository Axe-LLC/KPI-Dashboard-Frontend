import React, { useState, useEffect } from 'react';
import RoleSelect from '../../components/RoleSelect';
import { STAFF_TYPE_DOCTOR, SERVER_ADDRESS, PROVIDER_NAMES } from '../../utils/Consts';
import { getWorkHoursByProvider } from '../../utils/Utils';
import axios from 'axios';

function ProviderByProduction({data, isRendering, startDate, endDate, clinic, openHours}) {
  const [isInnerRendering, setInnerRendering] = useState(true);
  const [role, setRole] = useState(STAFF_TYPE_DOCTOR);
  const [totalWorkHours, setTotalWorkHours] = useState(0);

  useEffect(() => {
    if(role && startDate && endDate && openHours.length > 0) {
      setInnerRendering(true);
      axios.get(`${SERVER_ADDRESS}/member`, { params: { start: startDate, end: endDate, provider: role, clinic: clinic } }).then(result => {
        const res = getWorkHoursByProvider(startDate, endDate, openHours, result.data);
        setTotalWorkHours(res);
        setInnerRendering(false);
      });
    };
  }, [role, startDate, endDate, clinic, openHours])

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Provider By Production</h2>
        <RoleSelect setRole={setRole} setChartData={() => {}}/>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className={`overflow-x-auto ${(isRendering || isInnerRendering) && 'flex items-center m-auto justify-center'}`} style={{height: 350}}>
          {(isRendering || isInnerRendering) && <p className='text-center'>Loading now...</p>}
          {!isRendering && !isInnerRendering && <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-md" style={{position: 'sticky', top: 0}}>
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Provider Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Production</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Production / Hr</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}
              {Object.keys(data).sort((a, b) => data[b].production - data[a].production).map(key => ((PROVIDER_NAMES.find(item => item.id === key) !== undefined) === (role === STAFF_TYPE_DOCTOR) ? 
                  <tr key={key} style={{height: 50}}>
                    <td className="p-2">
                      <div className="text-left">{PROVIDER_NAMES.find(item => item.id === key)?.name ? PROVIDER_NAMES.find(item => item.id === key)?.name : key}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left text-emerald-500">${parseFloat(data[key]['production'].toFixed(2)).toLocaleString('en-US')}{}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{totalWorkHours === 0 ? 0 : parseFloat((data[key]['production'] / totalWorkHours).toFixed(2)).toLocaleString('en-US')}</div>
                    </td>
                  </tr> : <></>
                )
              )}
            </tbody>
          </table>}
        </div>
      </div>
    </div>
  );
}

export default ProviderByProduction;
