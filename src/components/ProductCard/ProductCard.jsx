/* eslint-disable react/prop-types */


import { useLocation, useNavigate } from "react-router-dom";
import useUserData from "../../Hooks/useUserData";
import addToWishList from "../../Api/addToWishList";
import addToCart from "../../Api/addToCart";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useCart from "../../Hooks/useCart";


import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'





const ProductCard = ({ product }) => {
    const location = useLocation()
    const user = useUserData()
    const role= user[0]?.role;
    const axiosPublic = useAxiosPublic()
    const token = localStorage.getItem('access-token')
    const [cart, cartLoading, refetch] = useCart();

    const cartItem= cart
    console.log(cartItem)
 

    const navigate = useNavigate()

    const handleDetailsPage = () => {
        if (location.pathname === "/dashboard/wishList" || location.pathname ==="/dashboard/cart") {
            return;
        }
        navigate("/products/details", { state: product })
    }

    const handleAddToCart = () => {
        const product_Id = product?._id
        product.product_Id = product_Id
        product.buyerEmail = user[0]?.email;
        product.cartQuantity= 1;
        product.cartPrice= product.price;

        addToCart(product, refetch)

        
    }


    const handleDeleteCart = (product) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove Product",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/cartRemove/${product._id}`,{
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                console.log("delete id:", product._id);
                console.log(res.data);
                refetch()
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The product is deleted from cart",
                        icon: "success",
                    });
                    // window.location.reload()
                }
            }
        });
    };

    const handleDeleteSellerProduct = (product) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove Product",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/sellerProductDelete/${product._id}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                console.log("delete id:", product._id);
                console.log(res.data);

                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The product is deleted",
                        icon: "success",
                    });
                    window.location.reload()
                }
            }
        });
    }
    const handleDeleteWishlist = (product) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove Product",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/wishlistDelete/${product._id}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                console.log("delete id:", product._id);
                console.log(res.data);

                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The product is deleted",
                        icon: "success",
                    });
                    window.location.reload()
                }
            }
        });
    }

    const handleUpdateProduct = () => {
        if (location?.pathname === "/dashboard/sellerProducts") {
            navigate("/dashboard/updateProduct", { state: product })
        }
    }
    return (

        <div className="rounded-md mx-4 mt-4 border-1 shadow-lg shadow-slate-200 flex flex-col justify-between md:w-40 lg:w-52" >
            <div onClick={handleDetailsPage} className="group  cursor-pointer flex justify-center p-1">
                <img src={product?.photo_url} alt="A beautiful landscape"
                    className=" flex justify-center h-20 md:h-24 object-cover bg-transparent 
              transition-transform duration-300 ease-in-out
              group-hover:scale-125"></img>
            </div>

            <div className="p-2 text-center">
                <h2 className="text-sm text-center font-semibold">{product?.name}</h2>
                <h2 className="text-xs font-semibold ">Brand: {product?.brand}</h2>
                {location.pathname === "/dashboard/wishList" ? "" : <h2 className="text-xs text-red-600">Price: {product?.price}Tk.</h2>}
                {location.pathname === "/dashboard/wishList" ? "" : location.pathname === "/dashboard/cart" ? <h2 className="text-xs font-semibold">Quantity: {product?.cartQuantity}</h2> : <h2 className="text-xs text-green-600">In stock: {product?.quantity}</h2>}
                {location.pathname === "/dashboard/cart" ? "" : <h2 className="text-xs text-red-600 flex items-center justify-center"> <Rating
                    style={{ maxWidth: 100 }}
                    value={product?.rating}
                    readOnly
                /> </h2>}


                <div className="mt-2">
                    {role == "buyer" && location.pathname === "/products" && (
                        <div className="flex justify-between gap-1 ">
                            <button onClick={handleDetailsPage} className="btn w-1/2 btn-sm text-[8px] lg:text-xs md:text-[8px] hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 rounded-md border-0">
                                Details
                            </button>
                            <button onClick={()=>handleAddToCart()} className="btn w-1/2 btn-sm text-[8px] lg:text-xs md:text-[8px] hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 rounded-md border-0">
                                Add to Cart
                            </button>
                        </div>
                    )}


                    {role === "buyer" && location.pathname === "/dashboard/cart" && (
                        <button onClick={() => handleDeleteCart(product)} className="btn btn-error text-white w-full btn-sm hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 rounded-md border-0 ">
                            Delete
                        </button>
                    )
                    }
                    {role === "seller" && location.pathname === "/dashboard/sellerProducts" && (
                        <div className="flex justify-between gap-1">
                            <button onClick={() => handleDeleteSellerProduct(product)} className="btn w-1/2 btn-sm hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 rounded-md border-0">
                                Delete
                            </button>
                            <button onClick={handleUpdateProduct} className="btn w-1/2 btn-sm hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 rounded-md border-0">Update</button>
                        </div>
                    )}

                    {
                        role === "buyer" && location.pathname === "/dashboard/wishList" && (
                            <button onClick={() => handleDeleteWishlist(product)} className="btn btn-error text-white w-full btn-sm hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 rounded-md border-0 ">
                                Delete
                            </button>
                        )
                    }
                </div>
            </div>
        </div>

    );
};

export default ProductCard;