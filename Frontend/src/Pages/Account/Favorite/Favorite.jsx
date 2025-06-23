import React, {useState, useEffect} from 'react';
import { Text, Stack, Image } from '@mantine/core';
import noFavorites from '../../../assets/noFav.png';
import { useGetFavoritesQuery } from '../../../Store/Favorite/FavoriteApi';
import { SimpleGrid, Container, Pagination, Center } from '@mantine/core';
import SharedCard from '../../../Components/SharedCard';


const Favorite = () => {
    const{data: getFavorites, refetch} = useGetFavoritesQuery();
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(getFavorites?.$values?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProperties = getFavorites?.$values?.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll
    }, [currentPage]);

    if (!getFavorites?.$values?.length) {
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
    }
    return (
        <Container size="xl" className="!p-5 shadow-custom !rounded-xl">
            <SimpleGrid
                cols={{ base: 1, xs: 1, sm: 2, md: 3, lg: 3 }}
                spacing={{ base: 'md', sm: 'lg' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
                className="!w-full"
            >
                {displayedProperties?.map((property) => (
                    <div key={property?.$id}>
                        <SharedCard 
                            property={property}
                            refetch={refetch}
                        />
                    </div>
                ))}
            </SimpleGrid>

            <Center className="mt-12">
                <Pagination 
                    total={totalPages}
                    value={currentPage}
                    onChange={setCurrentPage}
                    color="#1F4B43"
                    radius="sm"
                />
            </Center>
        </Container>
    );
};

export default Favorite;