import { FaPlus } from "react-icons/fa";
import useAllCategories from "../../../../Hooks/useAllCategories";
import { Link } from "react-router-dom";

const Categories = () => {
    const [allCategories, categoryLoading, refetch] = useAllCategories()
    return (
        <div className="mx-4 h-full flex flex-col">
            <div className="h-1/6  flex justify-end items-center">
               <Link to="/dashboard/addCategories"><button  className="flex justify-center items-center gap-1 text-lg"> <FaPlus></FaPlus> <span>Add Category</span></button></Link> 
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
                {
                    allCategories?.map((category, idx) => (
                        <div key={idx} className="card image-full w-52 h-32 shadow-sm">
                            <figure>
                                <img
                                    src={category.img} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title mx-auto">{category.categoryName}</h2>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Categories;