import React from 'react'
import Header from '../../Header/Header'
import ContactForm from './ContactForm'
import Footer from '../../Footer/Footer'
import CustomHeader from '../../Components/CustomHeader'
import CoverImage from '../../assets/contact.png';


const Contact = () => {
  return (
    <div>
      <Header />
      <CustomHeader title='Contact Us' image={CoverImage} />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default Contact
