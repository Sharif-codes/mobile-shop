import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";

const Testomonial = () => {
    const theme = useSelector((state) => state.theme.value)
    // const sliders= [
    //     {
    //         id: "slider1",
    //         images:[]
    //     }
    // ]
    return (
        <Marquee>
            <div data-theme={theme} >
                <section className="">
                    <div className=" mx-auto text-center">

                        <div className={`inline-flex gap-4 ${theme==='dark'? 'text-black':'text-base'}`}>

                            <figure className="flex flex-col justify-center items-center p-8 text-center   md:p-12 w-[300px] md:w-[400px]  rounded-xl bg-gradient-to-r from-secondary 
               to-accent">
                                <blockquote className="mx-auto mb-8 max-w-2xl ">
                                    <h3 className="text-lg font-semibold ">"Nice Service to get update product"</h3>
                                </blockquote>
                                <figcaption className="flex justify-center items-center space-x-3">
                                    <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture"></img>
                                    <div className="space-y-0.5 font-medium  text-left">
                                        <div>Roberta Casas</div>
                                        <div className="text-sm font-light ">Teacher</div>
                                    </div>
                                </figcaption>
                            </figure>
                            <figure className="flex flex-col justify-center items-center p-8 text-center   bg-gradient-to-r from-secondary
               to-accent rounded-xl md:p-12 w-[300px] md:w-[400px] ">
                                <blockquote className="mx-auto mb-8 max-w-2xl ">
                                    <h3 className="text-lg font-semibold ">"Nice Service to get update product"</h3>
                                </blockquote>
                                <figcaption className="flex justify-center items-center space-x-3">
                                    <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture"></img>
                                    <div className="space-y-0.5 font-medium text-left">
                                        <div>Roberta Casas</div>
                                        <div className="text-sm font-light">Teacher</div>
                                    </div>
                                </figcaption>
                            </figure>
                            <figure className="flex flex-col justify-center items-center p-8 text-center  md:p-12 bg-gradient-to-r from-secondary
               to-accent rounded-xl w-[300px] md:w-[400px] ">
                                <blockquote className="mx-auto mb-8 max-w-2xl ">
                                    <h3 className="text-lg font-semibold ">Mindblowing workflow and variants</h3>
                                </blockquote>
                                <figcaption className="flex justify-center items-center space-x-3">
                                    <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile picture"></img>
                                    <div className="space-y-0.5 font-medium text-left">
                                        <div>Jese Leos</div>
                                        <div className="text-sm font-light ">Software Engineer</div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </section>

            </div>
        </Marquee>

    );
};

export default Testomonial;