import axios from "axios";
import toast from "react-hot-toast";

const addToCart = async (product) => {
    
    const res= await axios.post("http://localhost:4000/addToCart",product)
    if (res.data.insertedId) {
        toast.success(`${product.name} added to cart` )
       }
    return res.data;
};

export default addToCart;