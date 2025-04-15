/* eslint-disable react/prop-types */

const FeatureCard = ({ product }) => {

    return (

        <div className="rounded-md mt-4 border-1 shadow-md w-fit">
            <img
                src={product?.photo_url}
                alt="product image"
                className="w-full h-32 md:h-52 object-contain rounded-t-md " />

            <div className="p-1 md:p-2 text-center">
                <h2 className="text-sm md:text-xl text-center font-semibold">{product?.name}</h2>
                <h2 className="text-xs md:text-lg font-semibold ">Brand: {product?.brand}</h2>
                <h2 className="text-xs text-red-600">Price: {product?.price}Tk.</h2>
                <h2 className="text-xs md:text-sm font-semibold">Category: {product?.category}</h2>

                <p className="text-xs mt-2">{product?.description.length < 50 ? `${product?.description}` : `${product?.description.slice(0, 50)}...`}</p>

            </div>
        </div>

    );
};

export default FeatureCard;