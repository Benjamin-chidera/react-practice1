/* eslint-disable react/prop-types */
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export const List = ({ list, deleteList, editItem }) => {
  return (
    <div className="shopping-list">
      {list.map((items) => {
        const { name, price, id } = items;
        return (
          <article className="shopping-item" key={id}>
            <div className="item-container">
              <p className="title">${price}</p>
            </div>
            <div className="item-container">
              <p className="title">{name}</p>
            </div>

            <div className="btn-container">
              <button className="edit-btn" type="button">
                <FaEdit size={20} onClick={() => editItem(id)} />
              </button>
              <button className="delete-btn" type="button">
                <FaTrash size={20} onClick={() => deleteList(id)} />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};
