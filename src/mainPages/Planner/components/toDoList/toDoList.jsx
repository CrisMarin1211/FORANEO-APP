import React, { useEffect, useState } from 'react';
import './toDoList.css';
import ModalAddTask from '../modalAddTask/modalAddTask';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Pencil } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, updateTask, setTasks } from '../../../../redux/planner/toDoSlice';
import { saveTaskToFirestore, getTasksFromFirestore, deleteTaskFromFirestore } from '../../../../services/calendarFirebase';

const ToDoList = () => {
  const dispatch = useDispatch();
  const reduxTasks = useSelector(state => state.toDo.tasks);
  const [showModal, setShowModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handlerAddTask = (newTask) => {
    if (!newTask.trim()) return;

    const taskExist = reduxTasks.some((t) => t.text.toLowerCase() === newTask.toLowerCase());
    if (taskExist) return;

    const newTaskObj = {
      id: Date.now().toString(),
      text: newTask,
      status: 'Pending',
      date: null,
    };

    dispatch(addTask(newTaskObj));
    saveTaskToFirestore(newTaskObj);
  };

  const handlerDeleteTask = (taskId) => {
    dispatch(removeTask({ id: taskId }));
    deleteTaskFromFirestore(taskId);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasksFromFirestore();
      dispatch(setTasks(data));
    };

    fetchTasks();
  }, [dispatch]);

  const sortedTasks = [...reduxTasks].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <>
      <section className='todo-container'>
        <h2 className='todo-title'>TO-DO</h2>
        <section className='task-list'>
          {sortedTasks.map((task) => (
            <section className='task-item' key={task.id}>
              <section className='task-actions'>
                <span
                  className='delete-task'
                  onClick={() => handlerDeleteTask(task.id)}
                  title='Delete task'
                >
                  x
                </span>
              </section>

              <section className='task-content'>
                {editingTaskId === task.id ? (
                  <>
                    <input
                      type='text'
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const updatedTask = { ...task, text: editedText.trim() };
                          dispatch(updateTask(updatedTask));
                          saveTaskToFirestore(updatedTask);
                          setEditingTaskId(null);
                        }
                      }}
                      autoFocus
                    />
                    <button
                      className='save-btn'
                      onClick={() => {
                        const updatedTask = { ...task, text: editedText.trim() };
                        dispatch(updateTask(updatedTask));
                        saveTaskToFirestore(updatedTask);
                        setEditingTaskId(null);
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span className='task-text'>{task.text}</span>
                    <button
                      className='edit-btn'
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditedText(task.text);
                      }}
                      title='Edit task'
                    >
                      <Pencil size={16} />
                    </button>
                  </>
                )}
              </section>

              <select
                className={`task-status ${task.status.toLowerCase().replace(' ', '')}`}
                value={task.status}
                onChange={(e) => {
                  const updatedTask = { ...task, status: e.target.value };
                  dispatch(updateTask(updatedTask));
                  saveTaskToFirestore(updatedTask);
                }}
              >
                <option aria-label="Pending Task" className='optionv' value='Pending' label='Not Started'>Not Started</option>
                <option aria-label="Task In Progress" className='optionv' value='In Progress' label='In progress'>In Progress</option>
                <option aria-label="Completed Task" className='optionv' value='Completed' label='Completed'>Completed</option>
              </select>

              <DatePicker
                style={{ marginLeft: '1rem' }}
                value={task.date ? dayjs(task.date) : null}
                onChange={(date, dateString) => {
                  const updatedTask = { ...task, date: dateString };
                  dispatch(updateTask(updatedTask));
                  saveTaskToFirestore(updatedTask);
                }}
                placeholder='Set date'
              />
            </section>
          ))}
        </section>

        <button className='new-task-btn' onClick={() => setShowModal(true)}>
          + New Task
        </button>
      </section>

      {showModal && (
        <ModalAddTask onClose={() => setShowModal(false)} onAdd={handlerAddTask} />
      )}
    </>
  );
};

export default ToDoList;
