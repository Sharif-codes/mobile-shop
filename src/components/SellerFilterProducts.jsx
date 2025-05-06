/* eslint-disable react/prop-types */

import { GrPowerReset } from "react-icons/gr";
import CategoryDropdown from "./CategoryDropDown";
import BrandDropDown from "./BrandDropDown";

const SellerFilterProducts = ({ setBrand, setCategory, uniqueBrands, handleReset, uniqueCategory }) => {


    return (
        <div className="flex items-center gap-4">
            <div className="w-md">
                <select className="p-1 md:p-[11px] w-20 md:w-24 border border-black rounded-md text-xs" onChange={(e) => setCategory(e.target.value)} >
                        <option  value="" hidden>Category</option>
                        {uniqueCategory.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                {/* <CategoryDropdown setCategory={setCategory} uniqueCategory={uniqueCategory} ></CategoryDropdown> */}
            </div>

            <div className="w-md">
                <select className=" p-1 md:p-[11px] w-20 md:w-24 border border-black rounded-md text-xs" onChange={(e) => setBrand(e.target.value)} >
                        <option value="" hidden>Brand</option>
                        {uniqueBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                {/* <BrandDropDown setBrand={setBrand} uniqueBrands={uniqueBrands}></BrandDropDown> */}
            </div>

            <button type="button" onClick={handleReset} className="flex items-center">
                <GrPowerReset className="text-xl" />
            </button>
        </div>
    );
};

export default SellerFilterProducts;