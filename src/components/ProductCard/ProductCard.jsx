/* eslint-disable react/prop-types */


import { useLocation, useNavigate } from "react-router-dom";
import useUserData from "../../Hooks/useUserData";
import addToWishList from "../../Api/addToWishList";
import addToCart from "../../Api/addToCart";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useCart from "../../Hooks/useCart";


const ProductCard = ({ product }) => {
    const location = useLocation()
    const user = useUserData()
    const axiosPublic = useAxiosPublic()
    const token = localStorage.getItem('access-token')
    const [cart, cartLoading, refetch] = useCart();

    const navigate = useNavigate()
    const handleDetailsPage = () => {
        // if (location.pathname === "/products") {
        //     navigate("/products/details", { state: product })
        // }
        navigate("/products/details", { state: product })
    }
    const handleAddToCart = () => {
        refetch()
        const product_Id= product?._id
        product.product_Id= product_Id
        
        product.buyerEmail = user?.email
        addToCart(product)
        refetch()
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
                console.log("delete id:", product._id);
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

    const handleUpdateProduct = () => {
        if (location.pathname === "/dashboard/sellerProducts") {
            navigate("/dashboard/updateProduct", { state: product })
        }
    }
    return (

        <div className="rounded-md mx-4 mt-4 border-1 shadow-lg shadow-slate-200 flex flex-col justify-between" >
            <div onClick={handleDetailsPage} className="cursor-pointer flex justify-center p-1   " >
                <img
                    src={product?.photo_url}
                    alt="product image"
                    className="h-20 md:h-24 object-cover bg-transparent " />
            </div>

            <div className="p-2 text-center">
                <h2 className="text-sm text-center font-semibold">{product?.name}</h2>
                <h2 className="text-xs font-semibold ">Brand: {product?.brand}</h2>
                <h2 className="text-xs text-red-600">Price: {product?.price}Tk.</h2>
                
                <div className="mt-2">
                    {user.role === "buyer" && location.pathname === "/products" && (
                        <div className="flex justify-between gap-1 ">
                            <button onClick={handleDetailsPage} className="btn w-1/2 btn-sm text-xs">
                                Details
                            </button>
                            <button onClick={handleAddToCart} className="btn w-1/2 btn-sm text-xs">
                                Add to Cart
                            </button>
                        </div>
                    )}


                    {user.role === "buyer" && location.pathname === "/dashboard/cart" && (
                        <button onClick={() => handleDeleteCart(product)} className="btn btn-error text-white w-full btn-sm">
                            Delete
                        </button>
                    )
                    }

                    {user.role === "seller" && location.pathname === "/dashboard/sellerProducts" && (
                        <div className="flex justify-between gap-1">
                            <button onClick={() => handleDeleteSellerProduct(product)} className="btn w-1/2 btn-sm">
                                Delete
                            </button>
                            <button onClick={handleUpdateProduct} className="btn w-1/2 btn-sm">Update</button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ProductCard;