import React from "react";
import { Container, Title, Text } from "@mantine/core";

const ComingSoon = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br !from-text !to-main flex items-center justify-center px-4">
            <Container className="text-center max-w-2xl text-white space-y-6">
                <Title order={1} className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Coming Soon
                </Title>
                <Text size="lg" className="text-gray-300">
                    We’re launching something exciting. Be the first to know when we go live!
                </Text>

                <Text size="sm" className="text-gray-400">
                © {new Date().getFullYear()} PropEase. All rights reserved.
                </Text>
            </Container>
        </div>
    );
};

export default ComingSoon;
