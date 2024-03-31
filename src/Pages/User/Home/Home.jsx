import { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../../Components/Navbar/Navbar'
import { FaPlusSquare } from "react-icons/fa";
import TodoDiv from '../../../Components/TodoDiv/TodoDiv';
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../Firebase/firebase';
import appStore from '../../../zustand/appStore';


// const Todos = [
//   'learn react',
//   'play football , learn node , learn appwrite',
//   'enjoy fishing while you can'
// ]


export default function Home() {
  const [input, setInput] = useState();
  const [docId, setDocId] = useState('');
  const [todos, setTodos] = useState([]);
  //const [completedTodo , setCompletedTodo] = useState(); 

  const { userInfo } = appStore((state) => ({ userInfo: state.userInfo }));


  //Read todo from firebase
  const getTodos = async (userId) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'todos'), where('userId', '==', userId)));
      const Usertodos = [];
      querySnapshot.forEach((doc) => {
        const todosData = doc.data().todos; // Access the 'todos' field from the document
        Usertodos.push(...todosData);
        setDocId(doc.id);
      });
      setTodos(Usertodos);

      return Usertodos;
    } catch (error) {
      console.error("Error getting documents: ", error);
      return [];
    }
  }


  useEffect(() => {
    getTodos(userInfo.uid)
  });

  //console.log('user.uid home page',user.uid);
  //console.log('user home page', user)

  const createTodo = async (e) => {
    e.preventDefault();
    if (input.length === 0) {
      alert("Please enter todo")
      return
    }
    try {
      const todo = {
        task: input,
        completed: false
      };
      const todoRef = doc(db, 'todos', docId);
      await updateDoc(todoRef, {
        todos: arrayUnion(todo)
      });
      setInput('');
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  const toggleComplete = async (index) => {
    try {
      const updatedTodos = [...todos];
      updatedTodos[index].completed = !updatedTodos[index].completed;

      const todoRef = doc(db, 'todos', docId);
      await updateDoc(todoRef, {
        todos: updatedTodos
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error toggling todo completion (error changing status of task): ", error);
    }
  }


  //Delete todo 

  const deleteTodo = async (index) => {
    try {
      const updatedTodos = [...todos];
      updatedTodos.pop(index);

      const todoRef = doc(db, 'todos', docId);
      await updateDoc(todoRef, {
        todos: updatedTodos
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  }

  //console.log('home todos',todos)

  const completedTodos = () => {
    return todos.filter((todo) => {
      return todo.completed === true;
    });
  };

  const completedTasks = completedTodos();

  // console.log(completedTodo);

  return (
    <>
      <Navbar />
      <div className="form-div" >
        <div>
          <h3>Hello , {userInfo.email}</h3>
        </div>
        <form className="main-form" onSubmit={createTodo}>
          <div className="form-todo-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type='text'
              className='input-todo'
              placeholder='Enter your todo'
            />
            <button type='submit' className='add-todo-button' ><FaPlusSquare size={45} className='add-todo-icon' /> </button>

          </div>
        </form>

        <div>
          {todos?.map((todo, index) => {
            if (index === 0) {
              return null; // Skip the first element
            } else {
              return (
                <TodoDiv key={index + todo.task} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} toggleIndex={index} />
              );
            }
          })}
          <p>You have {todos.length-1} todo(s)</p>
          <p><i>Completed : {completedTasks.length} </i></p>
          <p><i>Not Completed : {todos.length-1 - completedTasks.length} </i></p>
        </div>

      </div>
    </>
  )
}
