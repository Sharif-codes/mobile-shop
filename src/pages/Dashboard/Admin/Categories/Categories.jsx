import { FaPlus } from "react-icons/fa";
import useAllCategories from "../../../../Hooks/useAllCategories";
import { Link } from "react-router-dom";

const Categories = () => {
    const [allCategories, categoryLoading, refetch] = useAllCategories()
    return (
        <div className="mt-0 lg:mt-2 md:mt-0 flex flex-col h-screen md:h-full lg:h-full gap-4">
        <div className="h-16  flex justify-between items-center mx-4  p-4 bg-slate-100 rounded-t-lg text-sm md:text-lg  font-semibold ">
            <h2 className="text-sm md:text-2xl">Categories</h2>
            <Link to="/dashboard/categories/addCategories"><button className="flex justify-center items-center hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text hover:text-transparent "> <span>+</span> <span>Add Category</span></button></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-6 md:gap-12 lg:gap-6">
        {
                    allCategories?.map((category, idx) => (
                        <div key={idx} className="card image-full w-40 md:w-52 md:h-32 h-24 shadow-sm z-0">
                            <figure>
                                <img
                                    src={category.img} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title mx-auto my-auto text-sm md:text-lg lg:text-lg">{category.categoryName}</h2>
                            </div>
                        </div>
                    ))
                }
        </div>
    </div>
    );
};

export default Categories;