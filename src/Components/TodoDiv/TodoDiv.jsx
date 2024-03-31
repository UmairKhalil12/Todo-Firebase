import React from 'react';
import './TodoDiv.css';
import { FaRegTrashAlt } from "react-icons/fa";

export default function TodoDiv({ todo, toggleComplete, deleteTodo, toggleIndex }) {
  //console.log('todo.complete' , todo.completed); 

  return (
    <>
      <div className="todoDiv-main">
        <div>
          <input
            type='checkbox'
            className='input-status'
            checked={todo.completed ? `checked` : ``}
            onChange={() => toggleComplete(toggleIndex)}
          />
        </div>
        <div>
          {todo.completed ? <p ><s>{todo.task}</s></p> : <p >{todo.task}</p>}
        </div>

        <div className='trash-edit-todo'>
          <FaRegTrashAlt size={25} onClick={() => { deleteTodo(toggleIndex) }} />
        </div>
      </div>
      <hr />
    </>
  );
}
