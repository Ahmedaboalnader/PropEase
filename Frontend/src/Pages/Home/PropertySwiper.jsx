
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from '../../Components/CustomSwiper';
import { motion } from "framer-motion";
import SharedCard from '../../Components/SharedCard';
import { useGetAllProperitesQuery } from '../../Store/Properites/PropertiesApi';
import Loading from '../../Components/Loading';

export default function PropertySwiper() {
    const{data: getAllProperites, isLoading: isLoadingGetAllProperites, refetch} = useGetAllProperitesQuery({
        ListingType: "ForRent", 
    });

    if (isLoadingGetAllProperites) {
        return <Loading isLoading={true} />
    }

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
                {getAllProperites?.$values?.map((property) => (
                    <SwiperSlide key={property?.$id}>
                        <SharedCard 
                            property={property} 
                            refetch={refetch}
                        />
                    </SwiperSlide>
                ))}
            </CustomSwiper> 
        </div>
    );
}