import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import rent1 from '../../assets/rent1.png';
import Filter from '../../Components/Filter';
import PropertiesListing from '../Properties/PropertiesListing';

const generateProperties = (count) => {
const properties = [];
for (let i = 1; i <= count; i++) {
    properties.push({
        id: i,
        title: 'New Apartment Nice View',
        location: 'Taj Sultan - Taj City Compound',
        price: '18,000,000 EGP',
        image: rent1, 
        rooms: 4,
        baths: 1,
        size: 460,
    });
}
return properties;
};

const Properties = () => {

return (
    <>
        <Header />
        <Filter />
        <PropertiesListing data={generateProperties(18)} offers={true} />
        <Footer />
    </>
)
}

export default Properties
