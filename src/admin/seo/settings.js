import { ajaxRequest } from '@oriansoft/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateSeoSettings').length > 0) {
        let rules = {
            analytic_script: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateSeoSettings',
            validation: true,
            script: 'admin/seo/settings/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});