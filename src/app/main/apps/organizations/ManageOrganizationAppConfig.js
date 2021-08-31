import React from 'react';
import {Redirect} from 'react-router-dom';

export const ManageOrganizationAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['admin'],
    routes  : [
        
        {
            path     : '/apps/organizations/addorganization/:siteId/:mode',
            component: React.lazy(() => import('./addorganization/AddOrganization'))
        },
        {
            path     : '/apps/organizations/addorganization',
            component: React.lazy(() => import('./addorganization/AddOrganization'))
        },
        
         {
            path     : '/apps/organizations/:id',
            component: React.lazy(() => import('./ManageOrganizationApp'))
        },
        {
            path     : '/apps/organizations',
            component: () => <Redirect to="/apps/organizations/all"/>
         }
         
         //,
        // {
        //     path     : '/apps/organizations',
        //     component: React.lazy(() => import('./ManageOrganizationApp'))
        // }
    ]
};
