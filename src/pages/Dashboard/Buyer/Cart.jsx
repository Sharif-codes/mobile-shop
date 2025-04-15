import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/spinner/spinner";
import useCart from "../../../Hooks/useCart";

const Cart = () => {
    const [cart, cartLoading, refetchCart] = useCart()
    console.log("cart data: ", cart)
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-auto gap-6 md:gap-12 lg:gap-12">
            {cartLoading ? <Spinner></Spinner> : cart.length > 0 ? (
                cart?.map((product, idx) => (
                    <ProductCard key={idx} product={product} refetchCart={refetchCart}></ProductCard>
                ))
            ) : (
                <p className="text-center">No products available</p>
            )}
        </div>
    );
};

export default Cart;