import React from 'react';

export const RMSForgetPasswordEsignConfig = {
    settings: {
        layout: {
            config: { 
            navbar        : {
                display: false
            },
            toolbar       : {
                display: false
            },
            footer        : {
                display: false
            },
            leftSidePanel : {
                display: false
            },
            rightSidePanel: {
                display: false
            }
        }
        }
    },
    routes  : [
        {
            path     : '/apps/rmsForgetPasswordEsign',
            component: React.lazy(() => import('./RMSForgetPasswordEsignApp'))
        }
    ]
};
