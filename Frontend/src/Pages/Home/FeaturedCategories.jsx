import { Card, Text } from '@mantine/core';
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from '../../Components/CustomSwiper';
import { motion } from "framer-motion";
import icon1 from '../../assets/Icon1.svg';
import icon2 from '../../assets/Icon2.svg';
import icon3 from '../../assets/Icon3.svg';

const categories = [
    { id: 1, name: 'Modern Villa', count: 10, icon: icon1 }, 
    { id: 2, name: 'Apartment', count: 3, icon: icon2 },
    { id: 3, name: 'Single Family', count: 5, icon: icon3 },
    { id: 4, name: 'Town House', count: 7, icon: icon2 },
    { id: 5, name: 'Studio', count: 8, icon: icon3 },
];

const FeaturedCategories = () => {
    return (
        <div className="w-full mx-auto py-10 px-4 bg-[#F9F9F9] h-[70vh] flex flex-col gap-14 justify-center items-center">
            <motion.h2
                className="text-center text-2xl md:text-4xl font-semibold text-gray-800"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                Featured Categories
            </motion.h2>

            {/* Swiper Container */}
            <div className="w-full max-w-7xl relative">
                <CustomSwiper paginationId="featured-categories-pagination">
                    {categories?.map((category) => (
                        <SwiperSlide key={category?.id}>
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                className="flex items-center justify-center gap-10 border rounded-xl min-h-[160px] hover:shadow-md 
                                    bg-white hover:bg-hover hover:text-white transition-colors duration-1000"
                            >
                                <div className='bg-bg p-3 rounded-2xl'>
                                    <img src={category?.icon} alt={category?.name} className="w-12 h-12 object-contain" />
                                </div>
                                <div>
                                    <Text className="font-bold text-lg">{category?.name}</Text>
                                    <Text className="font-medium text-base">
                                        {category?.count} {category?.count > 1 ? 'Properties' : 'Property'}
                                    </Text>
                                </div>
                            </Card>
                        </SwiperSlide>
                    ))}
                </CustomSwiper>
            </div>
        </div>
    );
};

export default FeaturedCategories;