import { ajaxRequest } from '@orian/utils';

$(document).ready(function () {
    if ($('#frmUpdateAnalyticConfig').length > 0) {
        let rules = {
            analytics_id: {
                required: true,
                maxlength: 253,
            },
        };
        ajaxRequest({
            element: 'frmUpdateAnalyticConfig',
            validation: true,
            script: 'admin/settings/configurations/analytic/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});