import React, {useState, useEffect} from 'react'
import { Modal, Text } from '@mantine/core';
import { FaPlus } from 'react-icons/fa6';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const PreviewImages = ({images}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    
    const thumbnailCount = isLargeScreen ? 5 : 3;
    
    // Check if there's only one image
    const hasSingleImage = images?.length === 1;
    
    return (
        <>
            <Modal 
                opened={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                size={{base: "95%", sm: "85%", md: "70%"}}
                centered
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {images?.map((img, index) => (
                        <img 
                            key={index}
                            src={img}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg cursor-pointer"
                            onClick={() => {
                                setCurrentImageIndex(index);
                                setIsModalOpen(false);
                            }}
                        />
                    ))}
                </div>
            </Modal>

            <div className="relative mb-8 rounded-xl overflow-hidden">
                <div className="flex flex-col md:flex-row-reverse gap-4">
                    {/* Thumbnails - Only show if there's more than one image */}
                    {!hasSingleImage && (
                        <div className="flex md:flex-col order-2 md:order-1 gap-2 mt-4 md:mt-0 overflow-x-auto md:overflow-y-auto md:max-h-[520px] pb-2 md:pb-0 md:pr-2 justify-center md:justify-start">
                            {images?.slice(0, thumbnailCount)?.map((img, index) => (
                                <div 
                                    key={index} 
                                    className={`min-w-[70px] w-[70px] sm:min-w-[80px] sm:w-[80px] md:w-[100px] md:min-h-[80px] h-16 md:h-[80px] rounded-lg overflow-hidden cursor-pointer flex-shrink-0 ${
                                        currentImageIndex === index ? 'border-2 border-main' : ''
                                    }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                >
                                    <img 
                                        src={img} 
                                        alt={`Thumbnail ${index + 1}`} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                            {images.length > thumbnailCount && (
                                <div 
                                    className="min-w-[70px] w-[70px] sm:min-w-[80px] sm:w-[80px] md:w-[100px] md:min-h-[80px] h-16 md:h-[80px] rounded-lg overflow-hidden cursor-pointer relative flex-shrink-0"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <img 
                                        src={images[thumbnailCount]} 
                                        alt="More images" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/70 h-full flex items-center justify-center gap-1 text-white">
                                        <FaPlus size={13} />
                                        <Text className="!font-bold">{images.length - thumbnailCount}</Text>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Main Image */}
                    <div className="relative flex-1 order-1 md:order-2 h-[300px] sm:h-[400px] md:h-[520px]">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Property image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover rounded-xl"
                        />
                        {/* Navigation arrows - Only show if there's more than one image */}
                        {!hasSingleImage && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                                >
                                    <FaChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                                >
                                    <FaChevronRight size={20} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PreviewImages