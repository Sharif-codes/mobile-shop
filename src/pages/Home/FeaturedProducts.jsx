import ProductCard from "../../components/ProductCard/ProductCard";


const FeaturedProducts = () => {
    const count=[1,2,3,4,5,6]

    return (
        <div className="grid grid-cols-3">
            {
                count.map(item => <ProductCard key={item}></ProductCard>)
            }
            
        </div>
    );
};

export default FeaturedProducts;