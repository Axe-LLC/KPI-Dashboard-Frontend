import React, { useEffect, useState } from 'react';
import { STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE, EMPLOYEE_STATUS_FULL_TIME, EMPLOYEE_STATUS_PART_TIME } from '../../../utils/Consts';
import EditStaffModal from './EditStaffModal';

function StaffsTableItem(props) {
  const [clinicName, setClinicName] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    setClinicName(props.clinics.find(item => item.id == props.clinic)?.name)
  }, [props.clinics])

  const statusColor = (status) => {
    switch (status) {
      case STAFF_TYPE_DOCTOR:
        return '#FFBBA8';
      case STAFF_TYPE_HYGIENE:
        return '#EFB351';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400';
    }
  };

  const employeeColor = (employee_status) => {
    switch (employee_status) {
      case EMPLOYEE_STATUS_FULL_TIME:
        return '#B49BC0';
      case EMPLOYEE_STATUS_PART_TIME:
        return '#66A6C4';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400';
    }
  };

  return (
    <React.Fragment>
      <tbody className="text-sm" onClick={() => setEditModalOpen(true)} aria-controls={`update-staff-modal-${props.id}`}>
        {/* Row */}
        <tr className='border-b' style={{height: 50}}>
          <td className="px-2 first:pl-5 last:pr-5 whitespace-nowrap w-px">
            <div className="flex items-center">
              <label className="inline-flex">
                <span className="sr-only">Select</span>
                <input
                  id={props.id}
                  className="form-checkbox"
                  type="checkbox"
                  onChange={props.handleClick}
                  checked={props.isChecked}
                  onClick={(e) => e.stopPropagation()}
                />
              </label>
            </div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 whitespace-nowrap">
            <div className="flex items-center text-slate-800">
              <div className="font-medium staff-table-text">{props.name}</div>
            </div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 whitespace-nowrap">
            <div className={`inline-flex font-medium rounded-full text-center capitalize`} style={{color: statusColor(props.role)}}>{props.role}</div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 whitespace-nowrap">
            <div className="text-left font-medium capitalize" style={{color: employeeColor(props.employeeStatus)}}>{props.employeeStatus}</div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 whitespace-nowrap">
            {props.clinic === -1 ? 
              props.clinics.filter(c => c.id !== 0).map(c => (
                  <div key={c.id} className={`inline-flex font-medium text-center px-2.5 py-0.5 staff-table-clinic mr-1`}>{c.name}</div>
              ))
            :<div className={`inline-flex font-medium text-center px-2.5 py-0.5 staff-table-clinic`}>{clinicName}</div>}
          </td>
        </tr>
      </tbody>
      <EditStaffModal clinics={props.clinics} fetchStaffs={props.fetchStaffs} open={editModalOpen} setOpen={setEditModalOpen}
        staff={{
          id: props.id,
          name: props.name,
          role: props.role,
          hourly: props.hourly,
          work_hours: props.work_hours,
          employeeStatus: props.employeeStatus,
          clinic: props.clinic
        }}
      />
    </React.Fragment>
  );
}

export default StaffsTableItem;
