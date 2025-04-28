import { notifications } from '@mantine/notifications';

export const showNotification = {
    success: (message) => {
        notifications.show({
        title: 'Success',
        message,
        color: 'green',
        });
    },
    error: (message) => {
        notifications.show({
        title: 'Error',
        message: message || 'Something went wrong',
        color: 'red',
        });
    },
    warning: (message) => {
        notifications.show({
        title: 'Warning',
        message,
        color: 'yellow',
        });
    },
    info: (message) => {
        notifications.show({
        title: 'Info',
        message,
        color: 'blue',
        });
    },
};