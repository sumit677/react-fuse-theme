import React from 'react';

export const QuestionnaireAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
         {
            path     : '/apps/questionnaire',
            component: React.lazy(() => import('./ManageQuestionnaire'))
        }
    ]
};
