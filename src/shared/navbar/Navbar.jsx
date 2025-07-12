import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "../../Hooks/useCart";
import useUserData from "../../Hooks/useUserData";
import { MdLogin, MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import logo from "/digi_logo.png"
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [userData, userLoading, refetchUser] = useUserData();
  const [cart, cartLoading, refetch] = useCart()
  const HandleLogout = () => {
    logOut()
    toast.success(`${user.displayName} Logged out Successfully!`)

  }

  console.log("userinfo", userData);
  return (
    <div className="navbar container border-b">

      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
            


          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/">Home</Link></li>
            <li>
              {
                user ? <Link to="/dashboard" className=" ">Dashboard</Link> : <p></p>
              }
            </li>

            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            {userData?.role === "buyer" ? <li><Link className="flex gap-1" to="/dashboard/cart"><div><FiShoppingCart></FiShoppingCart></div><div>{cart?.length}</div></Link></li> : ""}
            <li>
              {
                user ? <button onClick={HandleLogout} className="flex items-center text-md gap-x-0.5 " > <MdLogout></MdLogout> Logout</button> : <Link className="flex items-center text-md  " to="/login" > <p><MdLogin /></p>  <p>Login</p> </Link>
              }
            </li>
          </ul>
        </div>
        <Link to="/" className="hidden md:flex items-center justify-center gap-1 ">
        <img src={logo} width={25} alt="" /> 
        <p className="text-lg md:text-2xl  font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">DigiStore</p></Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>


          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          {userData?.role === "buyer" ? <li><Link className="flex gap-1" to="/dashboard/cart"><div><FiShoppingCart></FiShoppingCart></div><div>{cart?.length}</div></Link></li> : ""}
        </ul>
      </div>

      <div className="navbar-end ">
        <div className="hidden md:flex gap-2 items-center justify-center md:gap-4">
          {
            user && <div>

              <div className="avatar avatar-online">
                <div className="w-8 rounded-full " data-tooltip-id="my-tooltip" data-tooltip-content={userData?.name}>
                  <img src={userData?.imageUrl} />
                </div>
              </div>
            </div>
          }
          {
            user ? <Link to="/dashboard" className="font-semibold hover:text-primary">Dashboard</Link> : <p></p>
          }
          {
            user ? <button onClick={HandleLogout} className="flex items-center text-md font-semibold hover:text-red-600 " > <MdLogout></MdLogout> Logout</button> : <Link className="flex items-center text-md  font-semibold text-green-600" to="/login" > <p><MdLogin /></p>  <p>Login</p> </Link>
          }
        </div>
        <div className="flex md:hidden items-center justify-center gap-2 ">
          {
            user && <div>

              <div className="avatar avatar-online">
                <div className="w-8 rounded-full " data-tooltip-id="my-tooltip" data-tooltip-content={userData?.name}>
                  <img src={userData?.imageUrl} />
                </div>
              </div>
            </div>
          }
          <Link to="/" className="flex items-center justify-center gap-1 ">
          <img src={logo} width={25} alt="" /> 
          <p className="text-lg md:text-2xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">DigiStore</p></Link>
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default Navbar;