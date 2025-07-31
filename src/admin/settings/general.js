import { ajaxRequest } from '@orians/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateGeneralSettings').length > 0) {
        let rules = {
            app_name: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdateGeneralSettings',
            validation: true,
            script: 'admin/settings/general/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});