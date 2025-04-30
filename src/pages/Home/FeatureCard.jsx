/* eslint-disable react/prop-types */

const FeatureCard = ({ product }) => {

    return (

        <div className="p-2 rounded-md mt-4 border-1 shadow-md w-fit">
            <img
                src={product?.photo_url}
                alt="product image"
                className="w-full h-32 md:h-52 object-contain rounded-t-md"/>
            <div className="p-1 md:p-2 text-center">
                <h2 className="text-sm md:text-xl text-center font-semibold">{product?.name}</h2>
                <h2 className="text-xs md:text-lg font-semibold ">Brand: {product?.brand}</h2>
            </div>
        </div>

    );
};

export default FeatureCard;