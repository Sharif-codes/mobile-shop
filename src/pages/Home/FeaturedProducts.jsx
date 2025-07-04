
import Carousel from "react-multi-carousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import useFeaturedProduct from "../../Hooks/useFeaturedProduct";
import FeatureCard from "./FeatureCard";



const FeaturedProducts = () => {
    const allProducts= useFeaturedProduct()

const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
   
    return (
        <div className="w-full min-h-[100px]">
                    <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={2500} centerMode rtl>
                        
                           {
                            allProducts?.map((product, idx) => (
                                <div key={idx} className="p-4 bg-transparent rounded flex flex-col items-center justify-center">
                                    <img className="w-24 " src={product.photo_url} alt="product" />
                                    
                                </div>
                            ))
                        } 
                    </Carousel>
                </div>
    );
};

export default FeaturedProducts;