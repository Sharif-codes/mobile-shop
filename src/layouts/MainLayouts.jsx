import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";
import { useSelector } from "react-redux";


const MainLayout = () => {
    const theme = useSelector((state) => state.theme.value)
    return (
        <div className="container mx-auto" data-theme={theme}>
            <div >
              <Navbar></Navbar>  
            </div>
            <Outlet></Outlet> 
        </div>
    );
};

export default MainLayout;