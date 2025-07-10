import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Searchbar from "../../../components/Searchbar";
import SortByPrice from "../../../components/SortByPrice";
import SellerFilterProducts from "../../../components/SellerFilterProducts";
import { Link } from "react-router-dom";
import { TbFilter } from "react-icons/tb";
import Spinner from "../../../components/spinner/spinner";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Review from "../../../components/Review";
import toast from "react-hot-toast";
import useGetBuyerReview from "../../../Hooks/useGetBuyerReview";
import { TiTick } from "react-icons/ti";
import useCart from "../../../Hooks/useCart";



const PurchasedProduct = () => {

    const axiosPublic = useAxiosPublic()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("asc")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [buyer, setBuyer] = useState("")
    const [uniqueBrands, setUniqueBrands] = useState([])
    const [uniqueCategory, setUniqueCategory] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [toggleFilter, setToggleFilter] = useState(1);
    

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [productToReview, setProductToReview] = useState(null);

    const { user } = useAuth()

    const token = localStorage.getItem('access-token')

    const [reviews, reviewLoading,refetch]= useGetBuyerReview();
    console.log("review: ", reviews);
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await axiosPublic.get(
                    `/getBuyerProducts?name=${search}&page=${page}&limit=${15}&sort=${sort}&brand=${brand}&category=${category}&buyer=${user?.email}`);

                setProducts(data.products || []);
                setUniqueBrands(data.brands || []);
                setUniqueCategory(data.categories || []);
                setTotalPages(Math.ceil(data.totalProducts / 15))

            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [axiosPublic, brand, category, page, search, buyer, sort, user?.email]);

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.search.value)
        e.target.search.value = "";
    }
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const handleReset = () => {
        console.log("Reset triggered");
        setSearch("");
        setBrand("");
        setCategory("");
        setSort("asc");
        setPage(1);
    }

    const openReviewModal = (product) => {
        setProductToReview(product);
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
        setProductToReview(null);
    };
    const handleReviewSubmission = async ({ productId, reviewer, reviewText, rating }) => {

        try {

            const reviewData = {
                productId,
                reviewer,
                reviewerEmail: user?.email,
                reviewText,
                rating: parseInt(rating),
                reviewedAt: new Date().toISOString(),

            };

            const res = await axiosPublic.post("/buyer-review", reviewData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if(res.data?.insertedId){
                toast.success("Review submitted successfully!");  
            }
            else{
                toast.error("Failed to submit review")
            }

            refetch()

        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review. Please try again.");
        } finally {
            closeReviewModal();
        }
    };

    return (
        <div className=" flex flex-col mt-1 lg:mt-2 md:mt-0">

            {/*  */}
            <div className=" h-12 md:h-16 grid md:flex md:justify-between lg:grid-cols-10 grid-cols-2 mx-2 px-2 md:px-4 bg-slate-100 rounded-t-lg text-sm md:text-lg font-semibold items-center mt-1">
                <div className="lg:col-span-3 ">
                    <p className="flex items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Purchased</p>
                </div>
                <div className="col-span-1 lg:col-span-3 flex">
                    <Searchbar handleSearch={handleSearch} ></Searchbar>
                    <SortByPrice setSort={setSort}></SortByPrice>
                </div>

                <div className="lg:col-span-4 hidden md:hidden lg:flex justify-center">
                    <SellerFilterProducts
                        setBrand={setBrand}
                        setCategory={setCategory}
                        setSeller={setBuyer}
                        handleReset={handleReset}
                        uniqueBrands={uniqueBrands}
                        uniqueCategory={uniqueCategory}>
                    </SellerFilterProducts>
                </div>
            </div>

            <div className="lg:hidden flex justify-start mx-4 gap-2 my-4 items-center h-4" >
                <button onClick={() => toggleFilter === 1 ? setToggleFilter(0) : setToggleFilter(1)} className="flex justify-center items-center">
                    <TbFilter size={16}></TbFilter>
                    <span className="text-md font-semibold">Filter</span>
                </button>
                <div className={`lg:hidden transition-all duration-300 ease-in-out transform origin-top ${toggleFilter === 1 ? 'scale-y-100 opacity-100 max-h-[1000px]' : 'scale-y-0 opacity-0 max-h-0 overflow-hidden'}`}>
                    <SellerFilterProducts
                        setBrand={setBrand}
                        setCategory={setCategory}
                        setSeller={setBuyer}
                        handleReset={handleReset}
                        uniqueBrands={uniqueBrands}
                        uniqueCategory={uniqueCategory}
                    />
                </div>

            </div>

            <div >
                {
                    loading ? (
                        <Spinner></Spinner>
                    ) : (
                        <div>
                            {
                                products?.length === 0 && <div className="w-full h-[calc(100vh-165px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-100px)] flex items-center justify-center">
                                    <p className="text-3xl font-bold">No product found</p>
                                </div>
                            }
                            {
                                products?.length > 0 &&
                                <div className="overflow-x-auto h-[calc(100vh-224px)] md:h-[calc(100vh-237px)] lg:h-[calc(100vh-147px)]">
                                    <table className="table table-xs">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product</th>
                                                <th>Product name</th>
                                                <th>Date</th>
                                                <th>Trx_id</th>
                                                <th>Price</th>
                                                <th>Seller</th>
                                                <th>Seller_Email</th>
                                                <th>Review</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {products?.length > 0 &&
                                                products?.map((item, idx) =>
                                                    <tr key={idx}>
                                                        <th>{(page - 1) * 15 + idx + 1}</th>
                                                        <td> <img src={item.photo_url} alt="product" width={20} height={15} /> </td>
                                                        <td>{item.name}</td>
                                                        <td>{item.purchased_time?.slice(0, 10)}</td>
                                                        <td>{item.trx_id}</td>
                                                        <td>{item.price}Tk.</td>
                                                        <td>{item.seller}</td>
                                                        <td>{item.sellerEmail}</td>


                                                        {
                                                        reviews.filter(review=> review.productId === item?.product_Id)[0] ?<p className=" my-1 flex justify-center items-center  "><TiTick className="text-xl text-green-700 text-center" /></p>:
                                                            <button
                                                            onClick={() => openReviewModal(item)} // Pass the product item to the handler
                                                            className="w-20 my-1 text-xs btn-sm btn hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 rounded-md border-0"
                                                        >
                                                            Review
                                                        </button>
                                                        }
                                                    </tr>
                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>
                            }

                        </div>

                    )
                }
            </div>

            {products?.length === 0 ? "" : <div className="flex justify-center items-center gap-2 my-1">
                <button className="btn  p-[15px] border rounded-full border-black" onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}>
                    <FaArrowLeft  ></FaArrowLeft>
                </button>
                <p>Page {page} of {totalPages}</p>
                <button className="btn p-[15px] border rounded-full border-black" onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}>
                    <FaArrowRight className="" ></FaArrowRight>
                </button>
            </div>}

            {isReviewModalOpen && productToReview && (
                <Review
                    isOpen={isReviewModalOpen}
                    onClose={closeReviewModal}
                    onSubmitReview={handleReviewSubmission}
                    product={productToReview}
                />
            )}
        </div>
    );
};

export default PurchasedProduct;