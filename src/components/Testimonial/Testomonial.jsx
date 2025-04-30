import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import './ZigZag.css';

const Testomonial = () => {
    const theme = useSelector((state) => state.theme.value)
    const testimonials = [
        {
            title: '"Nice Service to get update product"',
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
            name: "Roberta Casas"
        },
        {
            title: '"Nice Service to get update product"',
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
            name: "Roberta Casas"
        },
        {
            title: '"Nice Service to get update product"',
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
            name: "Roberta Casas"
        },
        {
            title: '"Nice Service to get update product"',
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
            name: "Roberta Casas"
        },
        {
            title: '"Nice Service to get update product"',
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
            name: "Roberta Casas"
        },

    ]

    return (
        <Marquee pauseOnHover speed={10} >
            <div data-theme={theme} >

                <section className="">
                    <div className={`items-center h-60 inline-flex gap-4 ${theme === 'dark' ? 'text-black' : 'text-base'}`}>

                        {testimonials.map((testimonial, idx) => (
                            <figure key={idx} style={{ animationDelay: `${idx * 2}s` }} className="testimonial-item flex flex-col justify-center items-center p-4 text-center w-[300px] h-[150px]  rounded-xl bg-gradient-to-r from-secondary 
                        to-accent">
                                <blockquote className="mx-auto mb-4 max-w-2xl ">
                                    <h3 className="text-lg font-semibold ">{testimonial.title}</h3>
                                </blockquote>
                                <figcaption className="flex justify-center items-center space-x-3">
                                    <img className="w-9 h-9 rounded-full" src={testimonial.image}></img>
                                    <div className="space-y-0.5 font-medium  text-left">
                                        <div>{testimonial.name}</div>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}

                    </div>

                </section>

            </div>
        </Marquee>

    );
};

export default Testomonial;