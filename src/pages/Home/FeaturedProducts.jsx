
import ProductCard from "../../components/ProductCard/ProductCard";
import useFeaturedProduct from "../../Hooks/useFeaturedProduct";
import FeatureCard from "./FeatureCard";



const FeaturedProducts = () => {
    const allProducts= useFeaturedProduct()
console.log("feature:", allProducts);
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-10 lg:gap-10">
            {
                
                allProducts.map(item => <FeatureCard key={item} product={item}></FeatureCard>)
            }
            
        </div>
    );
};

export default FeaturedProducts;