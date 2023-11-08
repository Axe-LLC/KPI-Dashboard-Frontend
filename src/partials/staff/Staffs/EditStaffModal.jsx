import React, { useState } from "react";
import axios from "axios";
import ModalBasic from "../../../components/ModalBasic";
import { STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE, EMPLOYEE_STATUS_PART_TIME, EMPLOYEE_STATUS_FULL_TIME, SERVER_ADDRESS } from "../../../utils/Consts";

function EditStaffModal({clinics, fetchStaffs, open, setOpen, staff}) {
  const [startDate, setStartDate] = useState(staff.startDate);
  const [name, setName] = useState(staff.name);
  const [hours, setHours] = useState(staff.hours);
  const [hourly, setHourly] = useState(staff.hourly);
  const [role, setRole] = useState(staff.role);
  const [employeeStatus, setEmployeeStatus] = useState(staff.employeeStatus);
  const [clinic, setClinic] = useState(staff.clinic);
  const [showError, setShowError] = useState(false);

  const updateStaff = () => {
    if (clinic === 0 || !hours || !hourly || startDate === '' || !name) {
      setShowError(true);
    }
    else {
      axios.put(`${SERVER_ADDRESS}/team/${staff.id}`, {
        name: name,
        role: role,
        hours: hours,
        hourly: hourly,
        start_date: startDate,
        employee_status: employeeStatus,
        clinic: clinic
      }).then((res) => {
        fetchStaffs();
        setOpen(false);
      });
    }
  }

  return (
    <React.Fragment>
      <ModalBasic id={`update-staff-modal-${staff.id}`} modalOpen={open} setModalOpen={setOpen} title="Edit Team">
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
              <label className="block text-sm font-medium mb-1" htmlFor="date">Date <span className="text-rose-500">*</span></label>
              <input id="date" className="form-input w-full px-2 py-1" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="role">Role <span className="text-rose-500">*</span></label>
              <select id="role" className="form-input w-full px-2 py-1" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value={STAFF_TYPE_DOCTOR}>Doctor</option>
                <option value={STAFF_TYPE_HYGIENE}>Hygiene</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="hours">Hours <span className="text-rose-500">*</span></label>
              <input id="hours" className="form-input w-full px-2 py-1" type="number" value={hours} onChange={(e) => setHours(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="hours">Hourly <span className="text-rose-500">*</span></label>
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
            <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={(e) => { e.stopPropagation(); setOpen(false); }}>Cancel</button>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => updateStaff()}>Update Team</button>
          </div>
        </div>
      </ModalBasic>
    </React.Fragment>
  )
}

export default EditStaffModal;