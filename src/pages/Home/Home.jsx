import { Link } from "react-router-dom";
import Categories from "./Categories";
import ContactForm from "./ContactForm";
import Faq from "./Faq";
import FeaturedProducts from "./FeaturedProducts";
import Testomonial from "./Testomonial";
import { useSelector } from "react-redux";
import Footer from "../../shared/footer/Footer";


const Home = () => {
    const theme = useSelector((state) => state.theme.value)
    return (
        <div data-theme={theme} className="md:space-y-12 space-y-4" >
            <div
                className="hero min-h-screen mx-auto"
                style={{
                    backgroundImage: "url(https://img.freepik.com/premium-vector/hand-holding-mobile-smart-phone-with-shop-app-fashion-items-online-shopping-concept_3482-7693.jpg", borderRadius: "20px"
                }}>
                <div className=""></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-3xl font-bold">Welcome to our shop</h1>
                        <p className="mb-5 text-2xl">
                            One stop service for digital world!
                        </p>
                        <Link to="/products" className="btn btn-primary rounded-md">Our Products</Link>
                    </div>
                </div>
            </div>
            <div className="">
                <p className="font-extrabold flex justify-center mb-10 text-4xl">Featured Products</p>
                <div className="flex justify-center">
                    <FeaturedProducts></FeaturedProducts>
                </div>

            </div>

            <div className="">
                <div className="mx-auto max-w-sm ">
                    <h2 className=" text-4xl tracking-tight font-extrabold text-center ">Testimonials</h2>
                    <p className=" font-light text-gray-500 lg:mb-10 sm:text-xl dark:text-gray-400 text-center">What our client says about us!</p>
                </div>
                <Testomonial></Testomonial>
            </div>
            <div className="">
                <p className="font-extrabold flex justify-center mb-10 text-4xl">Categories</p>
                <div className="flex justify-center">
                    <Categories></Categories>
                </div>

            </div>
            <div className="">
                <p className="font-extrabold flex justify-center mb-10 text-4xl">Contact</p>
                <ContactForm></ContactForm>
            </div>
            <div className="">
                <Faq></Faq>
            </div>
        </div>
    );
};

export default Home;