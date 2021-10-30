// assets
import { IconTemplate } from '@tabler/icons';
// constant
const icons = {
    IconTemplate
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const templates = {
    id: 'pages',
    title: 'Emails',
    type: 'group',
    children: [
        {
            id: 'Templates',
            title: 'Templates',
            type: 'item',
            url: '/email-templates',
            icon: icons.IconTemplate,
            breadcrumbs: false
        }
    ]
};

export default templates;
