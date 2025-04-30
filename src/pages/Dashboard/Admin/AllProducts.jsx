import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/spinner/spinner";
import useAllProducts from "../../../Hooks/useAllProducts";
import Products from "../../Products/Products";

const AllProducts = () => {
    // const [allSellerProducts,productLoading]= useAllProducts()
    // console.log('products',allSellerProducts);
    return (
    //     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-auto gap-6 md:gap-12 lg:gap-12">
    //     {productLoading? <Spinner></Spinner>: allSellerProducts.length > 0 ? (
    //         allSellerProducts.map((product) => (
    //             <ProductCard key={product.sellerEmail} product={product}></ProductCard>
    //         ))
    //     ) : (
    //         <p>No products available</p>
    //     )}
    // </div>
    <div>
        <Products></Products>
    </div>
    );
};

export default AllProducts;