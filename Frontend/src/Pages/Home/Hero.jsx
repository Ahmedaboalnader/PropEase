import React from "react";
import { TextInput, Button } from "@mantine/core";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// Import images
import Image1 from "../../assets/image4.jpg";
import Image2 from "../../assets/imageOne.png";
import Image3 from "../../assets/image3.jpg";
import Image4 from "../../assets/heroo.svg";

const propertyFilters = ["All Properties", "For Sale", "For Rent", "For Sell"];

const Hero = () => {
    const words = ["Find", "Your", "Perfect", "Home"];

    return (
        <div className="relative h-[90vh] border-b-[15px] border-main overflow-hidden ">

            {/* Swiper Background */}
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={1200}
                loop
                className="absolute inset-0 w-full h-full"
            >
                {[Image1, Image2, Image3, Image4].map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="absolute inset-0">
                            <img
                                src={img}
                                alt={`slide-${index}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Fixed Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
                {/* Headline */}
                <motion.h1 className="text-3xl md:text-6xl font-semibold text-white text-center flex gap-2 mt-40 mb-8">
                    {words.map((word, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.3, duration: 0.4 }}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Search Bar */}
                <div className="w-full max-w-lg relative">
                    <TextInput
                        placeholder="Enter keywords..."
                        classNames={{
                        root: "w-full !outline-none",
                        input: "!rounded-full !h-12 !pr-12 !shadow-md !w-full ",
                        }}
                        rightSectionWidth={54} 
                        rightSection={
                        <Button
                            className="!h-10 !w-10 !p-0 !rounded-full !bg-yellow-500 !absolute !right-1 !top-1/2 !transform !-translate-y-1/2"
                            type="submit"
                        >
                            <FiSearch size={18} className="!text-white" />
                        </Button>
                        }
                    />
                </div>

                {/* Property Filters */}
                <div className="flex gap-3 flex-col mt-20">
                    <h2 className="text-lg md:text-xl font-semibold text-white text-center">
                        Explore all things property
                    </h2>
                    <div className="flex gap-4">
                        {propertyFilters?.map((filter) => (
                            <Button
                                key={filter}
                                variant="outline"
                                className="!rounded-lg !border-transparent !bg-white !text-main !min-w-fit !px-3 !py-1 
                                            hover:!text-white hover:!bg-main !transition !duration-1000 !shadow-md hover:!shadow-lg"
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
