import React from 'react'
import Header from '../../Header/Header'
import Hero from './Hero'
import Steps from './Steps'
import Footer from '../../Footer/Footer'
import WorkWithUs from './WorkWithUs'
import RealEstateHero from './RealEstateHero'
import PropertiesByArea from './PropertiesByArea'
import HomeCards from './HomeCards'
import FeaturedCategories from './FeaturedCategories'
import PropertySwiper from './PropertySwiper'

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Steps />
      <FeaturedCategories />
      <PropertySwiper />
      <WorkWithUs />
      <RealEstateHero />
      <PropertiesByArea />
      <HomeCards />
      <Footer />
    </>
  )
}

export default Home
