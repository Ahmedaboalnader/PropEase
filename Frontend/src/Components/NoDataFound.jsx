import React from 'react';
import { Box, Text } from '@mantine/core';

const NoDataFound = ({ message = "There are currently no properties available that match your criteria." }) => {
    return (
        <Box className="py-16 text-center">
            <Text size="xl" fw={600} className="text-gray-700 mb-2">No Properties Found</Text>
            <Text size="md" className="text-gray-500">{message}</Text>
        </Box>
    );
};

export default NoDataFound;