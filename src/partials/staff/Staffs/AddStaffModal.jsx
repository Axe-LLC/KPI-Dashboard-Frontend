import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalBasic from "../../../components/ModalBasic";
import { STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE, EMPLOYEE_STATUS_PART_TIME, EMPLOYEE_STATUS_FULL_TIME, SERVER_ADDRESS } from "../../../utils/Consts";
import WorkHoursList from "./WorkHoursList";

function AddStaffModal({clinics, fetchStaffs}) {
  const [addStaffModalOpen, setAddStaffModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [hourly, setHourly] = useState(0);
  const [role, setRole] = useState(STAFF_TYPE_DOCTOR);
  const [employeeStatus, setEmployeeStatus] = useState(EMPLOYEE_STATUS_PART_TIME);
  const [clinic, setClinic] = useState(0);
  const [showError, setShowError] = useState(false);
  const [workHoursList, setWorkHoursList] = useState([]);

  useEffect(() => {
    setName('');
    setHourly(0);
    setRole(STAFF_TYPE_DOCTOR);
    setEmployeeStatus(EMPLOYEE_STATUS_FULL_TIME);
    setClinic(0);
  }, [addStaffModalOpen]);
  
  const addStaff = () => {
    setShowError(false);
    if (clinic === 0 || !name || hasDuplicateWorkHourList()) {
      setShowError(true);
    }
    else {
      axios.post(`${SERVER_ADDRESS}/team`, {
        name: name,
        role: role,
        hourly: hourly,
        employee_status: employeeStatus,
        clinic: clinic
      }).then((res) => {
        fetchStaffs();
        setAddStaffModalOpen(false);
      });
    }
  }

  const addWorkHours = () => {
    setShowError(false);
    let updatedList = [...workHoursList];
    updatedList.push({year: new Date().getFullYear(), month: '01', workHours: 0});
    setWorkHoursList(updatedList);
  }

  const updateList = (index, key, value) => {
    setShowError(false);
    const updatedList = [...workHoursList];
    updatedList[index] = {
      ...updatedList,
      [key]: value
    }
    setWorkHoursList(updatedList);
  }

  const removeListItem = (index) => {
    setShowError(false);
    const updatedList = workHoursList.filter((_, i) => i !== index);
    setWorkHoursList(updatedList);
  }

  const hasDuplicateWorkHourList = () => {
    for (let i = 0; i < workHoursList.length; i++) {
      for (let j = i + 1; j < workHoursList.length; j++) {
        if (workHoursList[i].year === workHoursList[j].year && workHoursList[i].month === workHoursList[j].month) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <button
        className="btn primary-button text-white"
        aria-controls="feedback-modal"
        onClick={(e) => {
          e.stopPropagation();
          setAddStaffModalOpen(true);
        }}
      >
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-2">Add Team Member</span>
      </button>
      <ModalBasic id="feedback-modal" modalOpen={addStaffModalOpen} setModalOpen={setAddStaffModalOpen} title="Add Team Member">
        <div className="px-5 py-4">
          <div className="text-sm">
            {/* <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">Let us know what you think 🙌</div> */}
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Name <span className="text-rose-500">*</span></label>
              <input id="name" className="form-input w-full px-2 py-1" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="role">Role <span className="text-rose-500">*</span></label>
              <select id="role" className="form-input w-full px-2 py-1" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value={STAFF_TYPE_DOCTOR}>Doctor</option>
                <option value={STAFF_TYPE_HYGIENE}>Hygiene</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="hours">Hourly</label>
              <input id="hourly" className="form-input w-full px-2 py-1" type="number" value={hourly} onChange={(e) => setHourly(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="employee-status">Employee Status <span className="text-rose-500">*</span></label>
              <select id="employee-status" className="form-input w-full px-2 py-1" value={employeeStatus} onChange={(e) => setEmployeeStatus(e.target.value)}>
                <option value={EMPLOYEE_STATUS_PART_TIME}>Part-Time</option>
                <option value={EMPLOYEE_STATUS_FULL_TIME}>Full-time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="clinic">Clinic <span className="text-rose-500">*</span></label>
              <select id="type" className="form-input w-full px-2 py-1" value={clinic} onChange={(e) => setClinic(e.target.value)}>
                <option value={0}>--- Select Clinic ---</option>
                {clinics.filter(c => c.id !== 0).map((c, index) => (
                  <option key={index} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-700">
              <label className="block text-sm font-medium mb-1" htmlFor="clinic">Work Hours</label>
              {
                workHoursList.map((list, index) => (
                  <WorkHoursList key={index} index={index} data={list} updateList={updateList} removeListItem={removeListItem} />
                ))
              }
            </div>
            <div className="px-5">
              <div className="w-full text-right">
                <button className="btn-sm primary-button text-white" onClick={() => addWorkHours()}>Add More</button>
              </div>
            </div>
            <div>
              {showError && <p className="text-rose-500">{hasDuplicateWorkHourList() ? "You can't add work hours for same month." : "Please fill out all fields."}</p>}
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap justify-end space-x-2">
            <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={(e) => { e.stopPropagation(); setAddStaffModalOpen(false); }}>Cancel</button>
            <button className="btn-sm primary-button text-white" onClick={() => addStaff()}>Add Team Member</button>
          </div>
        </div>
      </ModalBasic>
    </React.Fragment>
  )
}

export default AddStaffModal;