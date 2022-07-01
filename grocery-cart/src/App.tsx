import {FormEvent, useEffect, useState} from "react";
import "./App.css";
import Alert from "./components/Alert";
import List from "./components/List";
import {Item} from "./interface/item.interface";

const getLocalStorage = (): Array<Item> => {
  try{
    const list = JSON.parse(localStorage.getItem("list") || "");
    return list === "" ? [] : list;
  }
  catch (e) {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState<Array<Item>>(getLocalStorage());
  const [isEditting, setIsEditting] = useState(false);
  const [editId, setEditId] = useState<number>(0);
  const [alert, setAlert] = useState({
    msg: "",
    type: "",
    show: false,
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter some value");
    } else if (name) {
      if (isEditting) {
        list.map((item) => {
          if (item.id === editId) {
            item.title = name;
          }
          return item;
        })
        setName("");
        setEditId(-1);
        setIsEditting(false);
        showAlert(true, "success", "Value changed successfully");


      } else {
        showAlert(true, "success", "Item have been added in your list");
        const newItem = {id: new Date().getTime() / 1000, title: name};
        setName("");
        setList([...list, newItem]);
      }
    } else {
      showAlert(true, "success", "Item have been added in your list");
      const newItem = {id: new Date().getTime() / 1000, title: name};
      setName("");
      setList([...list, newItem]);
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "Empty list");
    setList([]);
  };

  const removeList = (id: number) => {
    showAlert(true, "danger", "Item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id: number) => {
    const specificItem = list.find((item) => item.id === id);
    if(specificItem !== undefined) {
      setIsEditting(true);
      setEditId(id);
      setName(specificItem.title);
    }

  };

  return (
    <div className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
        <h3>Grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="e.g eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="grocery"
          />
          <button className="submit" type="submit">
            submit
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List items={list} removeItem={removeList} editItem={editItem} />
        <button className="clear-btn" onClick={clearList}>
          Clear Item
        </button>
      </div>
    </div>
  );
};

export default App;
