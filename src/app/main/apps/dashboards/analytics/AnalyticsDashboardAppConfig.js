import React from 'react';

export const AnalyticsDashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['admin'],
    routes  : [
        {
            path     : '/apps/dashboards/analytics',
            component: React.lazy(() => import('./AnalyticsDashboardApp'))
        }
    ]
};
