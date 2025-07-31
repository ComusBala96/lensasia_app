import { ajaxRequest } from '@orians/utils';

$(document).ready(function () {
    if ($('#frmSiteNewPassword').length > 0) {
        let rules = {
            email: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmSiteNewPassword',
            validation: true,
            script: 'site/auth/new/get/password',
            rules,
            afterSuccess: {
                type: 'inflate_redirect_response_data',
            },
        });
    }
});
