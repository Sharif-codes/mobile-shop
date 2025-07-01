import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "../../Hooks/useCart";
import useUserData from "../../Hooks/useUserData";
import { MdLogin, MdLogout } from "react-icons/md";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const userData= useUserData();
  const [cart, cartLoading,refetch]= useCart();
  const HandleLogout = ()=>{
    logOut()
    toast.success(`${user.displayName} Logged out Successfully!`)
    
  }
  
  console.log(user);
  return (
    <div className="navbar container border-b">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            {userData?.role==="buyer"?<li><Link className="flex gap-1" to="/dashboard/cart"><div><FiShoppingCart></FiShoppingCart></div><div>{cart?.length}</div></Link></li>:""}
          </ul>
        </div>
        <Link to="/" className="text-lg md:text-2xl  font-semibold"><span className="text-primary">Mobile </span><span className="text-accent">Shop</span></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          {userData?.role==="buyer"?<li><Link className="flex gap-1" to="/dashboard/cart"><div><FiShoppingCart></FiShoppingCart></div><div>{cart?.length}</div></Link></li>:""}
        </ul>
      </div>
      <div className="navbar-end gap-2 md:gap-4">
        {
          user ? <Link to="/dashboard" className="font-semibold hover:text-primary">Dashboard</Link> : <p></p>
        }
        {
          user ? <button onClick={HandleLogout} className="flex items-center text-md font-semibold hover:text-red-600 " > <MdLogout></MdLogout> Logout</button> :    <Link className="flex items-center text-md  font-semibold text-green-600" to="/login" > <p><MdLogin /></p>  <p>Login</p> </Link>
        }
      </div>
    </div>
  );
};

export default Navbar;