import { useLocation } from "react-router-dom";
import useUserData from "../../Hooks/useUserData";
import addToWishList from "../../Api/addToWishList";
import addToCart from "../../Api/addToCart";


const ProductDetailsPage = () => {
    const location = useLocation();
    const product = location.state;
    const user = useUserData()

    product.email = user.email
    
    const handleAddToCart = () => {
        addToCart(product)
    }
    const handleAddToWishList = () => {
       
        addToWishList(product)
    }
    return (
        <div className="w-full flex justify-center items-center lg:mt-5 mt-1">
            <div className="
            " >

                <img
                    src={product?.photo_url}
                    alt="Album"
                    className="mx-auto h-60" />

                <div className="text-center">
                    <p className="text-xl font-semibold">{product.name}</p>
                    <p className="">category: {product.category}</p>
                    <p>brand: {product.brand}</p>
                    <p className="text-blue-500">Price: {product.price}Tk.</p>
                    <p>Description: {product.description}</p>

                </div>
                <div className="mt-2">
                    {
                        user?.role == "buyer" ? <div className="flex justify-between gap-1">
                            <button onClick={handleAddToWishList} className="btn text-xs w-1/2  btn-sm">Add to Wishlist</button>
                            <button onClick={handleAddToCart} className="btn text-xs  w-1/2 btn-sm">Add to Cart</button>
                        </div> : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;