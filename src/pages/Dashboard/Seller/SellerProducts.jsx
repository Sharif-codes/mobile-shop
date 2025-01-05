import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/spinner/spinner";
import useAllsellerProducts from "../../../Hooks/useAllsellerProducts";

const SellerProducts = () => {
    const [allSellerProducts,productLoading] = useAllsellerProducts();

    return (
        <div className="grid grid-cols-3">
            {productLoading? <Spinner></Spinner>: allSellerProducts.length > 0 ? (
                allSellerProducts.map((product) => (
                    <ProductCard key={product.sellerEmail} product={product}></ProductCard>
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};

export default SellerProducts;
