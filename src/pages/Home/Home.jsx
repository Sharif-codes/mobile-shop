import Categories from "./Categories";
import ContactForm from "./ContactForm";
import Faq from "./Faq";
import FeaturedProducts from "./FeaturedProducts";
import Testomonial from "./Testomonial";


const Home = () => {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            <div className="my-10">
                <p className="font-extrabold flex justify-center mb-10 text-4xl">Featured Products</p>
                <FeaturedProducts></FeaturedProducts>
            </div>
            
            <div className="my-10">
                <Testomonial></Testomonial>
            </div>
            <div className="my-10">
            <p className="font-extrabold flex justify-center mb-10 text-4xl">Categories</p>
            <Categories></Categories>
            </div>
            <div className="my-10">
            <p className="font-extrabold flex justify-center mb-10 text-4xl">Contact</p>
            <ContactForm></ContactForm>
            </div>
            <div className="my-10">
                <p className="font-extrabold flex justify-center mb-10 text-4xl">FAQ</p>
                <Faq></Faq>
            </div>
        </div>
    );
};

export default Home;