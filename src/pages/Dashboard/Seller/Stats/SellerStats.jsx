const SellerStats = () => {
    return (
        <div className="m-4">
            <div className="flex md:flex-row flex-col gap-4 justify-center items-center">
                <div className=" w-56 h-28  bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100 ">
                    <p className="text-center text-2xl font-semibold"> Products</p>
                </div>
                <div className=" w-56 h-28 flex flex-col hover bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100">
                <p className="text-center text-2xl font-semibold">Sold Products</p>
                </div>
                <div className=" w-56 h-28 flex flex-col hover bg-gradient-to-r rounded-xl from-purple-500 to-pink-500 text-slate-100">
                <p className="text-center text-2xl font-semibold">Buyers</p>
                </div>
            </div>
        </div>
    );
};

export default SellerStats;