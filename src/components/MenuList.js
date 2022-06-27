import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DatabaseRef } from "../databaseRef";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { orderBy } from "lodash";

const MenuList = () => {
  const [restaurant, setRestaurant] = useState([]); //create a useState from hooks which sets a empty
  const navigate = useNavigate();

  useEffect(() => {
    const getMenus = async () => {
      const data = await getDocs(DatabaseRef);
      const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const sortData = orderBy(getData, "name");
      setRestaurant(sortData);
    };
    getMenus();
  }, []);

  const handleView = (id) => {
    navigate(`/menu-details/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const menuDoc = doc(DatabaseRef, id);
    await deleteDoc(menuDoc);

    //handling reload for updating new list
    window.location.reload();
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex justify-end p-4 text-white bg-blue-400">
        <Link to="/add">
          <div>
            <button>Add Menu</button>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 p-3 lg:grid-cols-3">
        {restaurant ? (
          restaurant.map((r, index) => {
            return (
              <div
                key={index}
                className="p-3 bg-white border rounded-md shadow-xl border-1"
              >
                <div className="text-4xl text-center">{r.name}</div>
                <div className="text-center text-l">{r.size}</div>
                <div>
                  <div className="flex justify-center text-sm text-white text-bold">
                    <button
                      onClick={() => handleView(r.id)}
                      className="w-20 px-2 py-1 mx-2 mt-2 bg-blue-400 rounded-md"
                    >
                      View
                    </button>

                    <div>
                      <button
                        onClick={() => handleEdit(r.id)}
                        className="w-20 px-2 py-1 mx-2 mt-2 bg-green-500 rounded-md "
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="w-20 px-2 py-1 mx-2 mt-2 bg-red-500 rounded-md "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Data Available</div>
        )}
      </div>
    </div>
  );
};

export default MenuList;
