import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";


const MainLayout = () => {
    return (
        <div className="">
            <div className="bg-base-100">
              <Navbar></Navbar>  
            </div>
            
            <Outlet></Outlet> 
        </div>
    );
};

export default MainLayout;