import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/spinner/spinner";
import useAllProducts from "../../../Hooks/useAllProducts";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Products from "../../Products/Products";
import useAuth from "../../../Hooks/useAuth";
import Searchbar from "../../../components/Searchbar";
import SortByPrice from "../../../components/SortByPrice";
import SellerFilterProducts from "../../../components/SellerFilterProducts";
import { Link } from "react-router-dom";
import { TbFilter } from "react-icons/tb";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const AllProducts = () => {
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
    const [uniqueSeller, setUniqueSeller] = useState([])



    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await axiosPublic.get(
                    `/allProducts?name=${search}&page=${page}&limit=${15}&sort=${sort}&brand=${brand}&category=${category}&seller=${seller}`);

                setProducts(data.products || []);
                setUniqueBrands(data.brands || []);
                setUniqueCategory(data.categories || []);
                setTotalPages(Math.ceil(data.totalProducts /15))
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
            <div className=" h-12 md:h-16 grid md:grid-cols-10 grid-cols-2 mx-4 px-2 md:px-4 bg-slate-100 rounded-t-lg text-sm md:text-lg font-semibold">
                <div className="col-span-1 md:col-span-3 flex  ">
                    <Searchbar handleSearch={handleSearch} ></Searchbar>
                    <SortByPrice setSort={setSort}></SortByPrice>
                </div>
                <div className="col-span-4 hidden md:flex justify-center">
                    <SellerFilterProducts
                        setBrand={setBrand}
                        setCategory={setCategory}
                        setSeller={setSeller}
                        handleReset={handleReset}
                        uniqueBrands={uniqueBrands}
                        uniqueCategory={uniqueCategory}
                        uniqueSeller={uniqueSeller}>
                    </SellerFilterProducts>
                </div>


                <div className="col-span-1 md:col-span-3 flex justify-end items-center">

                </div>

            </div>

            <div className="md:hidden flex justify-start mx-2 gap-2 my-1 items-center h-4" >
                <button onClick={() => toggleFilter === 1 ? setToggleFilter(0) : setToggleFilter(1)} className="flex justify-center items-center">
                    <TbFilter size={16}></TbFilter>
                    <span className="text-md font-semibold">Filter</span>
                </button>
                <div className={`md:hidden transition-all duration-300 ease-in-out transform origin-top ${toggleFilter === 1 ? 'scale-y-100 opacity-100 max-h-[1000px]' : 'scale-y-0 opacity-0 max-h-0 overflow-hidden'}`}>
                    <SellerFilterProducts
                        setBrand={setBrand}
                        setCategory={setCategory}
                        setSeller={setSeller}
                        handleReset={handleReset}
                        uniqueBrands={uniqueBrands}
                        uniqueCategory={uniqueCategory}
                        uniqueSeller={uniqueSeller}
                    />
                </div>

            </div>

            <div >
                {
                    loading ? (
                        <Spinner></Spinner>
                    ) : (
                        <div className="overflow-x-auto mt-1 h-[calc(100vh-265px)] md:h-[calc(100vh-190px)]">
                            <table className="table table-xs">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Product name</th>
                                        <th>Category</th>
                                        <th>Seller</th>
                                        <th>Brand</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        products?.length === 0 ? (<div className="w-full h-screen flex items-center justify-center">
                                            <p className="text-3xl font-bold">No product found</p>
                                        </div>) : (
                                            <>
                                                {
                                                products?.map((item,idx) =>
                                                    <tr key={idx}>
                                                        <th>{(page - 1) * 15 + idx + 1}</th>
                                                        <td> <img src={item.photo_url} alt="product" width={20} height={15} /> </td>
                                                        <td>{item.name}</td>
                                                        <td>{item.category}</td>
                                                        <td>{item.seller}</td>
                                                        <td>{item.brand}</td>
                                                        <td>{item.price}</td>
                                                    </tr>
                                                )
                                            }
                                            </>
                                        
                                       )
                                    }


                                </tbody>

                            </table>
                        </div>
                    )
                }
            </div>

            {products?.length === 0 ? "" : <div className="flex justify-center items-center gap-2 my-8">
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
        </div>
    );
};

export default AllProducts;