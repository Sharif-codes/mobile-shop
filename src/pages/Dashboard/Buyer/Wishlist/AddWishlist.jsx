import toast from "react-hot-toast";
import photoUpload from "../../../../Api/photoUpload";
import useAllCategories from "../../../../Hooks/useAllCategories";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const AddWishlist = () => {
   const [imgUrl, setImgUrl] = useState("")
    const [loadingImageUpload, setLoadingImageUpload] = useState(false);
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [allCategories, categoryLoading, refetch] = useAllCategories();
    console.log("all cxate:", allCategories);

    const handleFileUpload = async (event) => {
        setLoadingImageUpload(true)
        const file = event.target.files[0];
        if (!file) return;
        const data = new FormData()
        data.append("file", file)
        const UploadedImgUrl = await photoUpload(data)
        console.log("photo url:", UploadedImgUrl);
        setImgUrl(UploadedImgUrl);
        setLoadingImageUpload(false)
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value
        const photo_url = imgUrl
       
        const category = form.category.value

        const buyerEmail = user?.email;
        const buyer = user?.displayName

        const brand = form.brand.value.toLowerCase();
        const data = { name, photo_url,brand, category,buyer, buyerEmail };
        console.log("data:", data);
        const token = localStorage.getItem('access-token')
        axiosPublic.post("/addToWishlist", data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            if (res.data.insertedId) {
                toast.success("product added to wishlist")
                navigate("/dashboard/wishList")
            }
            else {
                toast.error("failed to add product")
            }

        })

    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="">
                <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center mb-4 md:mb-8 text-2xl md:text-3xl font-bold " >Add to wishlist</h1>
                <form onSubmit={handleAddProduct} className="max-w-md mx-auto">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="name" id="floating_email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                    </div>

                    <div>
                        <label htmlFor='image' className='block mb-2 text-sm text-gray-500'>
                            Select Image:
                        </label>
                        {
                            loadingImageUpload ? "Uploading image..." : ""
                        }
                        <input
                            className="file-input file-input-bordered file-input-info w-full max-w-x"
                            required
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                            onChange={handleFileUpload}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                       
                        <div className="relative z-0 w-full mb-5 group">
                            <select
                                type="text"
                                name="category"
                                id="floating_last_name"
                                defaultValue=""
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                            >
                                <option className="text-sm text-red-500" value="" disabled hidden  >Select a category</option>

                                {categoryLoading === 1 ? (
                                    <option disabled>Loading...</option>
                                ) : (
                                    <>

                                        {allCategories?.map((category, idx) => (
                                            <option key={idx} value={category.categoryName}>
                                                <span > {category.categoryName}</span>
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>

                            <label
                                htmlFor="floating_last_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >

                            </label>


                        </div>



                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="brand" id="floating_phone" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Brand</label>
                        </div>
                       

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Submit</button>
                </form>

            </div></div>

    );
};

export default AddWishlist;