import { useState, useEffect } from "react";
import axios from "axios";
import DeleteButton from "../actions/DeleteButton";
import DateSelect from "../../components/DateSelect";
import FilterButton from '../../components/DropdownFilter';
import StaffsTable from "./Staffs/StaffsTable";
import PaginationClassic from "../../components/PaginationClassic";
import AddStaffModal from "./Staffs/AddStaffModal";
import { getCurrentMonthDays } from "../../utils/Utils";
import { EMPLOYEE_STATUS_FULL_TIME, EMPLOYEE_STATUS_PART_TIME, SERVER_ADDRESS, STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE } from "../../utils/Consts";

function Staffs({setStaffData, setRendering}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const fetchStaffs = () => {
    setRendering(true);
    axios.get(`${SERVER_ADDRESS}/team`).then((res) => {
      let dayArray = getCurrentMonthDays();
      setStaffs(res.data);
      for (let i=0; i<res.data.length; i++) {
        let data = dayArray[res.data[i].start_date];
        if (res.data[i].role === STAFF_TYPE_DOCTOR) {
          data[STAFF_TYPE_DOCTOR] += res.data[i].hours;
        }
        else {
          data[STAFF_TYPE_HYGIENE] += res.data[i].hours;
        }

        if (res.data[i].employee_status === EMPLOYEE_STATUS_FULL_TIME) {
          data[EMPLOYEE_STATUS_FULL_TIME] += res.data[i].hours;
        }
        else {
          data[EMPLOYEE_STATUS_PART_TIME] += res.data[i].hours;
        }

        dayArray[res.data[i].start_date] = data;
      }
      setStaffData(dayArray);
    });
  }

  const fetchClincs = () => {
    axios.get(`${SERVER_ADDRESS}/clinics`).then((res) => setClinics(res.data.data[0][1]));
  }

  useEffect(() => {
    fetchStaffs();
    fetchClincs();
  }, []);
  

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Team ✨</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <DeleteButton selectedItems={selectedItems} />
          {/* Dropdown */}
          <DateSelect />
          {/* Filter button */}
          <FilterButton align="right" />
          {/* Add order button */}
          <AddStaffModal clinics={clinics} fetchStaffs={fetchStaffs} />
        </div>

      </div>

      {/* Table */}
      <StaffsTable selectedItems={handleSelectedItems} staffs={staffs} clinics={clinics} />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic />
      </div>

    </div>)
}

export default Staffs;