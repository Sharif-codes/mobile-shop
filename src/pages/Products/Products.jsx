import { useEffect, useState } from "react";
import FilterBar from "../../components/FilterBar";
import Searchbar from "../../components/Searchbar";
import SortByPrice from "../../components/SortByPrice";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Spinner from "../../components/spinner/spinner";
import ProductCard from "../../components/ProductCard/ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TbFilter } from "react-icons/tb";

const Products = () => {

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
    const [uniqueSeller, setUniqueSeller] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [toggleFilter, setToggleFilter] = useState(1);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await axiosPublic.get(
                    `/allProducts?name=${search}&page=${page}&limit=${8}&sort=${sort}&brand=${brand}&category=${category}&seller=${seller}`);

                console.log("API Response:", data);
                setProducts(data.products || []);
                setUniqueBrands(data.brands || []);
                setUniqueCategory(data.categories || []);
                setTotalPages(Math.ceil(data.totalProducts / 8))
                setUniqueSeller(data.sellers || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [axiosPublic, brand, category, page, search, seller, sort]);

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.search.value)
        e.target.search.value = "";
    }

    const handleReset = () => {
        setSearch("")
        setBrand("")
        setCategory("")
        setSort("asc")
        window.location.reload()
    }

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return (
        <div className="mx-auto ">

            <div className="h-16 md:h-16 flex justify-between md:grid grid-cols-9 px-2 md:px-4 bg-slate-100 rounded-t-lg text-sm md:text-lg font-semibold ">
                <div className="col-span-2 flex text-2xl items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">
                    <p >Products</p>
                </div>
                <div className="md:col-span-7 flex justify-end items-center gap-4">
                    <SortByPrice setSort={setSort}></SortByPrice>
                    <Searchbar handleSearch={handleSearch} ></Searchbar>
                </div>
            </div>

            <div className="md:hidden flex justify-center my-2 items-center" onClick={() => toggleFilter === 1 ? setToggleFilter(0) : setToggleFilter(1)}>
                <TbFilter size={24}></TbFilter><span className="text-xl font-semibold">Filter</span>
            </div>

            <div className={`md:hidden ${toggleFilter === 1 ? 'block' : 'hidden'}`}>
                <FilterBar
                    setBrand={setBrand}
                    setCategory={setCategory}
                    setSeller={setSeller}
                    handleReset={handleReset}
                    uniqueBrands={uniqueBrands}
                    uniqueCategory={uniqueCategory}
                    uniqueSeller={uniqueSeller}>
                </FilterBar>
            </div>
            {/* content */}
            <div className="grid grid-cols-12 gap-2 mt-2">
                <div className="hidden md:block col-span-5 lg:col-span-2 md:col-span-3 ">
                    <FilterBar
                        setBrand={setBrand}
                        setCategory={setCategory}
                        setSeller={setSeller}
                        handleReset={handleReset}
                        uniqueBrands={uniqueBrands}
                        uniqueCategory={uniqueCategory}
                        uniqueSeller={uniqueSeller}>
                    </FilterBar>
                </div>

                <div className="col-span-12 lg:col-span-10 md:col-span-9 mx-auto">
                    {
                        loading ? (
                            <Spinner></Spinner>
                        ) : (
                            <div className="h-[calc(100vh-100px)]">
                                {
                                    products?.length === 0 ? (<div className="w-full h-[calc(100vh-300px)] flex items-center justify-center">
                                        <p className="text-3xl font-bold">No product found</p>
                                    </div>) : (<div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 ">
                                        {
                                            products?.map(item =>
                                                <ProductCard key={item?.objectId} product={item}></ProductCard>
                                            )
                                        }
                                    </div>)
                                }
                            </div>
                        )
                    }

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
            </div>
        </div>
    );
};

export default Products;