import { Card, Text } from '@mantine/core';
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from '../../Components/CustomSwiper';
import { motion } from "framer-motion";
import icon1 from '../../assets/Icon1.svg';
import icon2 from '../../assets/Icon2.svg';
import icon3 from '../../assets/Icon3.svg';
import { useFeaturedCategoriesQuery } from '../../Store/Home/HomeApi';
import Loading from '../../Components/Loading';

const FeaturedCategories = () => {
    const { data: featured, isLoading } = useFeaturedCategoriesQuery();
    
    // Map category names to icons
    const getCategoryIcon = (categoryName) => {
        switch(categoryName?.toLowerCase()) {
            case 'commercial':
                return icon1;
            case 'chalets':
                return icon2;
            case 'land':
                return icon3;
            case 'studio':
                return icon2;
            case 'apartment':
                return icon3;
            default:
                return icon1;
        }
    };

    if(isLoading){
        return <Loading isLoading={true} />
    }

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

            <div className="w-full max-w-7xl relative">
                <CustomSwiper paginationId="featured-categories-pagination">
                    {featured?.$values?.map((category) => (
                        <SwiperSlide key={category?.$id}>
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                className="flex items-center justify-center gap-10 border rounded-xl min-h-[160px] hover:shadow-md 
                                    bg-white hover:bg-hover hover:text-white transition-colors duration-1000"
                            >
                                <div className='bg-bg p-3 rounded-2xl'>
                                    <img 
                                        src={getCategoryIcon(category?.categoryName)} 
                                        alt={category?.categoryName} 
                                        className="w-12 h-12 object-contain" 
                                    />
                                </div>
                                <div className='text-center'>
                                    <Text className="!font-bold !text-lg">
                                        {category?.categoryName}
                                    </Text>
                                    <Text className="!font-medium !text-base">
                                        {category?.propertyCount} {category?.propertyCount === 1 ? 'Property' : 'Properties'}
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