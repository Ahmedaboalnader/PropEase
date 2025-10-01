import React, {useState} from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import Filter from '../../Components/Filter';
import PropertiesListing from '../Properties/PropertiesListing';
import { useGetAllProperitesQuery } from '../../Store/Properites/PropertiesApi';
import Loading from '../../Components/Loading';
import { useDebounce } from '../../utils/useDebounce';

const Properties = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    
    const [filters, setFilters] = useState({
        Search: "",
        ListingType: "",
        PropertyType: "",
        MinPrice: "",
        MaxPrice: "",
        MinArea: "",
        MaxArea: "",
        MinRooms: "",
        MaxRooms: "",
        SortBy: ""
    });

    // Use the debounced search term directly in the query
    const { data: getAllProperites, isLoading: isLoadingGetAllProperites, refetch } = 
        useGetAllProperitesQuery({
        ...filters,
        Search: debouncedSearchTerm
        });

    const handleFilterChange = (newFilters) => {
        // Update search term for debouncing
        if (newFilters.Search !== undefined) {
        setSearchTerm(newFilters.Search);
        }
        
        // Update other filters immediately
        setFilters(prevFilters => ({
        ...prevFilters,
        ListingType: newFilters.listingType || "",
        PropertyType: newFilters.propertyType || "",
        MinPrice: newFilters.minPrice ? newFilters.minPrice.replace(/,/g, '') : "",
        MaxPrice: newFilters.maxPrice ? newFilters.maxPrice.replace(/,/g, '') : "",
        MinArea: newFilters.minArea ? newFilters.minArea.split(' ')[0] : "",
        MaxArea: newFilters.maxArea ? newFilters.maxArea.split(' ')[0] : "",
        MinRooms: newFilters.minRooms || "",
        MaxRooms: newFilters.maxRooms || "",
        SortBy: newFilters.sortBy || ""
        }));
    };

    const propertiesWithOffers = getAllProperites?.$values?.filter(
        property => property?.hasOffer === true
    ) || [];

    if(isLoadingGetAllProperites){
        return <Loading isLoading={true} />
    }

return (
    <>
        <Header />
        <Filter onFilterChange={handleFilterChange}/>
        <PropertiesListing data={propertiesWithOffers} offers={true} refetch={refetch}/>
        <Footer />
    </>
)
}

export default Properties
