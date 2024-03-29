import React, { useEffect, useState } from 'react';
import { STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE } from '../../../utils/Consts';
import EditOrderModal from './EditOrderModal';
import { dateStringType } from '../../../utils/Utils';

function OrdersTableItem(props) {
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

  return (
    <React.Fragment>
      <tbody className="text-sm" onClick={() => setEditModalOpen(true)} aria-controls={`update-order-modal-${props.id}`}>
        {/* Row */}
        <tr className='border-b'>
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
              <div className="font-medium staff-table-text">{props.number}</div>
            </div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className='staff-table-text'>{dateStringType(props.date)}</div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="font-medium dark:text-slate-100 staff-table-text">{props.name}</div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="text-left font-medium staff-table-text">${props.total.toFixed(2)}</div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className={`inline-flex font-medium rounded-full text-center capitalize`} style={{color: statusColor(props.type)}}>{props.type}</div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            {parseInt(props.clinic) === -1 ? 
              props.clinics.filter(c => c.id !== 0).map(c => (
                  <div key={c.id} className={`inline-flex font-medium text-center px-2.5 py-0.5 staff-table-clinic mr-1`}>{c.name}</div>
              ))
              :
              <div className={`inline-flex font-medium text-center px-2.5 py-0.5 staff-table-clinic`}>{clinicName}</div>
            }
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
