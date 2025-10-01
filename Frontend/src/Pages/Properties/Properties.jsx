import React, { useEffect, useState } from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import PropertiesListing from './PropertiesListing'
import Filter from '../../Components/Filter';
import { useGetAllProperitesQuery } from '../../Store/Properites/PropertiesApi';
import Loading from '../../Components/Loading';
import { useDebounce } from '../../utils/useDebounce';
import { useSearchParams } from 'react-router-dom';

const Properties = () => {
  const [searchParams] = useSearchParams();
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

    // Handle URL parameters on component mount
    useEffect(() => {
      const filterParam = searchParams.get('filter');
      const searchParam = searchParams.get('search');
      
      // Handle filter parameter
      if (filterParam) {
        // Map URL filter values to ListingType
        const listingTypeMap = {
          'ForSale': 'ForSale',
          'ForRent': 'ForRent'
        };
        
        const listingType = listingTypeMap[filterParam];
        if (listingType) {
          setFilters(prevFilters => ({
            ...prevFilters,
            ListingType: listingType
          }));
        }
      }
      
      // Handle search parameter
      if (searchParam) {
        setSearchTerm(searchParam);
        setFilters(prevFilters => ({
          ...prevFilters,
          Search: searchParam
        }));
      }
    }, [searchParams]);

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

  const propertiesWithoutOffers = getAllProperites?.$values?.filter(
    property => property?.hasOffer === false
  ) || [];

  if (isLoadingGetAllProperites) {
    return <Loading isLoading={true} />
  }

  return (
    <div>
      <Header />
      <Filter onFilterChange={handleFilterChange} />
      <PropertiesListing 
        data={propertiesWithoutOffers} 
        isLoading={isLoadingGetAllProperites} 
        refetch={refetch}
      />
      <Footer />
    </div>
  )
}

export default Properties