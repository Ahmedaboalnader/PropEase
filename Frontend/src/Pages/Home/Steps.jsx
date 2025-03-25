import React from "react";
import { Card, Text } from "@mantine/core";
import { motion } from "framer-motion";
import stepOne from "../../assets/step1.png";
import stepTwo from "../../assets/step2.png";
import stepThree from "../../assets/step3.png";


const Steps = () => {
    const steps = [
        {
            id: 1,
            title: "Search for your favorite house in your location",
            image: stepOne,
            animation: { x: -100, opacity: 0 }, 
        },
        {
            id: 2,
            title: "Make a visit appointment with one of our agents",
            image: stepTwo,
            animation: { y: 100, opacity: 0 }, 
        },
        {
            id: 3,
            title: "Get your dream house in a month, or less",
            image: stepThree,
            animation: { x: 100, opacity: 0 }, 
        },
    ];

    return (
        <section className="py-20 px-4 lg:px-32 mx-auto bg-white w-full flex flex-col justify-center items-center gap-4 lg:gap-24  !overflow-x-hidden">
            {/* Title */}
            <motion.h2
                className="text-center text-2xl md:text-4xl font-semibold text-gray-800"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                Find Your Dream House as Easy as 1, 2, 3
            </motion.h2>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        initial={step.animation}
                        whileInView={{ x: 0, y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.3,
                            ease: "easeInOut",
                        }}
                        viewport={{ once: true }}
                    >
                        <Card
                            shadow="md"
                            padding="lg"
                            radius="md"
                            className="flex flex-col items-center text-center border-0"
                        >
                            <img
                                src={step.image}
                                alt={`Step ${step.id}`}
                                className="w-32 h-32 object-contain mb-4 transition-all duration-800 border border-transparent 
                            hover:scale-110 hover:shadow-xl hover:bg-[#F9F9F9] p-2 rounded-lg"
                            />
                            <Text className="!font-semibold !text-main !text-lg !px-12">
                                {step.id}. {step.title}
                            </Text>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Steps;

