import React from 'react';
import './TodoDiv.css';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export default function TodoDiv({ task }) {
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <div className="todoDiv-main">
        <div>
          <input
            type='checkbox'
            className='input-status'
            checked={checked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          <p>{task}</p>
        </div>

        <div className='trash-edit-todo'>
          <FaEdit size={25} />
          <FaRegTrashAlt size={25} />
        </div>
      </div>
      <hr />
    </>
  );
}
