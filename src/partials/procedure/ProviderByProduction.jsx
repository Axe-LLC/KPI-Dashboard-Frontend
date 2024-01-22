import React, { useState } from 'react';
import RoleSelect from '../../components/RoleSelect';
import { STAFF_TYPE_DOCTOR, HYGIENE_CODES } from '../../utils/Consts';

function ProviderByProduction({data, isRendering}) {
  const [role, setRole] = useState(STAFF_TYPE_DOCTOR);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Provider By Production</h2>
        <RoleSelect setRole={setRole} setChartData={() => {}}/>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className={`overflow-x-auto ${isRendering && 'flex items-center m-auto justify-center'}`} style={{height: 350}}>
          {isRendering && <p className='text-center'>Loading now...</p>}
          {!isRendering && <table className="table-auto w-full dark:text-slate-300">
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
              {Object.keys(data).map(key => (HYGIENE_CODES.includes(data[key]['code']) === (role !== STAFF_TYPE_DOCTOR) ? 
                  <tr key={key}>
                    <td className="p-2">
                      <div className="text-left">{key}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left text-emerald-500">${parseFloat(data[key]['production'].toFixed(2)).toLocaleString('en-US')}{}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{0}</div>
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
