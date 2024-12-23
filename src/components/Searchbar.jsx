/* eslint-disable react/prop-types */
import { IoMdSearch } from "react-icons/io";


const Searchbar = ({handleSearch}) => {
    return (
        <form className="flex items-center gap-[2px]" onSubmit={handleSearch}>
            <input type="text" 
            placeholder="Search products"
            name="search"
            className="max-w-md p-[10px] border-2 border-black rounded-l-md "
            />
            <button className="btn rounded-l-none border-2 rounded-r-md bg-gray-300 btn-outline "><IoMdSearch size={20}> </IoMdSearch></button>
            
        </form>
    );
};

export default Searchbar;