import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/spinner/spinner";
import useAllProducts from "../../../Hooks/useAllProducts";

const AllProducts = () => {
    const [allSellerProducts,productLoading]= useAllProducts()
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-auto gap-6 md:gap-12 lg:gap-12">
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

export default AllProducts;