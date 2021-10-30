// assets
import { IconKey, IconServer } from '@tabler/icons';
// constant
const icons = {
    IconKey,
    IconServer
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Servers',
    type: 'group',
    children: [
        {
            id: 'Delivery-SMTP',
            title: 'Delivery SMTP',
            type: 'item',
            url: '/server/delivery',
            icon: icons.IconServer,
            breadcrumbs: false
        }
    ]
};

export default pages;
