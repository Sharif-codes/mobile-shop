
import useFeaturedProduct from "../../Hooks/useFeaturedProduct";
import FeatureCard from "./FeatureCard";



const FeaturedProducts = () => {
    const allProducts= useFeaturedProduct()
console.log("feature:", allProducts);
    return (
        <div className="grid grid-cols-3">
            {
                allProducts.map(item => <FeatureCard key={item} product={item}></FeatureCard>)
            }
            
        </div>
    );
};

export default FeaturedProducts;