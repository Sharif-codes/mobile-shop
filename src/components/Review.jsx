// components/Review.jsx
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";


const Review = ({ isOpen, onClose, onSubmitReview, product }) => {

  
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialogElement = dialogRef.current;
        if (dialogElement) {
            if (isOpen) {
                // Use showModal() for native <dialog>
                dialogElement.showModal();
            } else {
                dialogElement.close();
            }
        }
    }, [isOpen]); // Re-run effect when isOpen prop changes

    const handleReviewSubmission = (e) => {
        e.preventDefault();

        const reviewText = e.target.reviewText.value;
        const selectedRating = e.target["rating-2"]?.value;

        if (!reviewText.trim()) {
            toast.error("Please write your review.");
            return;
        }
        if (!selectedRating) {
            toast.error("Please select a rating.");
            return;
        }

        onSubmitReview({
            productId: product?.product_Id,
            
            reviewText,
            rating: selectedRating,

        });

        // Clear form fields (optional, if you want to reset after submit)
        e.target.reset();

    };

    return (

        <dialog className="modal" ref={dialogRef}>
            <div className="modal-box">

                <form method="dialog">
                    <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div className="flex flex-col justify-center items-center">
                    <img src={product?.photo_url} width={60} alt="" />
                    <h3 className="font-bold text-lg mb-4">{product?.name}</h3>
                    
                </div>


                {/* Your actual review submission form */}
                <form
                    onSubmit={handleReviewSubmission}
                    className="space-y-2 md:space-y-4 flex flex-col justify-center items-center m-4 md:m-8"
                >
                    <input
                        name="reviewText"
                        type="text"
                        placeholder="Write something.."
                        className="input input-primary w-full max-w-xs" // Added w-full max-w-xs for better styling
                        required
                    />
                    <div className="rating">
                        <input type="radio" name="rating-2" value="1" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                        <input type="radio" name="rating-2" value="2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                        <input type="radio" name="rating-2" value="3" className="mask mask-star-2 bg-orange-400" aria-label="3 star" defaultChecked /> 
                        <input type="radio" name="rating-2" value="4" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                        <input type="radio" name="rating-2" value="5" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit Review
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default Review;