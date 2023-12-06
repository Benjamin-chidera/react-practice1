import { useEffect, useState } from "react";
import { Alert } from "./Alert1";
import { LIst } from "./LIst1";

export const ShoppingList1 = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const myList = () => {
    let list = localStorage.getItem("ourList");

    if (list) {
      return JSON.parse(localStorage.getItem("ourList"));
    } else {
      return [];
    }
  };

  const [list, setList] = useState(myList);

  const showAlert = (show = false, message, type) => {
    setAlert({ show, message, type });
  };

  useEffect(() => {
    localStorage.setItem("ourList", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) {
      showAlert(true, "Please fill in all fields", "danger");
    } else if (name && price && isEditing) {
      showAlert(true, "successfully edited ", "success");
      const editList = list.map((item) => {
        if (item.id === editId) {
          return { ...item, name: name, price: price };
        }
        return item;
      });
      setList(editList);
      setIsEditing(false);
    } else {
      showAlert(true, "list added", "success");
      const newList = {
        id: Math.random(),
        name,
        price,
      };

      setList([...list, newList]);

      setName("");
      setPrice("");
    }
  };

  const handleClearList = () => {
    showAlert(true, "list cleared", "success");
    setList([]);
  };

  const handleDelete = (id) => {
    const remove = list.filter((item) => item.id !== id);

    setList(remove);
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    const theItem = list.find((item) => item.id === id);

    setName(theItem.name);
    setPrice(theItem.price);

    setEditId(id);
  };

  return (
    <div>
      <div className="flex justify-center flex-col items-center h-full shadow-2xl w-fit p-5 mx-auto mt-10 pb-10">
        <p className=" text-center"> {alert.show && <Alert {...alert} />}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="w-[400px] bg-blue-50 p-2 border-2 outline-none my-3"
              placeholder="Add your items here "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              className="w-[400px] bg-blue-50 p-2 border-2 outline-none my-3"
              placeholder="Add your Price here "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <button className=" bg-blue-200 p-2">
            {isEditing ? "Edit here" : "Add to shopping list"}
          </button>
        </form>

        <div>
          <LIst list={list} deleteList={handleDelete} handleEdit={handleEdit} />
        </div>

      {list.length > 0 &&  <button onClick={handleClearList} className=" bg-red-300 mt-3 p-2">
          Clear List
        </button>}
      </div>
    </div>
  );
};
