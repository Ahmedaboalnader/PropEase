import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import PropertiesListing from './PropertiesListing'
import rent1 from '../../assets/rent1.png';
import Filter from '../../Components/Filter';

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
    <div>
      <Header />
      <Filter />
      <PropertiesListing data={generateProperties(18)}/>
      <Footer />
    </div>
  )
}

export default Properties
