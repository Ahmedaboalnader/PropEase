import { HiCheck } from "react-icons/hi";
import { GoArrowRight } from "react-icons/go";
import workOne from "../../assets/work1.png";
import workTwo from "../../assets/work2.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WorkWithUs = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <div ref={sectionRef} className="flex flex-col md:flex-row items-center justify-center gap-6 bg-bg p-8 h-[120vh] !overflow-x-hidden max-lg:mb-8">
            {/* Left Side - Images */}
            <div className="flex h-full justify-center gap-4 py-14">
                <motion.img
                    src={workOne}
                    alt="Family"
                    className="w-40 h-40 md:w-[309px] md:h-[350px] rounded-xl object-cover items-start mb-auto"
                    initial={{ opacity: 0, x: -100 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileInView={{ opacity: 1, x: 0 }}
                />
                <motion.img
                    src={workTwo}
                    alt="House"
                    className="w-52 h-40 md:w-[400px] md:h-[474px] rounded-xl object-cover items-end mt-auto"
                    initial={{ opacity: 0, x: 100 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileInView={{ opacity: 1, x: 0 }}
                />
            </div>

            {/* Right Side - Content */}
            <motion.div
                className="flex flex-col gap-6 max-w-lg"
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileInView={{ opacity: 1, x: 0 }}
            >
                <h2 className="text-4xl font-bold md:max-w-md">Why You Should Work With Us</h2>

                {/* Feature List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-3">
                    {[
                        "100% Secure",
                        "Wide Range of Properties",
                        "Buy or Rent Homes",
                        "Trusted by Thousands",
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 * index }}
                        >
                            <span className="text-green-600 p-2 bg-white rounded-full">
                                <HiCheck size={20} />
                            </span>
                            <span className="text-black font-bold text-sm">{item}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Button */}
                {/* <motion.button
                    className="bg-main text-white hover:bg-hover rounded-2xl font-semibold py-3 px-6 flex justify-center items-center gap-1.5 w-fit tracking-widest transition-all duration-700 ease-in-out shadow-lg hover:shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                >
                    Learn More
                    <GoArrowRight size={20} className="mt-1" />
                </motion.button> */}
            </motion.div>
        </div>
    );
};

export default WorkWithUs;
