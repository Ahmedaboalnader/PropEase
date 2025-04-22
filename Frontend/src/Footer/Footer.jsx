import React from 'react'
import { TextInput, Button, Title, Text } from "@mantine/core";
import { FaPaperPlane, FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Logo from '../assets/footerLogo.svg';
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Social media links
    const socialLinks = [
        { icon: <FaFacebookF size={20} />, url: "#" },
        { icon: <FaInstagram size={20} />, url: "#" },
        { icon: <FaXTwitter size={20} />, url: "#" },
        { icon: <FaLinkedinIn size={20} />, url: "#" },
        { icon: <FaYoutube size={20} />, url: "#" }
    ];

    // Quick links
    const quickLinks = [
        { name: "Home", url: "/" },
        { name: "Properties", url: "/properties" },
        { name: "Contact Us", url: "/contact" }
    ];

    // Other links
    const otherLinks = [
        { name: "Privacy Policy", url: "/privacy-policy" },
        { name: "Terms & Conditions", url: "/terms" },
        { name: "Support", url: "/support" }
    ];

    // Handle link click with scroll to top
    const handleLinkClick = (e, url) => {
        if (url.startsWith('/')) {
            e.preventDefault();
            window.location.href = url;
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 100);
        }
    };

    return (
        <footer className="bg-main text-white">
            {/* Newsletter Section */}
            <section className="py-16 px-4 border-b border-[#274d47]">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="bg-yellowCustom rounded-full p-3">
                            <FaPaperPlane className="text-black w-6 h-6" />
                        </div>
                    </div>

                    <Title className="text-4xl font-bold">Stay Up to Date</Title>

                    <Text size="sm" className="text-gray-300">
                        Subscribe to our newsletter to receive our weekly feed.
                    </Text>

                    <form className="flex items-center w-full lg:w-[65%] mx-auto bg-[#274d47] rounded-full overflow-hidden">
                        <TextInput
                            placeholder="Enter Your Email"
                            classNames={{
                                root: "w-full",
                                input: "!rounded-full !h-14 !pl-6 !pr-24 !shadow-md !font-semibold !text-base !w-full !bg-[#274d49] !border-none !outline-none !text-white !placeholder-white ",
                            }}
                            rightSectionWidth={50}
                            rightSection={
                                <Button
                                    variant="transparent"
                                    className="!w-12 !h-12 !flex !items-center !justify-center"
                                    type="submit"
                                >
                                    <FaPaperPlane className="text-white w-4 h-4" />
                                </Button>
                            }
                        />
                    </form>
                </div>
            </section>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-8 lg:px-32">
                <div className="border-y-2 border-gray-500 py-12">
                    <Link to="/" onClick={(e) => handleLinkClick(e, '/')}>
                        <img src={Logo} alt="PropEase" className="w-44" />
                    </Link>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                        {/* Social Links */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Follow Us</h3>
                            <div className="flex gap-4">
                                {socialLinks.map((link, index) => (
                                    <a 
                                        key={index} 
                                        href={link.url} 
                                        className="hover:text-yellowCustom"
                                        onClick={(e) => handleLinkClick(e, link.url)}
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                            <Link 
                                to="/privacy-policy" 
                                className="block hover:text-yellowCustom opacity-35 underline"
                                onClick={(e) => handleLinkClick(e, '/privacy-policy')}
                            >
                                Privacy Policy
                            </Link>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                {quickLinks.map((link, index) => (
                                    <Link 
                                        key={index} 
                                        to={link.url} 
                                        className="block hover:text-yellowCustom opacity-35"
                                        onClick={(e) => handleLinkClick(e, link.url)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Other Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Other</h3>
                            <div className="space-y-2">
                                {otherLinks.map((link, index) => (
                                    <Link 
                                        key={index} 
                                        to={link.url} 
                                        className="block hover:text-yellowCustom opacity-35"
                                        onClick={(e) => handleLinkClick(e, link.url)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact us</h3>
                            <a 
                                href="mailto:support@propease.org" 
                                className="hover:text-yellowCustom opacity-35 flex items-center gap-2"
                            >
                                <MdOutlineMail /> support@propease.org
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="pt-10 pb-2 text-center">
                <Text size="sm" className="text-gray-300">
                    © 2025 PropEase. All Right Reserved
                </Text>
            </div>
        </footer>
    );
};

export default Footer;