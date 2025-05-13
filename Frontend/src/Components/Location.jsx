import { Card } from "@mantine/core";
import getEmbedUrl from "../Functions/getEmbedUrl";

const Location = ({ location }) => {
return (
    <>
    <Card radius="md" withBorder className="w-full my-8">
        <div className="w-full flex justify-between items-start mb-4 space-y-2">
            <h3 className="text-main text-2xl font-bold">Location</h3>
        </div>
        <div className="w-full h-64 rounded-md overflow-hidden">
        <iframe
            src={getEmbedUrl(location || 
            "https://www.google.com/maps/place/%D9%85%D8%B3%D8%AA%D8%B4%D9%81%D9%89+%D8%AD%D9%85%D9%8A%D8%A7%D8%AA+%D8%B7%D9%86%D8%B7%D8%A7%E2%80%AD/@30.78475,30.9992778,17z/data=!4m6!3m5!1s0x14f7c966d7566b0b:0xe91f95a091279420!8m2!3d30.785167!4d30.9943429!16s%2Fg%2F11cjl8mlkj?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D"
            )}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
        </div>
    </Card>
    </>
);
};

export default Location;
