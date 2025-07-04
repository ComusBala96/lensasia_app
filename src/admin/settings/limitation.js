import { ajaxRequest } from '@oriansoft/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateLimit').length > 0) {
        let rules = {
            d_users: {
                required: true,
            },
            d_message: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateLimit',
            validation: true,
            script: 'admin/settings/limitation/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});