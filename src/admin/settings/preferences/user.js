import { ajaxRequest } from '@orians/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateUserPreferences').length > 0) {
        let rules = {
            profile: {
                required: true, 
            },
            cover: {
                required: true, 
            },
            profile_date: {
                required: true, 
            },
            profile_email: {
                required: true, 
            },
            profile_news: {
                required: true, 
            },
        };
        ajaxRequest({
            element: 'frmUpdateUserPreferences',
            validation: true,
            script: 'admin/settings/preferences/user/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});