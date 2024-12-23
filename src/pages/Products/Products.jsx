import { useEffect, useState } from "react";
import FilterBar from "../../components/FilterBar";
import Searchbar from "../../components/Searchbar";
import SortByPrice from "../../components/SortByPrice";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Spinner from "../../components/spinner/spinner";
import ProductCard from "../../components/ProductCard/ProductCard";


const Products = () => {
    const axiosPublic = useAxiosPublic()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("asc")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")

    const [uniqueBrands, setUniqueBrands] = useState([])
    const [uniqueCategory, setUniqueCategory] = useState([])

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await axiosPublic.get(
                    `/allProducts?name=${search}&sort=${sort}&brand=${brand}&category=${category}`
                );
                console.log("API Response:", data);
                setProducts(data.products || []);
                setUniqueBrands(data.brands || []);
                setUniqueCategory(data.categories || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [axiosPublic, brand, category, search, sort]);

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


    return (
        <div className="container mx-auto">
            <h1 className="text-2xl my-6 font-semibold text-center">All Products</h1>
            <div className="lg: flex justify-between items-center w-full">
                <Searchbar handleSearch={handleSearch} ></Searchbar>
                <SortByPrice setSort={setSort}></SortByPrice>
            </div>
            {/* content */}
            <div className="grid grid-cols-12 gap-2 mt-2">
                <div className="col-span-2">
                    <FilterBar setBrand={setBrand} setCategory={setCategory} handleReset={handleReset} uniqueBrands={uniqueBrands}
                        uniqueCategory={uniqueCategory}></FilterBar>
                </div>
                <div className="col-span-10">
                    {
                        loading ? (
                            <Spinner></Spinner>
                        ) : (
                            <>
                                {
                                    products?.length === 0 ? (<div className="w-full h-full flex items-center justify-center">
                                        <h1 className="text-3xl font-bold">No product found</h1>
                                    </div>) : (<div className=" grid grid-cols-3 gap-2">
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
                </div>
            </div>
        </div>
    );
};

export default Products;