import React from 'react';
import { Swiper } from 'swiper/react';
import { Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const CustomSwiper = ({ children, paginationId }) => {
    return (
        <>
            <Swiper
                slidesPerView={1} 
                spaceBetween={20}
                pagination={{ clickable: true, el: `#${paginationId}` }} 
                keyboard={{ enabled: true }}
                mousewheel={{ forceToAxis: true }}
                breakpoints={{
                    640: { slidesPerView: 2 }, 
                    768: { slidesPerView: 3 }, 
                    1024: { 
                        slidesPerView: paginationId === 'featured-categories-pagination' ? 3 : 4,
                    },                
                }}
                modules={[Pagination, Keyboard, Mousewheel]}
                className="featured-categories-swiper"
            >
                {children}
            </Swiper>

            {/* Unique Pagination Container */}
            <div id={paginationId} className="swiper-pagination-custom mt-8"></div>
        </>
    );
};

export default CustomSwiper;