import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";


const MainLayout = () => {
    return (
        <div className="container mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet> 
        </div>
    );
};

export default MainLayout;