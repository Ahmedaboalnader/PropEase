import React from 'react';

const CustomHeader = ({image, title}) => {
    return (
        <div className="relative h-[400px] w-full">
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
                }}
            />            
            <div className="relative h-full flex items-center justify-center">
                <h1 className="text-white text-5xl font-semibold">{title}</h1>
            </div>
        </div>
    );
};

export default CustomHeader;
