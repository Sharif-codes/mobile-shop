/* eslint-disable react/prop-types */

import { GrPowerReset } from "react-icons/gr";
import CategoryDropdown from "./CategoryDropDown";
import BrandDropDown from "./BrandDropDown";
import useUserData from "../Hooks/useUserData";
import { useLocation } from "react-router-dom";

const SellerFilterProducts = ({ setBrand, setCategory,setSeller, uniqueBrands, handleReset, uniqueCategory,uniqueSeller }) => {
const user = useUserData()
const location = useLocation()

    return (
        <div className="flex items-center gap-4">
            <div className="w-md">
                <select className="p-1 md:p-[11px] w-20 md:w-24 border border-black rounded-md text-xs" onChange={(e) => setCategory(e.target.value)} >
                        <option  value="" hidden>Category</option>
                        {uniqueCategory.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
            </div>

            <div className="w-md">
                <select className=" p-1 md:p-[11px] w-20 md:w-24 border border-black rounded-md text-xs" onChange={(e) => setBrand(e.target.value)} >
                        <option value="" hidden>Brand</option>
                        {uniqueBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                {/* <BrandDropDown setBrand={setBrand} uniqueBrands={uniqueBrands}></BrandDropDown> */}
            </div>
            {user.role === "admin" && location.pathname === "/dashboard/allProducts" && (<div className="w-md">
                <select className=" p-1 md:p-[11px] w-20 md:w-24 border border-black rounded-md text-xs" onChange={(e) => setSeller(e.target.value)} >
                        <option value="" hidden>Seller</option>
                        {uniqueSeller?.slice(1).map((seller) => <option key={seller} value={seller}>{seller}</option>)}
                    </select>
                {/* <BrandDropDown setBrand={setBrand} uniqueBrands={uniqueBrands}></BrandDropDown> */}
            </div>) }
            

            <button type="button" onClick={handleReset} className="flex items-center">
                <GrPowerReset className="text-xl"  /> <p></p>
            </button>
        </div>
    );
};

export default SellerFilterProducts;