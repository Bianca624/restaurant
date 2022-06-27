import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DatabaseRef } from "../databaseRef";

const MenuDetails = () => {
  const { id } = useParams();
  const [specifiedMenu, setSpecifiedMenu] = useState("");

  useEffect(() => {
    const getSpecificMenu = () => {
      const specificMenu = doc(DatabaseRef, id);
      onSnapshot(specificMenu, (snapshot) => {
        setSpecifiedMenu({ ...snapshot.data(), id: snapshot.id });
      });
    };
    getSpecificMenu();
  }, [id]);

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex justify-end p-4 text-white bg-blue-400 ">
        <Link to="/">
          <button>View Menu List</button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-24 text-center bg-blue-400 rounded-md w-96">
          <div className="p-3 text-white">
            <div className="text-4xl">
              {specifiedMenu && specifiedMenu.name}
            </div>
            <div className="text-xl">
              {specifiedMenu && specifiedMenu.category}
            </div>
          </div>
          <div className="p-4 text-xl bg-white">
            <div className="flex justify-between p-1">
              <div>Size:</div>
              <div>{specifiedMenu && specifiedMenu.size}</div>
            </div>
            <div className="flex justify-between p-1">
              <div>Price:</div>
              <div>₱{specifiedMenu && specifiedMenu.price}</div>
            </div>
            <div className="flex justify-between p-1">
              <div>Stock:</div>
              <div>{specifiedMenu && specifiedMenu.stock}</div>
            </div>
            <div className="flex justify-between p-1">
              <div>Cost:</div>
              <div>₱{specifiedMenu && specifiedMenu.cost}</div>
            </div>
          </div>
          <div className="p-8"></div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
