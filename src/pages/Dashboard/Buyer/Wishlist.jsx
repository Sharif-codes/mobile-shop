
import useWishList from "../../../Hooks/useWishList";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/spinner/spinner";


const Wishlist = () => {
    const [wishList, wishlistLoading,refetchWishlist]= useWishList()
   
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-auto gap-6 md:gap-12 lg:gap-12">
        {wishlistLoading? <Spinner></Spinner>  : wishList.length > 0 ? (
            wishList.map((product,idx) => (
                <ProductCard key={idx} product={product} refetchWishlist={refetchWishlist}></ProductCard>
            ))
        ) : (
            <div className="flex  justify-center items-center  text-blue-500 h-screen ">
            <div className="text-xl font-bold p-2 animate-bounce "> No Items...</div>
        </div>
        )}
    </div>
    );
};

export default Wishlist;