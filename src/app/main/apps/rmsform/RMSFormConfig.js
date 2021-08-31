import React from 'react';

export const RMSFormConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['admin'],
    routes  : [
        {
            path     : '/apps/rmsform',
            component: React.lazy(() => import('./RMSFormApp'))
        }
    ]
};
