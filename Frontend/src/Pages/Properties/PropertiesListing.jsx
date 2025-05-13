import React, { useState } from 'react';
import SharedCard from '../../Components/SharedCard';
import NoDataFound from '../../Components/NoDataFound';
import { SimpleGrid, Container, Pagination, Center } from '@mantine/core';

const PropertiesListing = ({data, offers, refetch}) => {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProperties = data?.slice(startIndex, startIndex + itemsPerPage);

    // Check if there's no data or empty array
    const noDataToDisplay = !data || data.length === 0;

    return (
        <Container size="2xl" className="max-lg:!px-4 lg:!px-16 !py-6">
            {noDataToDisplay ? (
                <NoDataFound />
            ) : (
                <>
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
                                    offers={offers}
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
                </>
            )}
        </Container>
    );
};

export default PropertiesListing;