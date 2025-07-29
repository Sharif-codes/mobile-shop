import { AnimatedCounter } from "react-animated-counter";
import useAllsellerProducts from "../../../../Hooks/useAllsellerProducts";
import useSellerSoldProducts from "../../../../Hooks/useSellerSoldProducts";

const SellerStats = () => {

    const [sellerProduct, productLoading, refetchProduct] = useAllsellerProducts();

    const [sellerSoldProduct, soldProductLoading, refetch] = useSellerSoldProducts();

    console.log("seller sold product: ", sellerSoldProduct);

    console.log(sellerSoldProduct);

    console.log("all product: ", sellerProduct);

    const availableProdArray = []
    sellerProduct?.map(item => availableProdArray.push(item.quantity))
    const availableProducts = availableProdArray?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const soldProdArray = []
    sellerSoldProduct?.soldProducts?.map(item => soldProdArray.push(item.cartQuantity))

    const totalSoldProducts = soldProdArray?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)


    return (
        <div className=" mt-4 w-full flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 lg:gap-8 ">
                <div className=" w-40 h-24 md:w-52 md:h-28  bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100 flex flex-col justify-center items-center ">
                    <div>
                        <p className="text-center text-md font-semibold"> Items</p>
                    </div>
                    <div>
                        <AnimatedCounter includeDecimals={false} value={sellerProduct?.length} color="white" fontSize="60px" />
                    </div>
                </div>
                <div className=" w-40 h-24 md:w-52 md:h-28  bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100 flex flex-col justify-center items-center ">
                    <div>
                        <p className="text-center text-md font-semibold"> Available products</p>
                    </div>
                    <div>
                        <AnimatedCounter includeDecimals={false} value={availableProducts} color="white" fontSize="60px" />
                    </div>
                </div>



                <div className="w-40 h-24 md:w-52 md:h-28  bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100 flex flex-col justify-center items-center ">
                    <div>
                        <p className="text-center text-md font-semibold">Sold Products</p>
                    </div>
                    <div>
                        <AnimatedCounter includeDecimals={false} value={totalSoldProducts} color="white" fontSize="60px" />
                    </div>
                </div>
                <div className=" w-40 h-24 md:w-52 md:h-28  bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100 flex flex-col justify-center items-center ">
                    <div>
                        <p className="text-center text-md font-semibold">This month sold</p>
                    </div>
                    <div>
                        <AnimatedCounter includeDecimals={false} value={sellerSoldProduct?.totalProductThisMonth} color="white" fontSize="60px" />
                    </div>
                </div>
                 <div className=" w-40 h-24 md:w-52 md:h-28 flex flex-col hover bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100">
                    <div className=" w-40 md:w-52 h-28  bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100">
                        <div>
                            <p className="text-center text-md font-semibold mt-4">Last sell</p>
                        </div>
                        <div>
                            <p className="text-3xl mt-2 text-center">{sellerSoldProduct?.lastSold.slice(0, 10)}</p>
                        </div>
                    </div>

                </div>

               
                    <div className=" w-40 h-24 md:w-52 md:h-28 bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100 flex flex-col justify-center items-center ">
                        <div>
                            <p className="text-center text-md font-semibold">Customers</p>
                        </div>
                        <div>
                            <AnimatedCounter includeDecimals={false} value={sellerSoldProduct?.totalBuyer} color="white" fontSize="60px" />
                        </div>
                    </div>

              
            </div>
        </div>
    );
};

export default SellerStats;