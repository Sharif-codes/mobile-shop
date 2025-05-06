import { Link } from "react-router-dom";
import Categories from "./Categories";
import ContactForm from "./ContactForm";
import Faq from "./Faq";
import FeaturedProducts from "./FeaturedProducts";
import Testomonial from "../../components/Testimonial/Testomonial";
import { useSelector } from "react-redux";
import Footer from "../../shared/footer/Footer";


const Home = () => {
    const theme = useSelector((state) => state.theme.value)
    return (
        <div data-theme={theme} className="md:space-y-12 space-y-4" >
            <div
                className="hero h-[300px] md:min-h-screen mx-auto"
                style={{
                    backgroundImage: "url(https://img.freepik.com/free-photo/realistic-phone-studio-social-media-concept_23-2151459542.jpg?t=st=1746103818~exp=1746107418~hmac=7177a97100c4c29ef3885eb8567bb259a01750d47e30d9903146ee00da16586e&w=996", borderRadius: "20px"
                }}>
                <div className=""></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-2 md:mb-5 text-xl md:text-3xl font-bold">Welcome to our shop</h1>
                        <p className="mb-2 md:mb-5 text-lg md:text-2xl">
                            One stop service for digital world!
                        </p>
                        <Link to="/products" > <button className="text-xs btn-sm btn hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 rounded-md border-0">Our Products</button></Link>
                    </div>
                </div>
            </div>
            <div className="">
                <p className="font-extrabold flex justify-center mb-4 md:mb-10 text-2xl md:text-4xl">Featured Products</p>
                <div className="flex justify-center">
                    <FeaturedProducts></FeaturedProducts>
                </div>

            </div>
            <div className="">
                <p className="font-extrabold flex justify-center mb-10 text-2xl md:text-4xl">Categories</p>
                <div className="flex justify-center">
                    <Categories></Categories>
                </div>

            </div>
            <div className="">
                <div className="mx-auto max-w-sm ">
                    <h2 className="tracking-tight font-extrabold text-center mb-1 md:mb-10 text-2xl md:text-4xl ">Testimonials</h2>
                    <p className=" font-light text-gray-500 lg:mb-10 sm:text-xl dark:text-gray-400 text-center">What our client says about us!</p>
                </div>
                <Testomonial></Testomonial>
            </div>
            <div className="">
                <p className="font-extrabold flex justify-center mb-2 md:mb-10 text-2xl md:text-4xl">Contact</p>
                <ContactForm></ContactForm>
            </div>
            <div className="">
            <p className="font-extrabold flex justify-center mb-2 md:mb-10 text-2xl md:text-4xl">FAQs</p>
                <Faq></Faq>
            </div>
        </div>
    );
};

export default Home;