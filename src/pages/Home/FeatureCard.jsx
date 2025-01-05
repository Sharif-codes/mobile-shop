/* eslint-disable react/prop-types */
import useFeaturedProduct from "../../Hooks/useFeaturedProduct";


const FeatureCard = ({product}) => {
    
    return (
    
            <div className="rounded-md border-1 shadow-md">
                    <img
                        src={product?.photo_url}
                        alt="product image"
                        className="w-full h-60 object-cover rounded-t-md " />
           
                <div className="p-2">
                    <h2 className="text-xl font-semibold">{product?.name}</h2>
                    <h2 className="text-lg font-semibold">Brand: {product?.brand}</h2> 
                    <h2 className="text-sm text-red-600">Price: {product?.price}Tk.</h2>
                    <h2 className="text-sm font-semibold">Category: {product?.category}</h2>
                   
                    <p className="text-xs mt-2">{product?.description.length < 50?`${product?.description}`:`${product?.description.slice(0,50)}...`}</p>
                    
                </div>
            </div>
        
    );
};

export default FeatureCard;