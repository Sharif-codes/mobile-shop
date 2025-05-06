/* eslint-disable react/prop-types */
import { IoMdSearch } from "react-icons/io";


const Searchbar = ({handleSearch}) => {
    return (
        <form className="flex items-center gap-[2px] relative" onSubmit={handleSearch}>
            {/* <input type="text" 
            placeholder="Search products"
            name="search"
            className=" max-w-36 p-[10px] border-2 outline-none border-black rounded-l-md "
            /> */}
            <input
             type="text" 
             placeholder="Search products"
             name="search"
              className="input w-40 md:w-52 h-[33px] md:h-12 text-xs md:text-md "  />
            <button className="btn btn-sm md:btn-md rounded-l-none border-2 rounded-r-md absolute right-0  "><IoMdSearch size={20}> </IoMdSearch></button>
            
        </form>
    );
};

export default Searchbar;