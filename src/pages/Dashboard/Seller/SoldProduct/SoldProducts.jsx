import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Searchbar from "../../../../components/Searchbar";
import SortByPrice from "../../../../components/SortByPrice";
import SellerFilterProducts from "../../../../components/SellerFilterProducts";
import { TbFilter } from "react-icons/tb";
import Spinner from "../../../../components/spinner/spinner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import useUserData from "../../../../Hooks/useUserData";

const SoldProducts = () => {
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


    const user = useUserData()

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await axiosPublic.get(
                    `/soldProducts?name=${search}&page=${page}&limit=${15}&sort=${sort}&brand=${brand}&category=${category}&seller=${user?.email}`);
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
    }, [axiosPublic, brand, category, page, search, seller, sort, user?.email]);

    console.log("new:", products);

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
        window.location.reload()
    }

    return (
        <div className=" flex flex-col mt-1 lg:mt-2 md:mt-0">

            {/*  */}
            <div className=" h-12 md:h-16 grid md:flex md:justify-between lg:grid-cols-10 grid-cols-2 mx-2 px-2 md:px-4 bg-slate-100 rounded-t-lg text-sm md:text-lg font-semibold items-center">
                <div className="lg:col-span-3">
                    <p className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Sold Product</p>
                </div>
                <div className="col-span-1 lg:col-span-3 flex  ">
                    <Searchbar handleSearch={handleSearch} ></Searchbar>
                    <SortByPrice setSort={setSort}></SortByPrice>
                </div>
                <div className="lg:col-span-4 hidden md:hidden lg:flex justify-center">
                    <SellerFilterProducts
                        setBrand={setBrand}
                        setCategory={setCategory}
                        setSeller={setSeller}
                        handleReset={handleReset}
                        uniqueBrands={uniqueBrands}
                        uniqueCategory={uniqueCategory}
                    >
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
                        setSeller={setSeller}
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
                                products?.length <= 0 && <div className="w-full h-[calc(100vh-165px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-100px)] flex items-center justify-center">
                                    <p className="text-xl md:text-2xl lg:text-3xl font-bold  ">No product found!</p>
                                </div>
                            }
                            {products?.length > 0 &&
                                <div className="overflow-x-auto mt-1 h-[calc(100vh-225px)] md:h-[calc(100vh-236px)] lg:h-[calc(100vh-135px)]">
                                    <table className="table table-xs">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product</th>
                                                <th>Product name</th>

                                                <th>Date</th>
                                                <th>Buyer_Email</th>
                                                <th>Trx_id</th>

                                                <th>Price</th>
                                                <th>Brand</th>
                                            </tr>
                                        </thead>


                                        <tbody>



                                            {
                                                products?.length > 0 &&
                                                products?.map((item, idx) =>
                                                    <tr key={idx}>
                                                        <th>{(page - 1) * 15 + idx + 1}</th>
                                                        <td> <img src={item.photo_url} alt="product" width={20} height={15} /> </td>
                                                        <td>{item.name}</td>
                                                        <td>{item.purchased_time?.slice(0, 10)}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.trx_id}</td>


                                                        <td>{item.price}</td>
                                                        <td>{item.brand}</td>
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



            {
                products?.length > 0 &&
                <div className="flex justify-center items-center gap-2 my-1">
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

export default SoldProducts;