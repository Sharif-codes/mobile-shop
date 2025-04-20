import { useSelector } from "react-redux";

const Testomonial = () => {
    const theme = useSelector((state) => state.theme.value)
    return (
        <div data-theme={theme} >
            <section className="">
                <div className=" px-4 mx-auto max-w-screen-xl text-center lg:px-6">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className=" text-4xl tracking-tight font-extrabold ">Testimonials</h2>
                        <p className=" font-light text-gray-500 lg:mb-10 sm:text-xl dark:text-gray-400">What our client says about us!</p>
                    </div>
                    <div className="grid lg:grid-cols-3">
                        
                        <figure className="flex flex-col justify-center items-center p-8 text-center bg-neutral border-primary sm:border-b md:border-b-0 md:border-r md:p-12 ">
                            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">"Nice Service to get update product"</h3>
                            </blockquote>
                            <figcaption className="flex justify-center items-center space-x-3">
                                <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture"></img>
                                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                                        <div>Roberta Casas</div>
                                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Teacher</div>
                                    </div>
                            </figcaption>
                        </figure>
                        <figure className="flex flex-col justify-center items-center p-8 text-center bg-neutral md:p-12 border-primary sm:border-b md:border-b-0 md:border-r ">
                            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mindblowing workflow and variants</h3>
                            </blockquote>
                            <figcaption className="flex justify-center items-center space-x-3">
                                <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile picture"></img>
                                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                                        <div>Jese Leos</div>
                                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Software Engineer</div>
                                    </div>
                            </figcaption>
                        </figure>
                        <figure className="flex flex-col justify-center items-center p-8 text-center bg-neutral border-gray-200 md:p-12  dark:border-gray-700">
                            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Efficient Collaborating</h3>
                            </blockquote>
                            <figcaption className="flex justify-center items-center space-x-3">
                                <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="profile picture"></img>
                                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                                        <div>Joseph McFall</div>
                                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Writer, Author</div>
                                    </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Testomonial;