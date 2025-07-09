import { Link, NavLink, Outlet } from "react-router-dom";
import useUserData from "../Hooks/useUserData";
import { AiFillDollarCircle, AiFillProduct } from "react-icons/ai";
import { FaCartPlus, FaHome, FaProductHunt, FaRegListAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { useSelector } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { TbCategoryPlus } from "react-icons/tb";
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import logo from "../../public/digi_logo.png";
import useCart from "../Hooks/useCart";


const DashboardLayout = () => {
     const [cart, cartLoading, refetch] = useCart()
    const adminRoute = [
    {
        id: 1,
        route: "/dashboard/allUsers",
        title: "All users",
        icon: <FaUser className="text-xl" ></FaUser>
    },
    {
        id: 2,
        route: "/dashboard/allProducts",
        title: "All products",
        icon: <FaProductHunt className="text-xl"></FaProductHunt>
    },
    {
        id: 3,
        route: "/dashboard/Categories",
        title: "Categories",
        icon: <TbCategoryPlus className="text-xl"></TbCategoryPlus>
    },
]
const sellerRoute = [
    {
        id: 1,
        route: "/dashboard/sellerProducts",
        title: "My Products",
        icon: <AiFillProduct className="text-xl"></AiFillProduct>
    },
    {
        id: 2,
        route: "/dashboard/sellerSoldProducts",
        title: "Sells",
        icon: <AiFillDollarCircle className="text-xl"></AiFillDollarCircle>
    },
    
]
const buyerRoute = [
    {
        id: 1,
        route: "/dashboard/wishList",
        title: "My Wishlist",
        icon: <FaRegListAlt className="text-xl"></FaRegListAlt>
    },
    {
        id: 2,
        route: "/dashboard/cart",
        title: <p>My Cart ({cart?.length})</p> ,
        icon: <FaCartPlus className="text-xl"></FaCartPlus>
    },
    {
        id: 3,
        route: "/dashboard/buyer/purchasedProduct",
        title: "Purchased",
        icon: <FaProductHunt className="text-xl"></FaProductHunt>
    },
]

    const userData = useUserData()
    const { logout } = useAuth()
    const theme = useSelector((state) => state.theme.value)
    

    return (
        <div className="container mx-auto" data-theme={theme}>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <div className="flex items-center justify-between sticky top-0 overflow-hidden bg-slate-200 z-10">


                        <div className="flex items-center md:flex lg:hidden">
                        <div>
                                <label htmlFor="my-drawer-2" className="btn  drawer-button justify-center items-center bg-transparent pl-0 pr-1 border-0 ml-4 my-2">
                                    <MdMenu className="text-2xl text-blue-600"></MdMenu>
                                </label>
                            </div>
                            <p className=" font-semibold my-1">Menu</p>
                            
                        </div>


                        <div className="mr-4 font-medium flex lg:hidden md:flex gap-1 text-lg md:text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"><img src={logo} width={25} alt="" /> DigiStore
                        </div>
                    </div>

                    <Outlet></Outlet>
                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className={`menu menu-vertical bg-sky-400 text-gray-800  min-h-full w-80 p-4`}>
                        {/* Sidebar content here */}
                        <div className={`my-1 gap-1 hidden md:hidden font-semibold lg:flex text-lg md:text-2xl lg:text-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent`}> <img src={logo} width="30" alt="logo" /> <p> DigiStore</p>
                        </div>
                        <div className="flex items-center md:flex lg:hidden">
                            <div>
                                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button justify-center items-center bg-transparent pl-0 pr-1 border-0">
                                    <RxCross2 className="text-2xl"></RxCross2>
                                </label>
                            </div>
                            <p className="text-xl font-semibold my-1">Menu</p>
                        </div>
                        {userData.role === "seller" && sellerRoute.map(route => <li className="text-lg" key={route.id}> <NavLink to={route.route}><>{route.icon}</> <>{route.title}</></NavLink></li>)}
                        {userData.role === "buyer" && buyerRoute.map(route => <li className="text-lg" key={route.id}> <NavLink to={route.route}><>{route.icon}</> <>{route.title}</></NavLink></li>)}
                        {userData.role === "admin" && adminRoute.map(route => <li className="text-lg" key={route.id}> <NavLink to={route.route}><>{route.icon}</> <>{route.title}</></NavLink></li>)}
                        
                        <li className="text-lg"><Link to="/"><><FaHome className="text-xl"></FaHome></><>Home</></Link></li>
                        <li className="text-lg"><Link onClick={logout} to="/login" ><><FaSignOutAlt className="text-xl"></FaSignOutAlt></><>Logout</></Link></li>
                        <li className="text-lg"><Link to="/settings"><FiSettings className="text-xl"></FiSettings> Setting</Link></li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;