import { useNavigate } from 'react-router-dom';
import { Modal,Text, Group, Button } from '@mantine/core';

const AuthModal = ({isModalOpen, setIsModalOpen}) => {
    const navigate = useNavigate();

return(
    <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={<Text className="!text-xl !font-bold">Login Required</Text>}
        centered
    >
        <Text className="mb-6">Please login or sign up to access your favorites</Text>
        <Group justify="center" className="!gap-4 !mt-5 !w-full">
            <Button
                onClick={() => {
                    setIsModalOpen(false);
                    navigate('/login');
                }}
                className="!bg-main !text-white hover:!bg-[#0c332e] !flex-1"
            >
                Login
            </Button>
            <Button
                variant="outline"
                onClick={() => {
                    setIsModalOpen(false);
                    navigate('/signup');
                }}
                className="!border-main !text-main hover:!bg-main hover:!text-white !flex-1"
            >
                Sign up
            </Button>
        </Group>
    </Modal>
)
}

export default AuthModal