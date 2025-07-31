import { ajaxRequest } from '@orians/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateGoogleConfig').length > 0) {
        let rules = {
            google_id: {
                required: true,
                maxlength: 253
            },
            google_secret: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdateGoogleConfig',
            validation: true,
            script: 'admin/settings/configurations/google/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});