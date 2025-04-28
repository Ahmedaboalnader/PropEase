import { Text, Stack, Image } from '@mantine/core';
import React from 'react';
import noFavorites from '../../../assets/noFav.png';

const Favorite = () => {
    return (
        <div className='bg-white rounded-lg p-8 shadow-sm min-h-[500px] flex items-center justify-center'>
            <Stack align="center" spacing="sm">
                <Image 
                    src={noFavorites} 
                    alt="No saved properties" 
                    className='!w-64 !h-64'
                />
                <Text className="!text-2xl !font-bold !mt-4">No Saved Properties</Text>
                <Text className="!text-gray-600 !text-center">
                    Click on a heart to save a property and all your favorites will appear here.
                </Text>
            </Stack>
        </div>
    );
};

export default Favorite;