import useAllsellerProducts from "../../../../Hooks/useAllsellerProducts";
import useSellerSoldProducts from "../../../../Hooks/useSellerSoldProducts";

const SellerStats = () => {

     const [sellerProduct, productLoading, refetchProduct]= useAllsellerProducts()

     const [sellerSoldProduct, soldProductLoading, refetch]= useSellerSoldProducts();

     console.log(sellerSoldProduct);

    console.log("all product:", sellerProduct);
    return (
        <div className="m-8">
            <div className="flex md:flex-row flex-col gap-0 md:gap-4 lg:gap-12 justify-center items-center">
                <div className=" w-56 h-28  bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100 ">
                    <p className="text-center text-2xl font-semibold"> Products</p>
                    <p className="text-6xl text-center">{sellerProduct?.length}</p>
                </div>
                <div className=" w-56 h-28 flex flex-col hover bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100">
                <p className="text-center text-2xl font-semibold">Sold Products</p>
                 <p className="text-6xl text-center">{sellerSoldProduct?.soldProducts?.length}</p>
                </div>
                <div className=" w-56 h-28 flex flex-col hover bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100">
                <p className="text-center text-2xl font-semibold">Buyers</p>
                 <p className="text-6xl text-center">{sellerSoldProduct?.totalBuyer}</p>
                </div>
            </div>
        </div>
    );
};

export default SellerStats;