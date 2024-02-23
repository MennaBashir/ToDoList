import './App.css';
import Swal from 'sweetalert2'
import edit from "./images/edit1.svg";
import check from "./images/checked.png";
import uncheck from "./images/unchecked.png";
import trash from "./images/trash.svg";
import iconList from "./images/icon.png";
import { useState, useEffect, useRef } from 'react';
function App() {
  const items = JSON.parse(localStorage.getItem('data'));
  const [task, setTask] = useState(items || []);//because data store in local Storage

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(task));
  }, [task]);


  const inputRef = useRef();
  const [ID, setID] = useState(1);
  const [btn, setBtn] = useState(true);
  const [Gid, setGid] = useState(1);
  const HandleClick = (e) => {
    const text = inputRef.current.value;
    if (text !== "") {
      setID(ID + 1);
      const NewTask = { text, complet: false, id: ID };
      setTask([...task, NewTask]);
      inputRef.current.value = "";
    }
    else {
      e.preventDefault();
    }

  }
  const CompletedTask = (index) => {
    const KeepTask = [...task];
    KeepTask[index].complet = !KeepTask[index].complet;
    setTask(KeepTask);

  }
  const DeletTask = (index) => {
    const KeepTask = [...task];
    Swal.fire({
      title: "Are you sure to delete?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        KeepTask.splice(index, 1);
        setTask(KeepTask);
      }
    });

  }
  const EditTask = (index) => {
    const KeepTask = [...task];
    inputRef.current.focus();
    inputRef.current.value = KeepTask[index].text;
    setBtn(false);
    setGid(index + 1);
  }
  const UpdateClick = (id) => {
    let newItem = task.find((ele) => {
      if (ele.id === id)
        return ele;
    });
    newItem.text = inputRef.current.value;
    setBtn(true);
    inputRef.current.value="";
  }
  return (
    <div className="container">
      <div className="txt">
        <h2>To-Do List
      <img src={iconList} alt="not found" /></h2>
        <textarea placeholder="Add your task" ref={inputRef}></textarea>
        {btn ? <button onClick={(e) => HandleClick(e)}>ADD</button> : <button onClick={() => UpdateClick(Gid)}>Done</button>}
      </div>
      <ul id="listTask">
        {
          task.map((el, index) => {
            return (
              <>
                <li key={el.id}>
                  <div className="task">
                    <img src={!el.complet ? uncheck : check} alt="not found" onClick={() => CompletedTask(index)} className={el.complet ? "complete" : ""} />
                    <p> {el.text}</p>
                    <div className="image">
                      <img src={edit} alt="not found" onClick={() => EditTask(index)} />
                      <img src={trash} alt="not found" onClick={() => DeletTask(index)} />
                    </div>
                  </div>
                </li>
              </>
            )
          })
        }
      </ul>

    </div>

  );
}

export default App;
