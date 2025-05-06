import { useState } from "react";

export default function CategoryDropdown({ uniqueCategory, setCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Category");

  const handleSelect = (category) => {
    setSelected(category);
    setCategory(category);
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
        {uniqueCategory.map((category) => (
          <div
            key={category}
            onClick={() => handleSelect(category)}
            className="p-1 hover:bg-gray-100 cursor-pointer text-sm"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
