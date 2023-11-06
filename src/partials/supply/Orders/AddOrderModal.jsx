import React, { useState } from "react";
import axios from "axios";
import ModalBasic from "../../../components/ModalBasic";
import { SERVER_ADDRESS, STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE } from "../../../utils/Consts";

function AddOrderModal({clinics, fetchOrders}) {
  const [addOrderModalOpen, setAddOrderModalOpen] = useState(false);
  const [number, setNumber] = useState();
  const [date, setDate] = useState('');
  const [name, setName] = useState();
  const [total, setTotal] = useState();
  const [type, setType] = useState(STAFF_TYPE_DOCTOR);
  const [clinic, setClinic] = useState(0);
  const [showError, setShowError] = useState(false);

  const addOrder = () => {
    if (clinic === 0 || !number || date === '' || !name || total === undefined) {
      setShowError(true);
    }
    else {
      axios.post(`${SERVER_ADDRESS}/order`, {
        number: number,
        date: date,
        name: name,
        total: total,
        type: type,
        clinic: clinic
      }).then((res) => {
        fetchOrders();
        setName();
        setNumber();
        setDate('');
        setTotal();
        setType(STAFF_TYPE_DOCTOR);
        setClinic();
        setAddOrderModalOpen(false);
      });
    }
  }

  return (
    <React.Fragment>
      <button
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        aria-controls="feedback-modal"
        onClick={(e) => {
          e.stopPropagation();
          setAddOrderModalOpen(true);
        }}
      >
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-2">Add Order</span>
      </button>
      <ModalBasic id="feedback-modal" modalOpen={addOrderModalOpen} setModalOpen={setAddOrderModalOpen} title="Add Order">
        <div className="px-5 py-4">
          <div className="text-sm">
            {/* <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">Let us know what you think 🙌</div> */}
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Order Number <span className="text-rose-500">*</span></label>
              <input id="number" className="form-input w-full px-2 py-1" type="text" value={number} onChange={(e) => {setNumber(e.target.value); setShowError(false);}} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="date">Date <span className="text-rose-500">*</span></label>
              <input id="date" className="form-input w-full px-2 py-1" type="date" value={date} onChange={(e) => {setDate(e.target.value); setShowError(false);}} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Name <span className="text-rose-500">*</span></label>
              <input id="name" className="form-input w-full px-2 py-1" type="text" value={name} onChange={(e) => {setName(e.target.value); setShowError(false);}} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="total">Total <span className="text-rose-500">*</span></label>
              <input id="total" className="form-input w-full px-2 py-1" type="number" value={total} onChange={(e) => {setTotal(e.target.value); setShowError(false);}} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="total">Type <span className="text-rose-500">*</span></label>
              <select id="type" className="form-input w-full px-2 py-1" value={type} onChange={(e) => {setType(e.target.value); setShowError(false);}}>
                <option value={STAFF_TYPE_DOCTOR}>Doctor</option>
                <option value={STAFF_TYPE_HYGIENE}>Hygiene</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="clinic">Clinic <span className="text-rose-500">*</span></label>
              <select id="type" className="form-input w-full px-2 py-1" value={clinic} onChange={(e) => {setClinic(e.target.value); setShowError(false);}}>
                <option value={0}>--- Select Clinic ---</option>
                {clinics.map((c, index) => (
                  <option key={index} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              {showError && <p className="text-rose-500">Please fill out all fields.</p>}
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap justify-end space-x-2">
            <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={(e) => { e.stopPropagation(); setAddOrderModalOpen(false); }}>Cancel</button>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => addOrder()}>Add Order</button>
          </div>
        </div>
      </ModalBasic>
    </React.Fragment>
  )
}

export default AddOrderModal;