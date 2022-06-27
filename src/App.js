import AddMenu from "./components/AddMenu";
import MenuList from "./components/MenuList";
import { Routes, Route } from "react-router-dom";
import EditMenu from "./components/EditMenu";
import MenuDetails from "./components/MenuDetails";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AddMenu />} path="/add" />
        <Route element={<EditMenu />} path="/edit/:id" />
        <Route element={<MenuDetails />} path="/menu-details/:id" />
        <Route element={<MenuList />} path="/" />
      </Routes>
    </>
  );
}

export default App;
