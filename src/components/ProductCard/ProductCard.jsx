/* eslint-disable react/prop-types */


import useUserData from "../../Hooks/useUserData";


const ProductCard = ({product}) => {
    const user= useUserData()
    console.log(user);
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
                    <div className="mt-2">
                        {
                            user.role== "buyer"? <div className="flex justify-between gap-1">
                                <button className="btn  w-1/2  btn-sm">Add to Wishlist</button>
                                <button className="btn  w-1/2 btn-sm">Add to Cart</button>
                                </div> :<></>
                        }
                        {
                            user.role== "seller"? <div className="flex justify-between gap-1">
                                 <button className="btn w-1/2  btn-sm">Delete</button>
                                 <button className="btn w-1/2 btn-sm">Update</button>
                            </div>: <></>
                        }
                            
                    </div>
                </div>
            </div>
        
    );
};

export default ProductCard;