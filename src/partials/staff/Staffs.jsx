import { useState, useEffect } from "react";
import axios from "axios";
import DeleteButton from "../actions/DeleteButton";
import StaffsTable from "./Staffs/StaffsTable";
import PaginationClassic from "../../components/PaginationClassic";
import { SERVER_ADDRESS } from "../../utils/Consts";

function Staffs({clinics, staffs, fetchStaffs}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    setPage(0);
  }, [staffs])

  const handleDelete = () => {
    axios.delete(`${SERVER_ADDRESS}/members`, {
      headers: {},
      data: selectedItems
    }).then((res) => {
      fetchStaffs();
      setSelectedItems([]);
    })
  }

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mt-4 mb-2">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          {/* <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Team ✨</h1> */}
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <DeleteButton selectedItems={selectedItems} handleDelete={handleDelete} />
          {/* Dropdown */}
          {/* <DateSelect /> */}
          {/* Filter button */}
          {/* <FilterButton align="right" /> */}
        </div>

      </div>

      {/* Table */}
      <StaffsTable
        count={staffs.length}
        selectedItems={handleSelectedItems}
        staffs={staffs.slice(page * perPage, page * perPage + (staffs.length - (page + 1) * perPage > 0 ? perPage : staffs.length - page * perPage))}
        clinics={clinics}
        fetchStaffs={fetchStaffs}
      />
      {/* Pagination */}
      <div className="mt-8 mb-8">
        <PaginationClassic page={page} count={staffs.length} handleNext={() => setPage(page + 1)} handlePrev={() => setPage(page - 1)} perPage={perPage}/>
      </div>

    </div>)
}

export default Staffs;