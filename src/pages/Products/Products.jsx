import { useEffect, useState } from "react";
import FilterBar from "../../components/FilterBar";
import Searchbar from "../../components/Searchbar";
import SortByPrice from "../../components/SortByPrice";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Spinner from "../../components/spinner/spinner";
import ProductCard from "../../components/ProductCard/ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


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
    const [page,setPage]= useState(1);
    const [totalPages,setTotalPages]= useState(1);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await axiosPublic.get(
                    `/allProducts?name=${search}&page=${page}&$limit=${9}&sort=${sort}&brand=${brand}&category=${category}&seller=${seller}`
                );
                console.log("API Response:", data);
                setProducts(data.products || []);
                setUniqueBrands(data.brands || []);
                setUniqueCategory(data.categories || []);
                setTotalPages(Math.ceil(data.totalProducts/6))
                setUniqueSeller(data.sellers || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [axiosPublic, brand, category, page, search, seller, sort]);

    console.log("all product:", products);

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

    const handlePageChange = (newPage)=>{
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({top:0, behavior:"smooth"})
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl my-6 font-semibold text-center">All Products</h1>
            <div className="lg: flex justify-between items-center w-full">
                <Searchbar handleSearch={handleSearch} ></Searchbar>
                <SortByPrice setSort={setSort}></SortByPrice>
            </div>
            {/* content */}
            <div className="grid grid-cols-12 gap-2 mt-2">
                <div className="col-span-5 lg:col-span-2 md:col-span-3 ">
                    <FilterBar setBrand={setBrand} setCategory={setCategory} setSeller={setSeller} handleReset={handleReset} uniqueBrands={uniqueBrands}
                        uniqueCategory={uniqueCategory} uniqueSeller={uniqueSeller}>
                    </FilterBar>
                </div>
                <div className="col-span-7 lg:col-span-10 md:col-span-9">
                    {
                        loading ? (
                            <Spinner></Spinner>
                        ) : (
                            <>
                                {
                                    products?.length === 0 ? (<div className="w-full h-full flex items-center justify-center">
                                        <h1 className="text-3xl font-bold">No product found</h1>
                                    </div>) : (<div className=" grid grid-cols-1 md:grid-cols-3 gap-2">
                                        {
                                            products?.map(item =>
                                                <ProductCard key={item?.objectId} product={item}></ProductCard>
                                            )
                                        }
                                    </div>)
                                }
                            </>
                        )
                    }
                     {/* pagination */}
                <div className="flex justify-center items-center gap-2 my-8">
                    <button className="btn  p-2 border rounded-full border-black" onClick={()=> handlePageChange(page-1)}
                        
                        disabled={page===1}>
                        <FaArrowLeft  ></FaArrowLeft>
                    </button>
                    <p>Page {page} of {totalPages}</p>
                    <button className="btn p-2 border rounded-full border-black" onClick={()=> handlePageChange(page+1)}
                        disabled={page===totalPages}>
                        <FaArrowRight ></FaArrowRight>
                    </button>

                </div>
                </div>
               
            </div>
        </div>
    );
};

export default Products;