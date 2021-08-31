import React from 'react';

export const ProjectDashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['admin'],
    routes  : [
        {
            path     : '/apps/dashboards/project',
            component: React.lazy(() => import('./ProjectDashboardApp'))
        }
    ]
};
