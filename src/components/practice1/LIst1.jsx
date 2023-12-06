/* eslint-disable react/prop-types */
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export const LIst = ({ list, deleteList, handleEdit }) => {
  return (
    <div className="shopping-list flex justify-center gap-10 flex-col">
      {list.map((items) => {
        const { name, price, id } = items;
        return (
          <div className="flex justify-center gap-10" key={id}>
            <div className="item-container">
              <p className="title">${price}</p>
            </div>
            <div className="item-container">
              <p className="title">{name}</p>
            </div>

            <div className="flex gap-5">
              <button className="edit-btn" type="button">
                <FaEdit size={20} onClick={() => handleEdit(id)} />
              </button>
              <button className="delete-btn" type="button">
                <FaTrash size={20} onClick={() => deleteList(id)} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
