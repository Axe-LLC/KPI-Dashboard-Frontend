import React, { useEffect, useState } from 'react';
import { STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE } from '../../../utils/Consts';
import EditOrderModal from './EditOrderModal';

function OrdersTableItem(props) {
  const [clinicName, setClinicName] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    setClinicName(props.clinics.find(item => item.id == props.clinic)?.name)
  }, [props.clinics])

  const statusColor = (status) => {
    switch (status) {
      case STAFF_TYPE_DOCTOR:
        return '#F09375';
      case STAFF_TYPE_HYGIENE:
        return '#FBD08F';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400';
    }
  };

  return (
    <React.Fragment>
      <tbody className="text-sm" onClick={() => setEditModalOpen(true)} aria-controls={`update-order-modal-${props.id}`}>
        {/* Row */}
        <tr>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
            <div className="flex items-center">
              <label className="inline-flex">
                <span className="sr-only">Select</span>
                <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} onClick={(e) => e.stopPropagation()}/>
              </label>
            </div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="flex items-center text-slate-800">
              <div className="font-medium text-sky-500">{props.number}</div>
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
            <div className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5`} style={{color: statusColor(props.type)}}>{props.type}</div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5`}>{clinicName}</div>
          </td>
        </tr>
      </tbody>
      <EditOrderModal clinics={props.clinics} fetchOrders={props.fetchOrders} open={editModalOpen} setOpen={setEditModalOpen}
        order={{
          id: props.id,
          total: props.total,
          number: props.number,
          date: props.date,
          name: props.name,
          type: props.type,
          clinic: props.clinic
        }}
      />
    </React.Fragment>
  );
}

export default OrdersTableItem;
