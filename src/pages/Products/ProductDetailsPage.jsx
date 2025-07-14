import { useLocation, useNavigate } from "react-router-dom";
import useUserData from "../../Hooks/useUserData";
import addToWishList from "../../Api/addToWishList";
import addToCart from "../../Api/addToCart";
import ProductReview from "./ProductReview";
import useAuth from "../../Hooks/useAuth";
import useCart from "../../Hooks/useCart";

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const ProductDetailsPage = () => {
    const location = useLocation();
    const product = location.state;
    const user = useUserData()
    const role= user[0]?.role;
    const email= user[0]?.email
    const [cart, cartLoading, refetch] = useCart();

    console.log("role:", user.role);

    console.log(user);
    console.log("cart prod", product);
    const navigate = useNavigate()


    const handleAddToCart = (product) => {

        const product_Id = product?._id
        product.product_Id = product_Id
        product.buyerEmail = email
        addToCart(product, refetch)
        
    }
    const handleAddToWishList = () => {

        addToWishList(product)
    }

    const handleUpdateProduct = () => {

        navigate("/dashboard/updateProduct", { state: product })

    }

    return (
        <div className="w-full flex justify-center items-center lg:mt-5 mt-1">
            <div className="sm:flex-col md:flex lg:flex-row items-center" >
                <img
                    src={product?.photo_url}
                    alt="Album"
                    className="mx-auto h-60" />
                <div><div className="text-center">
                    <p className="text-xl font-semibold">{product?.name}</p>
                    <p className="">category: {product?.category}</p>
                    <p>brand: {product?.brand}</p>
                    <p className="text-blue-500">Price: {product?.price}Tk.</p>
                    <p>Description: {product?.description}</p>
                    <p>Ratings:</p>
                    <p className="flex justify-center"><Rating
                        style={{ maxWidth: 140 }}
                        value={product?.rating}
                        readOnly
                    />  </p>
                </div>
                    <div className="mt-2 flex  items-center gap-2 justify-center">
                        {
                            role == "buyer" && <div className="flex justify-between gap-1">
                                <button onClick={()=>handleAddToCart(product)} className="btn text-xs btn-sm hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 rounded-md border-0">Add to Cart</button>
                            </div>
                        }
                        {
                            role == "seller" && email === product?.sellerEmail ? <div className="flex justify-between gap-1">
                                <button onClick={handleUpdateProduct} className="btn text-xs btn-sm hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 rounded-md border-0">Update Product</button>
                            </div> : <></>
                        }


                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductDetailsPage;