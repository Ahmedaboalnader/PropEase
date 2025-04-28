import React, { useRef } from 'react';
import image from '../../assets/realestate.png';
import { motion, useInView } from "framer-motion";
import { Image } from "@mantine/core";
import { useNavigate } from 'react-router-dom';

const RealEstateHero = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });
    const handleNavigation = (path) => {
        window.scrollTo(0, 0);
        navigate(path);
    };
    return (
        <motion.div 
            ref={sectionRef} className="bg-main rounded-md lg:rounded-2xl max-lg:px-4 !overflow-x-hidden
                p-8 md:py-8 md:px-18 h-[70vh] lg:h-[50vh] flex flex-col md:flex-row items-start 
                justify-between gap-8 mb-4 lg:mb-20 mx-1 lg:mx-4"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Left Content */}
            <motion.div 
                className="text-white flex flex-col gap-4 lg:gap-12 max-w-lg"
                initial={{ opacity: 0, x: -100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
                whileInView={{ opacity: 1, x: 0 }}
            >
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                    Find your best <br /> Real Estate
                </h1>
                <p className="text-gray-200 text-sm lg:text-base md:text-lg leading-relaxed">
                    We provide a complete service for the sale, <br />
                    purchase or rental of real estate.
                </p>

                <motion.button
                    onClick={() => handleNavigation('/contact')}
                    radius="md"
                    size="md"
                    className="bg-yellowCustom text-white rounded-2xl font-semibold w-fit px-20 py-3 uppercase tracking-widest 
                                transition-all duration-1000 ease-in-out 
                                hover:bg-white hover:text-yellowCustom border border-transparent hover:border-yellowCustom
                                shadow-md hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                >
                    Contact Us
                </motion.button>
            </motion.div>

            {/* Right Image */}
            <motion.div 
                className="w-full h-full md:w-[40%] overflow-hidden"
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileInView={{ opacity: 1, x: 0 }}
            >
                <Image 
                    src={image}
                    alt="Real Estate"
                    className="object-cover w-full h-full !rounded-md lg:!rounded-xl shadow-lg transition-transform duration-500 ease-in-out hover:scale-125 "
                />
            </motion.div>
        </motion.div>
    );
};

export default RealEstateHero
