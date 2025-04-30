import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";
import { useSelector } from "react-redux";
import Footer from "../shared/footer/Footer";


const MainLayout = () => {
    const theme = useSelector((state) => state.theme.value)
    return (
        <div className="container mx-auto" data-theme={theme}>
            <div className="mx-4 mb-2" >
              <Navbar></Navbar>  
            </div>
            <div className="mx-4">
                <Outlet></Outlet> 
            </div>
            <div>
                <Footer></Footer>
            </div>
            
        </div>
    );
};

export default MainLayout;