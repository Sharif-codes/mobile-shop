import axios from "axios";
import toast from "react-hot-toast";


const addToWishList = async (product) => {
  
    const res= await axios.post("https://digi-store-sharif-server.vercel.app/addToWishlist",product)
   if (res.data.insertedId) {
    toast.success(`${product.name} added to wishlist` )
   }
   console.log(res.data);
    return res.data;
};

export default addToWishList;