import axios from "axios";
import toast from "react-hot-toast";

const addToCart = async (product,refetch) => {
    const token = localStorage.getItem('access-token')
    console.log("abhdabd:", product);
    const res= await axios.post("http://localhost:4000/addToCart",product,{
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
    console.log("cart res: ",res?.data);
    if (res.data.insertedId || res.data.modifiedCount) {
        toast.success(`${product.name} added to cart` )
        refetch()
       }
       else{
        toast.error(`${product.name} maximum added!`)
       }

    return res.data;

    
};

export default addToCart;