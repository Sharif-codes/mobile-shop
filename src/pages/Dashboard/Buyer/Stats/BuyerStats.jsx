import { AnimatedCounter } from "react-animated-counter";
import useCart from "../../../../Hooks/useCart";
import usePurchashedProducts from "../../../../Hooks/usePurchashedProducts";

const BuyerStats = () => {
    const [cart, cartLoading,refetch]= useCart()
    const [buyerProducts, productLoading]= usePurchashedProducts()
    return (
         <div className="m-8">
            <div className="flex md:flex-row flex-col gap-2 md:gap-4 lg:gap-12 justify-center items-center">
                <div className=" w-56 h-28  bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100 flex flex-col justify-center items-center ">
                    <div>
                        <p className="text-center text-2xl font-semibold"> Cart items</p>
                    </div>
                    <div>
                        <AnimatedCounter includeDecimals={false} value={cart?.length} color="white" fontSize="60px" />
                    </div>
                </div>
                <div className=" w-56 h-28 flex flex-col hover bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100">


                    <div className=" w-56 h-28  bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100 flex flex-col justify-center items-center ">
                        <div>
                            <p className="text-center text-2xl font-semibold">Purchashed</p>
                        </div>
                        <div>
                            <AnimatedCounter includeDecimals={false} value={buyerProducts?.totalProduct} color="white" fontSize="60px" />
                        </div>
                    </div>
                </div>
                <div className=" w-56 h-28 flex flex-col hover bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100">
                    <div className=" w-56 h-28  bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100">
                        <div>
                            <p className="text-center text-2xl font-semibold mt-2">Last purchashed</p>
                        </div>
                        <div>
                            <p className="text-3xl mt-2 text-center">{buyerProducts?.latest.slice(0, 10)}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BuyerStats;