import React from 'react'
import { TextInput, Button, Title, Text } from "@mantine/core";
import { FaPaperPlane } from "react-icons/fa";
import { GoArrowRight } from 'react-icons/go';

const Footer = () => {
    return (
        <section className="bg-main py-16 px-4 text-white">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="bg-yellowCustom rounded-full p-3">
                        <FaPaperPlane className="text-black w-6 h-6" />
                    </div>
                </div>

                {/* Title */}
                <Title className="!text-4xl !font-bold">
                    Stay Up to Date
                </Title>

                {/* Subtitle */}
                <Text size="sm" className="!text-gray-300">
                    Subscribe to our newsletter to receive our weekly feed.
                </Text>

                {/* Input + Button */}
                <form className="flex items-center w-full lg:w-[65%] mx-auto bg-[#274d47] rounded-full overflow-hidden">
                    <TextInput
                        placeholder="Your e-mail"
                        classNames={{
                            root: "w-full",
                            input: "!rounded-full !h-14 !pr-12 !shadow-md !w-full !bg-transparent !border-none !outline-none !text-white",
                        }}
                        rightSectionWidth={90} 
                        rightSection={
                            <Button
                                variant="transparent"
                                className="!w-full !flex !items-center !justify-center !gap-2 !text-white !px-6"
                                type="submit"
                            >
                                Send <GoArrowRight size={20} className="!text-white mt-1" />
                            </Button>
                        }
                    />
                </form>
            </div>
        </section>
    );
};

export default Footer
