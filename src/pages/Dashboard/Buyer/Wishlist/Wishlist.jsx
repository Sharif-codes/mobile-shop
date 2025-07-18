
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import Spinner from "../../../../components/spinner/spinner";
import SellerFilterProducts from "../../../../components/SellerFilterProducts";
import { TbFilter } from "react-icons/tb";
import { Link } from "react-router-dom";
import SortByPrice from "../../../../components/SortByPrice";
import Searchbar from "../../../../components/Searchbar";
import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";




const Wishlist = () => {
    const axiosPublic = useAxiosPublic()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("asc")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [seller, setSeller] = useState("")
    const [uniqueBrands, setUniqueBrands] = useState([])
    const [uniqueCategory, setUniqueCategory] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [toggleFilter, setToggleFilter] = useState(1);

    const { user } = useAuth()
const token = localStorage.getItem('access-token')
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await axiosPublic.get(
                    `/getWishlistProducts?name=${search}&page=${page}&$limit=${8}&sort=${sort}&brand=${brand}&category=${category}&buyerEmail=${user?.email}`,{
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

                console.log("API Response:", data);
                setProducts(data.products || []);
                setUniqueBrands(data.brands || []);
                setUniqueCategory(data.categories || []);
                setTotalPages(Math.ceil(data.totalProducts / 8))

            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [axiosPublic, brand, category, page, search, sort, token, user?.email]);

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

    return (
        <div className=" flex flex-col mt-0 lg:mt-2 md:mt-0 lg:h-[calc(100vh-8px)] md:h-full h-full">

            {/*  */}
            <div className=" h-12 lg:h-16 md:h-24  grid md:flex md:justify-between lg:grid-cols-9 grid-cols-2 mx-4 px-2 md:px-4 bg-slate-100 rounded-t-lg text-sm md:text-lg font-semibold mt-1">
                <div className="col-span-1 md:col-span-3 flex gap-2">
                    <Searchbar handleSearch={handleSearch} ></Searchbar>
                    <SortByPrice setSort={setSort}></SortByPrice>
                </div>
                <div className="lg:col-span-3 hidden lg:flex justify-center">
                    <SellerFilterProducts
                        setBrand={setBrand}
                        setCategory={setCategory}
                        setSeller={setSeller}
                        handleReset={handleReset}
                        uniqueBrands={uniqueBrands}
                        uniqueCategory={uniqueCategory}>
                    </SellerFilterProducts>
                </div>


                <div className="col-span-1 md:col-span-3 flex justify-end items-center">
                    <Link to="/dashboard/addWishlist">
                        <button className="flex justify-center items-center hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text hover:text-transparent "> <span className="">+</span> <span>Add to wishlist</span></button>
                    </Link>
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
                        setSeller={setSeller}
                        handleReset={handleReset}
                        uniqueBrands={uniqueBrands}
                        uniqueCategory={uniqueCategory}
                    />
                </div>

            </div>

            <div className="h-full lg:h-[calc(100vh-160px)]">
                {
                    loading ? (
                        <Spinner></Spinner>
                    ) : (
                        <div>
                            {
                                products?.length === 0 && <div className="w-full h-[calc(100vh-165px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-120px)]   flex items-center justify-center">
                                    <p className="text-xl md:text-2xl lg:text-3xl font-bold  ">No product found!</p>
                                </div>
                            }
                            {products?.length > 0 &&
                                <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 ">
                                    {
                                        products?.map(item =>
                                            <ProductCard key={item?.objectId} product={item}></ProductCard>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    )
                }
            </div>

            {
                products?.length > 0 &&
                <div className="flex justify-center items-center gap-2 my-4">
                    <button className="btn  p-[15px] border rounded-full border-black" onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}>
                        <FaArrowLeft  ></FaArrowLeft>
                    </button>
                    <p>Page {page} of {totalPages}</p>
                    <button className="btn p-[15px] border rounded-full border-black" onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}>
                        <FaArrowRight className="" ></FaArrowRight>
                    </button>
                </div>
            }

        </div>
    );
};

export default Wishlist;