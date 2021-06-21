import React from 'react';

export const RMSFormConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/rmsform',
            component: React.lazy(() => import('./RMSFormApp'))
        }
    ]
};
