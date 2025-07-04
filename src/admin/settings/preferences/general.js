import { ajaxRequest } from '@oriansoft/utils';

$(document).ready(function () {
    if ($('#frmUpdateGeneralPreferences').length > 0) {
        let rules = {
            two_factor: {
                required: true,
            },
            verify: {
                required: true,
            },
            email: {
                required: true,
            },
            attachment: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateGeneralPreferences',
            validation: true,
            script: 'admin/settings/preferences/general/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});