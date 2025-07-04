import { useState } from "react";


const ProductReview = () => {
    const [rate, setRate] = useState(0)
    const handleReview = (rate) => {
        setRate(0);
        setRate(rate);
    }
    console.log(rate);
    return (
        <div className="flex flex-col">
            <div className="rating">
                <input type="radio" onClick={() => handleReview(1)} name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                <input type="radio" onClick={() => handleReview(2)} name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star"  />
                <input type="radio" onClick={() => handleReview(3)} name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                <input type="radio" onClick={() => handleReview(4)} name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                <input type="radio" onClick={() => handleReview(5)} name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
            </div>
            <div className="rating">
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" checked={rate=== 1} />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" checked={rate=== 2} />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" checked={rate=== 3}/>
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" checked={rate=== 4}/>
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" checked={rate=== 5}/>
            </div>
        </div>

    );
};

export default ProductReview;