import { Card, Text } from "@mantine/core";
import { motion, useInView } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import { useRef, useState } from "react";
import imageOne from "../../assets/homecard1.png";
import imageTwo from "../../assets/homecard2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthModal from "../../Components/AuthModal";

const data = [
    {
        title: "Looking for a new home?",
        description: "10 new offers every day. 350 offers on site, trusted by a community of thousands of users.",
        buttonText: "Get Started",
        image: imageOne,
        direction: "left",
        path: '/properties'
    },
    {
        title: "Want to sell your home?",
        description: "10 new offers every day. 350 offers on site, trusted by a community of thousands of users.",
        buttonText: "Get Started",
        image: imageTwo,
        direction: "right",
        path: "/sell"
    },
];

const HomeCards = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleClick = (path) => () => {
        if ((!isAuthenticated || !user) && path === '/sell') {
            setIsModalOpen(true);
            return;
        }
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center gap-8  !overflow-x-hidden lg:gap-20 items-center py-10 mt-8  px-4">
                {data?.map((item, index) => {

                    return (
                        <motion.div
                            key={index}
                            ref={ref}
                            initial={{ opacity: 0, x: item.direction === "left" ? -100 : 100 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeInOut" }}
                            whileHover={{ scale: 1.05 }}
                            className="!w-full md:!w-[600px]"
                        >
                            <div
                                className={`!rounded-2xl !shadow-sm ${
                                    index !== 1 ? "!bg-[#F9F9F9]" : "!bg-[#FFF8F6]"
                                } !flex !flex-col-reverse max-sm:gap-4 sm:!flex-row !justify-between !items-center !p-6 !cursor-pointer`}
                            >
                                <div className="flex flex-col gap-4 max-w-1/2">
                                    <Text className="!text-lg !font-bold !leading-snug">{item?.title}</Text>
                                    <Text className="!text-base !text-gray-800 !leading-relaxed">{item?.description}</Text>
                                    <motion.button 
                                        className="!bg-main hover:!bg-hover !text-white !rounded-2xl !py-3 !px-6 !flex !justify-center !items-center 
                                            !gap-1.5 !w-fit !transition-all !duration-700 !ease-in-out !shadow-lg hover:!shadow-2xl"
                                        whileHover={{ scale: 1.05 }}
                                        onClick={handleClick(item?.path)}
                                    >
                                        {item?.buttonText}
                                        <GoArrowRight size={20} className="mt-1" />
                                    </motion.button>
                                </div>
                                <img src={item?.image} alt="House" className="w-32 h-32 object-contain" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <AuthModal 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                value="sell"
            />

        </>
    );
};

export default HomeCards;
