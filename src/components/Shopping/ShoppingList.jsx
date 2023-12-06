import React, { useEffect, useState } from "react";
import "../Shopping/Shopping.css";
import { Alert } from "./Alert";
import { List } from "./List";

export const ShoppingList = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const storage = () => {
    let list = localStorage.getItem('list');
    
    if (list) {
      return JSON.parse(localStorage.getItem('list'))
    }else{
      return []
    }
  }

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [list, setList] = useState(storage);

  // setting list to localStorage
   useEffect(() => {
     localStorage.setItem("list", JSON.stringify(list));
    }, [list]);
    
  const showAlert = (show = false, msg, type) => {
    setAlert({ show, msg, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) {
      // when a user submit no value
      showAlert(true, "please fill all inputs field", "danger");
    } else if (name && price && isEditing) {
      // deal with edit

      const editedList = list.map((item) => {
        if (item.id === editId) {
          return {...item, name: name, price: price}
        }
        return item
      })
      setList(editedList);
      setIsEditing(false)
    } else {
      // add to list
      showAlert(true, "Item successfully added to list", "success");
      const newItem = {
        id: new Date().getTime().toString(),
        name,
        price,
      };
      setList([...list, newItem]);
    }

    setName("");
    setPrice("");
  };

  // this is the delete all item method
  const clearList = () => {
    setList([]);
    showAlert(true, "List cleared", "success");
  };

  // this is the delete an item method
  const deleteList = (id) => {
    showAlert(true, "List removed", "success");

    const filter = list.filter((item) => item.id !== id);
    setList(filter);
  };

  // this is the edit method
  const editItem = (id) => {
    setIsEditing(true);
    const theItem = list.find((item) => item.id === id);

    setName(theItem.name);
    setPrice(theItem.price);

    setEditId(id);
  };

  return (
    <section className="section-center">
      <form className="shopping-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>Shopping List</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder=" Add your items"
            className="item-input"
            name=""
            id=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            name=""
            className="item-input"
            placeholder="Select your Price"
            id=""
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Add to shopping list"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="shopping-container">
          <List list={list} deleteList={deleteList} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear List
          </button>
        </div>
      )}
    </section>
  );
};
