/* eslint-disable react/prop-types */


import { useLocation, useNavigate } from "react-router-dom";
import useUserData from "../../Hooks/useUserData";
import addToWishList from "../../Api/addToWishList";
import addToCart from "../../Api/addToCart";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const ProductCard = ({ product,refetchWishlist,refetchCart }) => {
    const location = useLocation()
    const user = useUserData()
    const axiosPublic = useAxiosPublic()
   
    const navigate = useNavigate()
    const handleDetailsPage = () => {
        if (location.pathname === "/products") {
            navigate("/products/details", { state: product })
        }
    }
    const handleAddToCart = () => {
        delete product._id
        product.email = user.email
        addToCart(product)
    }
    const handleAddToWishList = () => {
        delete product._id
        product.email = user.email
        addToWishList(product)
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
                const res = await axiosPublic.delete(`/wishlistRemove/${product._id}`);
                console.log("delete id:",product._id);
                console.log(res.data);
                refetchWishlist()
                if (res.data.deletedCount > 0) {
                     Swal.fire({
                    title: "Deleted!",
                    text: "The product is deleted from wishlist",
                    icon: "success",
                });
                // window.location.reload()
                }
               
            }
        });
    };

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
                const res = await axiosPublic.delete(`/cartRemove/${product._id}`);
                console.log("delete id:",product._id);
                console.log(res.data);
                refetchCart()
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
    return (

        <div className="rounded-md border-1 shadow-md" >
            <div onClick={handleDetailsPage} className="cursor-pointer" >
                <img
                    src={product?.photo_url}
                    alt="product image"
                    className="w-full h-60 object-cover rounded-t-md " />
            </div>

            <div className="p-2">
                <h2 className="text-xl font-semibold">{product?.name}</h2>
                <h2 className="text-lg font-semibold">Brand: {product?.brand}</h2>
                <h2 className="text-sm text-red-600">Price: {product?.price}Tk.</h2>
                <h2 className="text-sm font-semibold">Category: {product?.category}</h2>

                <p className="text-xs mt-2">{product?.description.length < 50 ? `${product?.description}` : `${product?.description.slice(0, 50)}...`}</p>

                <div className="mt-2">
                    {user.role === "buyer" && location.pathname === "/products" && (
                        <div className="flex justify-between gap-1">
                            <button onClick={handleAddToWishList} className="btn w-1/2 btn-sm">
                                Add to Wishlist
                            </button>
                            <button onClick={handleAddToCart} className="btn w-1/2 btn-sm">
                                Add to Cart
                            </button>
                        </div>
                    )}

                    {user.role === "buyer" && location.pathname === "/dashboard/wishList" && (
                        <button onClick={() => handleDeleteWishlist(product)} className="btn btn-error text-white w-full btn-sm">
                            Delete
                        </button>
                    )
                    }
                    {user.role === "buyer" && location.pathname === "/dashboard/cart" && (
                        <button onClick={() => handleDeleteCart(product)} className="btn btn-error text-white w-full btn-sm">
                            Delete
                        </button>
                    )
                    }

                    {user.role === "seller" && (
                        <div className="flex justify-between gap-1">
                            <button className="btn w-1/2 btn-sm">
                                Delete
                            </button>
                            <button className="btn w-1/2 btn-sm">Update</button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ProductCard;