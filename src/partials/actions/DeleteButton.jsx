import React, { useState } from 'react';
import ModalBasic from '../../components/ModalBasic';

function DeleteButton({
  selectedItems,
  handleDelete
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={`${selectedItems.length < 1 && 'hidden'}`}>
      <div className="flex items-center">
        <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span>{selectedItems.length}</span> items selected</div>
        <button className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-rose-500" onClick={() => setShowModal(true)}>Delete</button>
        <ModalBasic modalOpen={showModal} setModalOpen={setShowModal} title="">
          <div className="px-5 py-4">
            <div className="text-sm">
              {/* <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">Let us know what you think 🙌</div> */}
            </div>
            <div className="space-y-3">
              <p>{`Are you sure want to delete this ${selectedItems.length} selected items?`}</p>
            </div>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap justify-end space-x-2">
              <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => { handleDelete(); setShowModal(false); }}>Confirm</button>
            </div>
          </div>
        </ModalBasic>
      </div>
    </div>
  );
}

export default DeleteButton;