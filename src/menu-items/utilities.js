// assets
import { IconMailOpened } from '@tabler/icons';

// constant
const icons = {
    IconMailOpened
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Contacts',
    type: 'group',
    children: [
        {
            id: 'list',
            title: 'Lists',
            type: 'item',
            url: '/contact-list',
            icon: icons.IconMailOpened,
            breadcrumbs: false
        }
    ]
};

export default utilities;
