import { Card, Badge, Text, Group, Button } from '@mantine/core';
import { FaBath, FaBed, FaRulerCombined } from 'react-icons/fa';
import { IoIosHeartEmpty } from "react-icons/io";
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from '../../Components/CustomSwiper';
import rent1 from '../../assets/rent1.png';
import { motion } from "framer-motion";

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
                    <Card 
                        shadow="sm" 
                        padding="lg" 
                        radius="md" 
                        withBorder 
                        className="!rounded-2xl !overflow-hidden !border !border-gray-300"
                    >
                    <div className="!relative !h-56">
                        <img src={property.image} alt={property.title} className="!w-full !h-full !object-cover" />
                        <div className="!absolute !top-2 !left-2 !flex !gap-2">
                        <Badge className='!bg-main !text-white !min-w-[60px] !p-2 !rounded-full !font-medium'>FOR RENT</Badge>
                        <Badge className='!bg-yellowCustom !text-black !min-w-[60px] !p-2 !rounded-full !font-semibold'>FEATURED</Badge>
                        </div>
                    </div>
                    <div className="!mt-4 !space-y-2 !px-5 !pb-2">
                        <Text className="!font-bold !text-xl">{property.title}</Text>
                        <Text className='!font-medium !text-sm !text-gray-600'>{property.location}</Text>
                        <Group className='!flex !items-center !justify-center max-sm:!gap-2 lg:!justify-between !border-b !py-4'>
                            <Group className='!flex !items-center !justify-center !gap-3 !border !border-gray-300 !rounded-full !py-2 !min-w-fit !px-4'>
                                <FaBed size={18} />
                                <Text size="xs">{property.rooms}</Text>
                            </Group>
                            <Group className='!flex !items-center !justify-center !gap-3 !border !border-gray-300 !rounded-full !py-2 !min-w-fit !px-4'>
                                <FaBath size={18} />
                                <Text size="xs">{property.baths}</Text>
                            </Group>
                            <Group className='!flex !items-center !justify-center !gap-3 !border !border-gray-300 !rounded-full !py-2 !min-w-fit !px-4'>
                                <FaRulerCombined size={18} />
                                <Text size="xs">{property.size} m²</Text>
                            </Group>
                        </Group>

                        <Group className='!flex !items-center !justify-between'>
                            <Text className='!text-red-400 !text-lg !font-semibold'>{property.price}</Text>
                            <div className='!border !border-gray-300 !rounded-full !w-10 !h-10 !flex !justify-center !items-center !cursor-pointer hover:!bg-gray-100'>
                                <IoIosHeartEmpty size={22} /> 
                            </div>
                        </Group>
                    </div>
                    </Card>
                </SwiperSlide>
                ))}
            </CustomSwiper> 
        </div>
    );
}