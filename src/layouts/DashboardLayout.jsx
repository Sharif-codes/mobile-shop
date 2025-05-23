import { Link, NavLink, Outlet } from "react-router-dom";
import useUserData from "../Hooks/useUserData";
import { AiFillProduct } from "react-icons/ai";
import { FaCartPlus, FaHome, FaProductHunt, FaRegListAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { FaMessage } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { TbCategoryPlus } from "react-icons/tb";
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const adminRoute = [
    {
        id: 1,
        route: "/dashboard/allUsers",
        title: "All users",
        icon: <FaUser></FaUser>
    },
    {
        id: 2,
        route: "/dashboard/allProducts",
        title: "All products",
        icon: <FaProductHunt></FaProductHunt>
    }
]
const sellerRoute = [
    {
        id: 1,
        route: "/dashboard/sellerProducts",
        title: "My Products",
        icon: <AiFillProduct></AiFillProduct>
    },
    {
        id: 2,
        route: "/dashboard/Categories",
        title: "Categories",
        icon: <TbCategoryPlus></TbCategoryPlus>
    },
]
const buyerRoute = [
    {
        id: 1,
        route: "/dashboard/wishList",
        title: "My Wishlist",
        icon: <FaRegListAlt></FaRegListAlt>
    },
    {
        id: 2,
        route: "/dashboard/cart",
        title: "My Cart",
        icon: <FaCartPlus></FaCartPlus>
    },
]

const DashboardLayout = () => {
    const userData = useUserData()
    const { logout } = useAuth()
    const theme = useSelector((state) => state.theme.value)

    return (
        <div className="container mx-auto" data-theme={theme}>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <div className="flex items-center justify-between">


                        <div className="flex items-center md:flex lg:hidden">
                        <div>
                                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button justify-center items-center bg-transparent pl-0 pr-1 border-0 ml-4 my-2">
                                    <MdMenu className="text-2xl"></MdMenu>
                                </label>
                            </div>
                            <p className=" font-semibold my-1">Menu</p>
                            
                        </div>


                        <div className="mr-4 font-medium flex lg:hidden md:flex gap-1"><span className="text-lg md:text-2xl text-primary">Mobile</span> <span className="text-lg md:text-2xl text-accent">Store</span>
                        </div>
                    </div>




                    <Outlet></Outlet>
                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className={`menu menu-vertical bg-sky-300  min-h-full w-80 p-4`}>
                        {/* Sidebar content here */}
                        <div className={`my-1 gap-1 hidden md:hidden lg:flex`}><span className={`md:text-3xl text-2xl md:font-semibold font-semibold ${theme == 'black' && 'luxury' && 'lofi' ? 'text-sky-500' : 'text-primary'} `}>Mobile</span> <span className={`md:text-3xl text-2xl md:font-semibold font-semibold ${theme == 'black' && 'luxury' && 'lofi' ? 'text-sky-500' : 'text-accent'}  `}>Shop</span>
                        </div>
                        <div className="flex items-center md:flex lg:hidden">
                            <div>
                                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button justify-center items-center bg-transparent pl-0 pr-1 border-0">
                                    <RxCross2 className="text-2xl"></RxCross2>
                                </label>
                            </div>
                            <p className="text-lg font-semibold my-1">Menu</p>
                        </div>
                        {userData.role === "seller" && sellerRoute.map(route => <li key={route.id}> <NavLink to={route.route}><>{route.icon}</> <>{route.title}</></NavLink></li>)}
                        {userData.role === "buyer" && buyerRoute.map(route => <li key={route.id}> <NavLink to={route.route}><>{route.icon}</> <>{route.title}</></NavLink></li>)}
                        {userData.role === "admin" && adminRoute.map(route => <li key={route.id}> <NavLink to={route.route}><>{route.icon}</> <>{route.title}</></NavLink></li>)}
                        <li><Link to="/dashboard/contact"><><FaMessage></FaMessage></><>Contact us</></Link></li>
                        <li><Link to="/"><><FaHome></FaHome></><>Home</></Link></li>
                        <li><Link onClick={logout} to="/login" ><><FaSignOutAlt></FaSignOutAlt></><>Logout</></Link></li>
                        <li><Link to="/settings"><FiSettings></FiSettings> Setting</Link></li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;