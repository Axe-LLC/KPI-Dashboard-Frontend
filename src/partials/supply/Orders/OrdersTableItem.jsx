import React, { useEffect, useState } from 'react';
import { STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE } from '../../../utils/Consts';

function OrdersTableItem(props) {
  const [clinicName, setClinicName] = useState('');

  useEffect(() => {
    setClinicName(props.clinics.find(item => item.id == props.clinic)?.name)
  }, [props.clinics])

  const statusColor = (status) => {
    switch (status) {
      case STAFF_TYPE_DOCTOR:
        return 'bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400';
      case STAFF_TYPE_HYGIENE:
        return 'bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400';
    }
  };

  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} />
            </label>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center text-slate-800">
            <div className="font-medium text-sky-500">{props.order}</div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div>{props.date}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-medium text-slate-800 dark:text-slate-100">{props.name}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-emerald-500">{props.total}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(props.type)}`}>{props.type}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5`}>{clinicName}</div>
        </td>
      </tr>
    </tbody>
  );
}

export default OrdersTableItem;
