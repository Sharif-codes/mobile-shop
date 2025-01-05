import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const Navbar = () => {
  const { user, logOut } = useAuth()
  return (
    <div className="navbar container mx-auto">
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
          </ul>
        </div>
        <Link to="/" className=" text-2xl font-semibold"><span className="">Mobile </span><span className="text-blue-500">Shop</span></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="navbar-end gap-4">
        {
          user? <Link to="/dashboard" className="btn btn-accent ">Dashboard</Link> : <p></p>
        }
        {
          user? <button onClick={logOut} className="btn btn-secondary">Logout</button> : <Link to="/login" className="btn btn-primary">Login</Link>
        }
        
      </div>
    </div>
  );
};

export default Navbar;