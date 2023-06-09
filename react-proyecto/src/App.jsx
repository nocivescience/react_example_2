import { useState, useEffect } from 'react'
import { TaskBanner } from './components/TaskBanner';
import { TaskRow } from './components/TaskRow';
import { TaskCreator } from './components/TaskCreator';
import { VisibilityControl } from './components/VisibilityControl';
function App() {
  const [userName, setUserName]= useState('Ricardo');
  const [taskItems, setTaskItems] = useState([
    { name: 'Task One', done: false }, 
    { name: 'Task Two', done: false },
    { name: 'Task Three', done: true },
    { name: 'Task Four', done: false },
  ]);
  const [showCompleted, setShowCompleted] = useState(true);
  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data != null) {
      setTaskItems(JSON.parse(data));
    } else {
      setUserName('Ricardo');
      setTaskItems([
        { name: 'Task One Example', done: false },
        { name: 'Task Two Example', done: false },
        { name: 'Task Three Example', done: true },
        { name: 'Task Four Example', done: false },
      ]);
      setShowCompleted(true);
    }
  },[])
  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }])
    }
  }
  const toggleTask = task =>
    setTaskItems(taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t)))
    const taskTableRows = (doneValue) => taskItems //doneValue: true, false, undefined
      .filter(task => task.done === doneValue) 
      .map(task => (
        <TaskRow key={task.name} task={task} toggleTask={toggleTask}/>
      ))
  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <div className="container-fluid">
        <TaskCreator callback={createNewTask} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{taskTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary-text-white text-center p-2">
          <VisibilityControl description="Completed Tasks" isChecked={showCompleted} callback={checked => setShowCompleted(checked)} />
        </div>
        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{taskTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default App
