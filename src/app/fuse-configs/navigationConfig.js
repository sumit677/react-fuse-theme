import {MaterialUIComponentsNavigation} from 'app/main/documentation/material-ui-components/MaterialUIComponentsNavigation';
import {authRoles} from 'app/auth';

const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'      : 'dashboards',
                'title'   : 'Dashboards',
                'type'    : 'collapse',
                'icon'    : 'dashboard',
                'children': [
                    {
                        'id'   : 'analytics-dashboard',
                        'title': 'Analytics',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/analytics'
                    },
                    {
                        'id'   : 'project-dashboard',
                        'title': 'Project',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/project'
                    }
                ]
            },
            {
                'id'   : 'RMS_PATIENTS_SCREEN',
                'title': 'RMS Patients Screen',
                'type' : 'item',
                'icon' : 'today',
                'url'  : '/apps/rmsform'
            }, 
            {
                'id'   : 'EDM_ORGANIZATION_SCREEN',
                'title': 'Manage Organization Screen',
                'type' : 'item',
                'icon' : 'today',
                'url'  : '/apps/organizations'
            }

           
        ]
    },
   
   
   
    
    
    
   
];

export default navigationConfig;
