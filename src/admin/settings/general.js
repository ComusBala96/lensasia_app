import { ajaxRequest } from '@orian/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateGeneralSettings').length > 0) {
        let rules = {
            app_name: {
                required: true,
                maxlength: 253
            },
            app_address: {
                required: true,
                maxlength: 253
            },
            footer_about: {
                required: true,
            },
            editor_name: {
                required: true,
                maxlength: 253
            },
            editor_designation: {
                required: true,
                maxlength: 253
            },
            copyright: {
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