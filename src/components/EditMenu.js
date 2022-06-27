import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatabaseRef } from "../databaseRef";
import { Link } from "react-router-dom";

const EditMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editSize, setEditSize] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [specifiedMenu, setSpecifiedMenu] = useState("");

  useEffect(() => {
    //function basically called whenever the page render
    const getSpecificMenu = () => {
      const specificMenu = doc(DatabaseRef, id);
      onSnapshot(specificMenu, (snapshot) => {
        setSpecifiedMenu({ ...snapshot.data(), id: snapshot.id });
      });
    };
    getSpecificMenu();
  }, [id]);

  useEffect(() => {
    if (specifiedMenu) {
      setEditCategory(specifiedMenu.category);
      setEditName(specifiedMenu.name);
      setEditSize(specifiedMenu.size);
      setEditPrice(specifiedMenu.price);
      setEditStock(specifiedMenu.stock);
    }
  }, [specifiedMenu]);

  const handleUpdate = async () => {
    const menuDoc = doc(DatabaseRef, id);
    await updateDoc(menuDoc, {
      category: editCategory,
      name: editName,
      size: editSize,
      price: editPrice,
      stock: editStock,
      cost: editPrice * editStock,
    });
    navigate("/");
  };
  return (
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
            <div className="text-4xl">Edit Menu</div>
          </div>
          <div className="p-4 text-xl bg-white">
            <div className="flex flex-row mt-2">
              <div>Category: </div>
              <div className="border-2 border-gray-200 rounded-md ">
                <select
                  className="w-56 p-1 text-black"
                  value={editCategory || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEditCategory(value);
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
                  defaultValue={(specifiedMenu && specifiedMenu.name) || ""}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row mt-2">
              <div className="flex flex-row">
                <div>Size: </div>
                <div className="text-black border-2 border-gray-200 rounded-md ml-11">
                  <input
                    className="p-1"
                    defaultValue={(specifiedMenu && specifiedMenu.size) || ""}
                    onChange={(e) => setEditSize(e.target.value)}
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
                    defaultValue={(specifiedMenu && specifiedMenu.price) || ""}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-2">
              <div className="flex flex-row">
                <div>Stock: </div>
                <div className="ml-8 text-black border-2 border-gray-200 rounded-md">
                  <input
                    className="p-1"
                    defaultValue={(specifiedMenu && specifiedMenu.stock) || ""}
                    onChange={(e) => setEditStock(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-3 text-white">
            <div>
              <button onClick={() => handleUpdate()}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
