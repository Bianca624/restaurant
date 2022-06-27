import React, { useState, useEffect, Fragment } from "react";
import { addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { DatabaseRef } from "../databaseRef";

const AddMenu = () => {
  const [category, setCategory] = useState("Breakfast");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    await addDoc(DatabaseRef, {
      name: name,
      category: category,
      size: size,
      price: price,
      stock: stock,
      cost: price * stock,
    });
    navigate("/");
  };

  return (
    <Fragment>
      <div className="h-screen bg-gray-100">
        <div className="flex justify-end p-4 text-white bg-blue-400">
          <Link to="/">
            <div>
              <button>View Menu List</button>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-24 text-center bg-blue-400 rounded-md w-96">
            <div className="p-3 text-white ">
              <div className="text-4xl">Add New Menu</div>
            </div>
            <div className="p-4 text-xl bg-white">
              <div className="flex flex-row mt-2">
                <div>Category: </div>
                <div className="border-2 border-gray-200 rounded-md ">
                  <select
                    className="w-56 p-1 text-black"
                    value={category}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCategory(value);
                    }}
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row mt-2">
                <div>Name: </div>
                <div className="text-black border-2 border-gray-200 rounded-md ml-7">
                  <input
                    className="p-1"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row mt-2">
                <div className="flex flex-row">
                  <div>Size: </div>
                  <div className="text-black border-2 border-gray-200 rounded-md ml-11">
                    <input
                      className="p-1"
                      type="text"
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-2">
                <div className="flex flex-row">
                  <div>Price: </div>
                  <div className="text-black border-2 border-gray-200 rounded-md ml-9">
                    <input
                      className="p-1"
                      type="text"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-2">
                <div className="flex flex-row">
                  <div>Stock: </div>
                  <div className="ml-8 text-black border-2 border-gray-200 rounded-md">
                    <input
                      type="text"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center p-3 text-white">
              <div>
                <button onClick={() => handleAdd()}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddMenu;
