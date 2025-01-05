
import useWishList from "../../../Hooks/useWishList";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/spinner/spinner";


const Wishlist = () => {
    const [wishList, wishlistLoading,refetchWishlist]= useWishList()
   
    return (
        <div className="grid grid-cols-3">
        {wishlistLoading? <Spinner></Spinner>  : wishList.length > 0 ? (
            wishList.map((product,idx) => (
                <ProductCard key={idx} product={product} refetchWishlist={refetchWishlist}></ProductCard>
            ))
        ) : (
            <p className="text-center">No products available</p>
        )}
    </div>
    );
};

export default Wishlist;