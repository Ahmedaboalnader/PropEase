
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from '../../Components/CustomSwiper';
import rent1 from '../../assets/rent1.png';
import { motion } from "framer-motion";
import SharedCard from '../../Components/SharedCard';

const generateProperties = (count) => {
    const properties = [];
    for (let i = 1; i <= count; i++) {
        properties.push({
            id: i,
            title: 'New Apartment Nice View',
            location: 'Taj Sultan - Taj City Compound',
            price: '18,000,000 EGP',
            image: rent1, 
            rooms: 4,
            baths: 1,
            size: 460,
        });
    }
    return properties;
};

const properties = generateProperties(11);

export default function PropertySwiper() {
    return (
        <div className="!w-full !py-10 !px-4 !h-[90vh] mb-24">
            <motion.h2
                className="!text-center !text-2xl md:!text-4xl !font-semibold !text-gray-800 !mb-8"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                Recent Properties for Rent
            </motion.h2>

            <CustomSwiper paginationId="property-swiper-pagination">
                {properties?.map((property) => (
                    <SwiperSlide key={property.id}>
                        <SharedCard property={property} />
                    </SwiperSlide>
                ))}
            </CustomSwiper> 
        </div>
    );
}