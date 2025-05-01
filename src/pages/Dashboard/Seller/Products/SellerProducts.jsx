import ProductCard from "../../../../components/ProductCard/ProductCard";
import Spinner from "../../../../components/spinner/spinner";
import useAllsellerProducts from "../../../../Hooks/useAllsellerProducts";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const SellerProducts = () => {
    const [allSellerProducts, productLoading] = useAllsellerProducts();

    return (
        <div className="flex flex-col mt-0 lg:mt-8 md:mt-0">
            <div className="h-12 md:h-16  flex justify-between items-center mx-4 p-2 md:p-4 bg-slate-100 rounded-t-lg text-sm md:text-lg font-semibold ">
                <h2 className="text-sm md:text-2xl">Products</h2>
                <Link to="/dashboard/addProducts"><button className="flex justify-center items-center  "> <FaPlus></FaPlus> <span>Add Product</span></button></Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-2 md:gap-2">
                {productLoading ? <Spinner></Spinner> : allSellerProducts.length > 0 ? (
                    allSellerProducts.map((product) => (
                        <ProductCard key={product.sellerEmail} product={product}></ProductCard>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default SellerProducts;
