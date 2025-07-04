import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

const DashboardHome = () => {
    const [typingStatus, setTypingStatus] = useState('Initializing');
    return (
        <div className="flex justify-center items-center  h-[calc(100vh-80px)] md:h-screen lg:h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            <TypeAnimation
                        className="mb-2 md:mb-5 text-xl md:text-4xl font-bold"
                            sequence={[
                                1500,
                                () => {
                                    setTypingStatus('Typing...');
                                },
                                'Welcome to the Dashboard!',
                                () => {
                                    setTypingStatus('Done Typing');
                                },
                                1000,
                                () => {
                                    setTypingStatus('Deleting...');
                                },
                                'DigiStore',
                                () => {
                                    setTypingStatus('Done Deleting');
                                },
                            ]}
                            repeat={Infinity}
                        />
           {/* <div className="text-2xl md:text-3xl font-bold border p-2 animate-bounce mx-auto "> Welcome to the Dashboard!</div> */}
        </div>
    );
};

export default DashboardHome;