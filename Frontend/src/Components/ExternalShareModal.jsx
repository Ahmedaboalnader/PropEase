import { Modal, TextInput, ActionIcon, Button } from '@mantine/core';
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

function ExternalShareModal({ open, onClose }) {
    const [urlCopy, setUrlCopy] = useState('');
    const [isCopied, setIsCopied] = useState(false); 

    const handleCopy = () => {
    navigator.clipboard.writeText(urlCopy); 
    setIsCopied(true);

    setTimeout(() => {
        setIsCopied(false);
    }, 5000); 
    };

    useEffect(() => {
        const currentUrl = window.location.href;
        setUrlCopy(currentUrl);
    }, []);
    const url = window.location.href;

    const handleWhatsAppShare = () => {
        const whatsappLink = `https://api.whatsapp.com/send?text=Check%20this%20out:%20${encodeURIComponent(url)}`;
        window.open(whatsappLink, '_blank', "noopener,noreferrer");
    };
    const handleFacebookShare = () => {
        const facebookSharerUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookSharerUrl, "_blank", "noopener,noreferrer");
    };
    const handleTwitterShare = () => {
        const twitterSharerUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        window.open(twitterSharerUrl, "_blank", "noopener,noreferrer");
    };

    const handleLinkedInShare = () => {
        const linkedinSharerUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
        window.open(linkedinSharerUrl, "_blank", "noopener,noreferrer");
    };

    const shortEndUrl = urlCopy.length > 50 ? `${urlCopy.slice(0, 40)}...` : urlCopy;

return (
<Modal opened={open} onClose={onClose} withCloseButton={false} size="md" centered>
    <div className="flex justify-between items-center mb-4">
    <h6>Share</h6>
    <ActionIcon 
        variant="transparent" 
        onClick={onClose} 
        style={{ 
        color: '#1F4B43',  
        outline: "none",
        border: "none",
        }}
    >
        <IoClose size={50} />
    </ActionIcon>
    </div>
    <div className="mb-4 flex justify-around items-center sm:px-4 ">

    {/* <ActionIcon variant="default"><IconCode size={24} /></ActionIcon> */}
    {/* <ActionIcon variant="default"><IconBrandWhatsapp size={24} /></ActionIcon> */}
    <div
        onClick={handleWhatsAppShare}
        className="flex items-center justify-center bg-green-500 rounded-full p-2 cursor-pointer"
    >
        <FaWhatsapp className="text-white" size={32} />
    </div>

    <div
        onClick={handleFacebookShare}
        className="flex items-center justify-center bg-[#1877F2] rounded-full p-2 cursor-pointer"
    >
        <FaFacebookF className="text-white" size={32} />
    </div> 

    <div
        onClick={handleTwitterShare}
        className="flex items-center justify-center bg-black rounded-full p-2 cursor-pointer"
    >
        <FaXTwitter className="text-white" size={32} />
    </div>

    {/* <ActionIcon variant="default"><IconMail size={24} /></ActionIcon>
    <ActionIcon variant="default"><IconBrandReddit size={24} /></ActionIcon> */}

    <div
        onClick={handleLinkedInShare}
        className="flex items-center justify-center bg-[#0A66C2] rounded-full p-2 cursor-pointer"
    >
        <FaLinkedinIn className="text-white" size={32} />
    </div>

    </div>
    <TextInput
        value={shortEndUrl}
        readOnly
        className="w-full"
        classNames={{ input: "!py-6 !rounded-full !w-full !font-bold !bg-zinc-100" }}
        rightSectionWidth={100}
        rightSection={
            <Button
                onClick={handleCopy}
                className='!bg-main !w-3/4 
                !rounded-full !text-center !text-white'
            >
                {isCopied ? 'Copied' : 'Copy'}
            </Button>
        }
    />
</Modal>
);
}

export default ExternalShareModal;
