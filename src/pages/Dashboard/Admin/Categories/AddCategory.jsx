import toast from "react-hot-toast";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";



const AddCategory = () => {
    const navigate = useNavigate()
    const axiosPublic= useAxiosPublic()
   
    const handleAddCategory= async (e)=>{
        e.preventDefault();
        const form= e.target;
        const categoryName= form.name.value;
        const img= form.photo_url.value;
        const data= {categoryName,img}

        const token = localStorage.getItem('access-token')
        axiosPublic.post("/addCategory", data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            if (res.data.insertedId) {
                toast.success("category added")
                navigate("/dashboard/sellerProducts")
            }
            else {
                toast.error("failed to add category")
            }

        })

    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div>
                <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center mb-4 md:mb-8 text-2xl md:text-3xl font-bold " >Add New Category</h1> 
            <form onSubmit={handleAddCategory} className="max-w-md mx-auto">

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="name" id="floating_email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category Name</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="photo_url" id="floating_password" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Photo URL</label>
                </div>
                <div className="flex justify-between items-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    <Link to="/dashboard/Categories"><button className="text-md font-semibold hover:text-success hover:underline" >Back to Categories</button></Link>
                    
                </div>
                
            </form>
            </div>
           

            

        </div>
    );
};

export default AddCategory;