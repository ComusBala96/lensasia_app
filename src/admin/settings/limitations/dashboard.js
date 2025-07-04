import { ajaxRequest } from '@oriansoft/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateDashboardLimit').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdateDashboardLimit',
            validation: true,
            script: 'admin/settings/limitations/dashboard/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});