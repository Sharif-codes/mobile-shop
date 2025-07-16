import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import './ZigZag.css';
import useGetReview from "../../Hooks/useGetReview";
import { Rating } from "@smastrom/react-rating";

const Testomonial = () => {
    const theme = useSelector((state) => state.theme.value)
    const [reviews, isReviewLoading] = useGetReview();

    console.log(reviews);


    return (
        <Marquee pauseOnHover speed={10} >
            <div data-theme={theme} >

                <section className="">
                    <div className={`items-center h-60 inline-flex gap-4 ${theme === 'dark' ? 'text-black' : 'text-base'}`}>

                        {reviews?.map((review, idx) => (
                            <figure key={idx} style={{ animationDelay: `${idx * 2}s` }} className="testimonial-item flex flex-col justify-center items-center p-4 text-center w-[300px] h-[150px]  rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-slate-200">
                                <blockquote className="mx-auto mb-2 max-w-2xl ">
                                    <h3 className="text-lg font-semibold ">"{review?.reviewText}"</h3>
                                </blockquote>
                                <h2 className="text-xs text-red-600 flex items-center justify-center mb-2"> <Rating
                                    style={{ maxWidth: 100 }}
                                    value={review?.rating}
                                    readOnly
                                /> </h2>
                                <figcaption className="flex justify-center items-center space-x-3">
                                    <img className="w-9 h-9 rounded-full" src={review?.reviewerImg}></img>
                                    <div className="space-y-0.5 font-medium  text-left">
                                        <div>{review?.reviewer}</div>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}

                    </div>

                </section>

            </div>
        </Marquee>

    );
};

export default Testomonial;