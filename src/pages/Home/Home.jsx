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
        <div data-theme={theme} >
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
            <div className="my-10">
                <p className="font-extrabold flex justify-center mb-10 text-4xl">Featured Products</p>
                <div className="flex justify-center">
                    <FeaturedProducts></FeaturedProducts>
                </div>

            </div>

            <div className="my-10">
                <Testomonial></Testomonial>
            </div>
            <div className="my-10">
                <p className="font-extrabold flex justify-center mb-10 text-4xl">Categories</p>
                <div className="flex justify-center">
                    <Categories></Categories>
                </div>
                
            </div>
            <div className="my-10">
                <p className="font-extrabold flex justify-center mb-10 text-4xl">Contact</p>
                <ContactForm></ContactForm>
            </div>
            <div className="my-10">
                <Faq></Faq>
            </div>
            {/* footer section */}
            <Footer></Footer>
        </div>
    );
};

export default Home;