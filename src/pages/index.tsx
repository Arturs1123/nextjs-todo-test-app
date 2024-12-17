import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, toggleTaskStatus, deleteTask } from '@/store/tasksSlice';
import Link from 'next/link';
import type { RootState, AppDispatch } from '@/store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(0);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      dispatch(setTasks(data.slice(0, 10))); // Limit to 10 tasks
    }
    if (!tasks.length) { // "if condition" code is added for showing added tasks in local
      fetchTasks();
    }
  }, [dispatch, tasks]);

  const handleDropdownClick = (taskId: number) => {
    if (selectedDropdownItem) {
      if (selectedDropdownItem === taskId) {
        setSelectedDropdownItem(0)
      } else {
        setSelectedDropdownItem(taskId)
      }
    } else {
      setSelectedDropdownItem(taskId)
    }
  }

  const handleClickOutsideDropdown = () => {
    setSelectedDropdownItem(0)
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">To-Do List</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Tasks</h2>
        <Link href="/tasks/addTask">
          <button className="btn btn-primary">Add New Task</button>
        </Link>
      </div>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-primary text-center">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <th scope="row" className='text-center'>{index + 1}</th>
              <td>
                <Link
                  href={{ pathname: '/tasks/taskDetail', query: { id: task.id } }}
                  className="text-decoration-none text-dark"
                >
                  {task.title}
                </Link>
              </td>
              <td className='text-center'>
                { task.completed ? 
                  <button className='btn btn-sm btn-success'>
                    Completed
                  </button> 
                  : 
                  <button className='btn btn-sm btn-danger'>
                    Incomplete
                  </button> 
                }
              </td>
              <td className="text-center">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary btn-sm dropdown-toggle"
                    type="button"
                    id={`dropdownMenuButton-${task.id}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => handleDropdownClick(task.id)}
                  >
                    Actions
                  </button>
                  <ul className={`dropdown-menu ${
                    selectedDropdownItem === task.id ? 'show' : 'none'
                  }`} >
                    <li>
                      <button
                        className={`dropdown-item ${
                          task.completed ? 'text-warning' : 'text-primary'
                        }`}
                        onClick={() => {
                          handleClickOutsideDropdown();
                          dispatch(toggleTaskStatus(task.id))
                        }}
                      >
                        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => dispatch(deleteTask(task.id))}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}