import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const Delivery = Loadable(lazy(() => import('views/pgcmp/delivery')));
const Bounce = Loadable(lazy(() => import('views/pgcmp/bounce')));
const Templates = Loadable(lazy(() => import('views/pgcmp/templates')));
const List = Loadable(lazy(() => import('views/pgcmp/list')));
const Campaigns = Loadable(lazy(() => import('views/pgcmp/campaigns')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/server/delivery',
            element: <Delivery />
        },
        {
            path: '/server/bounce',
            element: <Bounce />
        },
        {
            path: '/email-templates',
            element: <Templates />
        },
        {
            path: '/contact-list',
            element: <List />
        },
        {
            path: '/campaigns',
            element: <Campaigns />
        }
    ]
};

export default MainRoutes;
