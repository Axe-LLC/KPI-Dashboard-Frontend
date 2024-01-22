import React from 'react';

function WorkHoursList({index, data, updateList, removeListItem}) {
  const currentDate = new Date();
  const years = [];
  for (let i = 2012; i <= currentDate.getFullYear(); i++) {
    years.push(i);
  }
  const months = [
    { name: 'Jan', value: '01' },
    { name: 'Feb', value: '02' },
    { name: 'Mar', value: '03' },
    { name: 'Apr', value: '04' },
    { name: 'May', value: '05' },
    { name: 'Jun', value: '06' },
    { name: 'Jul', value: '07' },
    { name: 'Aug', value: '08' },
    { name: 'Sep', value: '09' },
    { name: 'Oct', value: '10' },
    { name: 'Nov', value: '11' },
    { name: 'Dec', value: '12' }
  ]

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="flex flex-col col-span-4 sm:col-span-4 xl:col-span-4 rounded-md">
        <label className="block text-sm font-medium mb-1" htmlFor="year">Year <span className="text-rose-500">*</span></label>
        <select id="year" className="form-input w-full px-2 py-1" value={data.year} onChange={(e) => updateList(index, 'year', e.target.value)}>
          {
            years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))
          }
        </select>
      </div>
      <div className="flex flex-col col-span-4 sm:col-span-4 xl:col-span-4 rounded-md">
        <label className="block text-sm font-medium mb-1" htmlFor="month">Month <span className="text-rose-500">*</span></label>
        <select id="month" className="form-input w-full px-2 py-1" value={data.month} onChange={(e) => updateList(index, 'month', e.target.value)}>
          {
            months.map((m) => (
              <option key={m.value} value={m.value}>{m.name}</option>
            ))
          }
        </select>
      </div>
      <div className="flex flex-col col-span-3 sm:col-span-3 xl:col-span-3 rounded-md">
        <label className="block text-sm font-medium mb-1" htmlFor="hours">Hours <span className="text-rose-500">*</span></label>
        <input id="hours" className="form-input w-full px-2 py-1" type="number" value={data.workHours} onChange={(e) => updateList(index, 'workHours', e.target.value)} required />
      </div>
      <div className="flex flex-col col-span-1 sm:col-span-1 xl:col-span-1 rounded-md">
        <button className="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400 mt-8" onClick={() => removeListItem(index)}>
          <svg className="w-4 h-4 fill-current">
            <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default WorkHoursList;