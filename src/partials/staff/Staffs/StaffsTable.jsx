import React, { useState, useEffect } from 'react';
import StaffsTableItem from './StaffsTableItem';

function StaffsTable({
  count,
  selectedItems,
  staffs,
  clinics,
  fetchStaffs,
  fetchAllStaffs,
  isUpdated
}) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(staffs.map(li => parseInt(li.id)));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, parseInt(id)]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== parseInt(id)));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  useEffect(() => {
    setIsCheck([]);
    setSelectAll(false);
  }, [isUpdated])

  return (
    <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 relative staff-table-min-height">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">All Teams <span className="text-slate-400 dark:text-slate-500 font-medium">{count}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-700">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Role</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Employee Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Clinic</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {
              staffs.map(staff => {
                return (
                  <StaffsTableItem
                    key={staff.id}
                    id={staff.id}
                    name={staff.name}
                    role={staff.role}
                    hourly={staff.hourly}
                    work_hours={staff.work_hours}
                    employeeStatus={staff.employee_status}
                    clinic={staff.clinic}
                    clinics={clinics}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(staff.id)}
                    fetchStaffs={fetchStaffs}
                    fetchAllStaffs={fetchAllStaffs}
                  />
                )
              })
            }
          </table>
        </div>
      </div>
    </div>
  );
}

export default StaffsTable;
