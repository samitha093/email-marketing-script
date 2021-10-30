// assets
import { IconSend } from '@tabler/icons';

// constant
const icons = { IconSend };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Campaigns',
            type: 'item',
            url: '/campaigns',
            icon: icons.IconSend,
            breadcrumbs: false
        }
    ]
};

export default other;
