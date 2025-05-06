import { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

/* eslint-disable react/prop-types */
const SortByPrice = ({ setSort }) => {
    const [sortValue,setSortValue]= useState(0)
    if (sortValue) {
        setSort('asc')
    }
    else{
        setSort('desc')
    }
    return (
        // <select className="p-[11px] w-36 border border-black rounded-md " onChange={(e)=> setSort(e.target.value)}>

        //     <option value='asc'>Low to high</option>
        //     <option value='desc'>High to low</option>

        // </select>
        <button className="flex items-center" onClick={sortValue?()=> setSortValue(0):()=>setSortValue(1)}>
           <FaArrowDownLong  className={`${sortValue==0?"text-green-600":"text-stone-400"}`}/>
           <FaArrowUpLong className={`${sortValue==1?"text-green-600":"text-stone-400"}`}/>
        </button>

    );
};

export default SortByPrice;