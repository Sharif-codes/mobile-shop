/* eslint-disable react/prop-types */
import { GrPowerReset } from "react-icons/gr";
import { TbFilter } from "react-icons/tb";

const FilterBar = ({setBrand,setCategory,handleReset,uniqueBrands,uniqueCategory}) => {
    return (
        <div className="bg-gray-200 h-full min-h-screen p-4 rounded-t-md ">
            <div className="flex items-center gap-3">
                
                <h2 className="text-xl font-semibold flex justify-center items-center"><span><TbFilter size={20}></TbFilter></span><span>Filters</span></h2>
            </div>
            <div className="mt-8 flex flex-col gap-2 items-center">
                <div className="w-md">
                    <select className="p-[11px] w-36 lg:w-48 md:w-40 border border-black rounded-md" onChange={(e)=> setBrand(e.target.value)} >
                        <option value="">Brand</option>
                        {uniqueBrands.map((brand)=> <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                </div>
                <div className="w-md">
                    <select className="p-[11px] w-36 lg:w-48 md:w-40 border border-black rounded-md" onChange={(e)=> setCategory(e.target.value)} >
                        <option value="">Category</option>
                        {uniqueCategory.map((category)=> <option key={category} value={category}>{category}</option>)}
                    </select>
                </div>


            </div>
            <button className="btn btn-primary w-full mt-4 flex items-center" onClick={handleReset}>Reset<GrPowerReset></GrPowerReset></button>
        </div>
    );
};

export default FilterBar;