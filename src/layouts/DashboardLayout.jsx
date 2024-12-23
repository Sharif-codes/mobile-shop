import { Link, NavLink, Outlet } from "react-router-dom";
import useUserData from "../Hooks/useUserData";
import { AiFillProduct } from "react-icons/ai";
import { FaCartPlus, FaHome, FaRegListAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { FaMessage } from "react-icons/fa6";
const adminRoute= [
    {
        id:1,
        route: "/dashboard/allUsers",
        title: "All users",
        icon: <FaUser></FaUser>
    }
]
const sellerRoute= [
    {
        id:1,
        route: "/dashboard/sellerProducts",
        title: "My Products",
        icon: <AiFillProduct></AiFillProduct>
    },
    {
        id:2,
        route: "/dashboard/addProducts",
        title: "Add Products",
        icon: <FaCartPlus></FaCartPlus>
    },
]
const buyerRoute= [
    {
        id:1,
        route: "/dashboard/wishList",
        title: "My Wishlist",
        icon: <FaRegListAlt></FaRegListAlt>
    },
    {
        id:1,
        route: "/dashboard/cart",
        title: "My Cart",
        icon: <FaCartPlus></FaCartPlus>
    },
]
const DashboardLayout = () => {
    const userData= useUserData()
    const {logout}= useAuth()


    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col my-6">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden justify-center items-center">
                        Open Menu
                    </label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <p className="text-2xl text-red-400 border-2 rounded-xl p-2">Mobile Shop</p>
                        <li><Link to="/"><><FaHome></FaHome></><>Home</></Link></li>
                        
                        {userData.role === "seller" && sellerRoute.map(route=> <li key={route.id}> <NavLink to={route.route}><>{route.icon}</> <>{route.title}</></NavLink></li>)}
                        {userData.role === "buyer" && buyerRoute.map(route=> <li key={route.id}> <NavLink to={route.route}><>{route.icon}</> <>{route.title}</></NavLink></li>)}
                        {userData.role === "admin" && adminRoute.map(route=> <li key={route.id}> <NavLink to={route.route}><>{route.icon}</> <>{route.title}</></NavLink></li>)}
                        <li><Link to="/dashboard/contact"><><FaMessage></FaMessage></><>Contact us</></Link></li>
                        <li><Link to="/login" onClick={logout}><><FaSignOutAlt></FaSignOutAlt></><>Logout</></Link></li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;