import React, { useState } from 'react';

const BrandDropDown = ({setBrand,uniqueBrands}) => {
    const [isOpen, setIsOpen] = useState(false);
      const [selected, setSelected] = useState("Brand");
    
      const handleSelect = (brand) => {
        setSelected(brand);
        setBrand(brand);
        setIsOpen(false);
      };
    
      return (
        <div className="relative w-24 md:w-40 lg:w-44">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-1 border border-black rounded-md text-sm text-left bg-white"
          >
            {selected}
          </button>
          <div
            className={`absolute z-10 mt-1 w-full bg-white border border-black rounded-md shadow transition-all duration-300 ease-in-out transform origin-top ${
              isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          >
            {uniqueBrands.map((brand) => (
              <div
                key={brand}
                onClick={() => handleSelect(brand)}
                className="p-1 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      );
    
};

export default BrandDropDown;