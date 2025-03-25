import { Card, Image, Text } from "@mantine/core";
import { motion } from "framer-motion";
import cairo from "../../assets/cairo.png";
import zayed from "../../assets/zayed.png";
import northCost from "../../assets/north-cost.png";
import madintiy from "../../assets/madintiy.png";
import october from "../../assets/october.png";
import alex from "../../assets/alex.png";

const properties = [
    { id: 1, name: "Cairo", count: 8, image: cairo, animation: { x: -100, opacity: 0 } },
    { id: 2, name: "El Sheikh", count: 3, image: zayed, animation: { x: -100, opacity: 0 }},
    { id: 3, name: "North Coast", count: 1, image: northCost, animation: { x: 100, opacity: 0 }},
    { id: 4, name: "Madinaty", count: 2, image: madintiy, animation: { x: -100, opacity: 0 } },
    { id: 5, name: "6 October", count: 2, image: october, animation: { x: 100, opacity: 0 }},
    { id: 6, name: "Alexandria", count: 2, image: alex, animation: { x: 100, opacity: 0 } },
];

const PropertiesByArea = () => {
    return (
        <section className="py-8 px-2 lg:px-4 w-full flex flex-col justify-center items-center !overflow-x-hidden">
            {/* Section Title */}

            <motion.h2
                className="text-center text-2xl md:text-4xl font-semibold text-gray-800 mb-10"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                Properties by Area
            </motion.h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {properties?.map((property, index) => (
                    <motion.div
                        key={property.id}
                        initial={property.animation}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.3,
                            ease: "easeInOut",
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-full flex items-center justify-center gap-6 rounded-lg overflow-hidden cursor-pointer">
                            <img
                                src={property?.image}
                                alt={property?.name}
                                height={100}
                                className="object-cover rounded-lg "
                            />
                            <div className="">
                                <p className="font-semibold text-sm break-words max-w-[9ch]">
                                    {property?.name}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    {property?.count}{" "}
                                    {property?.count > 1 ? "Properties" : "Property"}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PropertiesByArea;
