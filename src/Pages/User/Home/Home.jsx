import React from 'react'
import './Home.css'
import Navbar from '../../../Components/Navbar/Navbar'
import appStore from '../../../zustand/appStore'
import { FaPlusSquare } from "react-icons/fa";
import TodoDiv from '../../../Components/TodoDiv/TodoDiv';

const Todos = [
  'learn react',
  'play football , learn node , learn appwrite',
  'enjoy fishing while you can'
]


export default function Home() {
  const [todo, setTodo] = React.useState();
  const { user } = appStore((state) => ({ user: state.user }));
  const handleFormSubmit = () => {

  }

  return (
    <>
      <Navbar />
      <div className="form-div" >
        <form className="main-form" onSubmit={handleFormSubmit}>
          <div className="form-todo-input">
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              type='text'
              className='input-todo'
              placeholder='Enter your todo'
            />
            <FaPlusSquare size={45} className='add-todo-icon' />

          </div>
        </form>
        <div>
          {Todos.map((todo) => {
            return (
              <TodoDiv task={todo} />
            )
          })}
        </div>

      </div>
    </>
  )
}
