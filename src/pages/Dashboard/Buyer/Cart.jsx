import toast from "react-hot-toast";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/spinner/spinner";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useCart from "../../../Hooks/useCart";
import useUserData from "../../../Hooks/useUserData";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const token = localStorage.getItem('access-token')
    const navigate= useNavigate()
    const user = useUserData()
    const axiosPublic = useAxiosPublic()
    const [cart, cartLoading, refetchCart] = useCart()
    console.log("cart data: ", cart)
    const prices = []
    cart?.map(product => prices.push(product.price))
    const sum = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const paymentData = {
        user,
        amount: sum
    }

    const handlePayment = async (paymentInfo) => {
        console.log(paymentInfo);

        try {
            const res = await axiosPublic.post('/user/make-payment', paymentData,
            )
            if(res.data.success){
                // toast.success(`${cart?.length} product purchased successfully!`)
                // navigate("/dashboard/buyer/purchasedProduct")
                window.location.replace(res.data.url)
            }
               console.log("payment success:",res.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (

        <div className="h-screen">

            <div className="h-16 md:h-16 m-2 flex justify-between px-2 md:px-4 bg-slate-100 rounded-t-lg   text-gray-600">
                <div className="flex items-center text-sm md:text-lg lg:text-2xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    My Cart
                </div>
                {
                    cart?.length > 0 && <div className="flex items-center justify-evenly space-x-4">
                    <p><span className="font-semibold">Items: </span><span>{cart?.length}</span></p>
                    <p><span className="font-semibold">Total price:</span> <span>{sum}</span><span>Tk.</span></p>
                    <button onClick={() => handlePayment(paymentData)} className="btn btn-primary">Pay now</button>
                </div>
                }
                

            </div>
            {cartLoading ? <Spinner  ></Spinner> : cart.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-auto gap-6 md:gap-12 lg:gap-12 ">
                    {
                        cart?.map((product, idx) => (
                            <ProductCard key={idx} product={product} refetchCart={refetchCart}></ProductCard>

                        )
                        )}</div>
            ) : (
                <div className="flex  justify-center items-center   h-[calc(100vh-100px)]  ">
                    <div className="text-xl font-bold p-2 "> No items found!</div>
                </div>
            )}
        </div>

    )
};

export default Cart;