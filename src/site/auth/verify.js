import { ajaxRequest } from '@orians/utils';

$(document).ready(function () {
    if ($('#frmSiteVerify').length > 0) {
        let rules = {
            email: {
                required: true,
                email: true,
            },
        };
        ajaxRequest({
            element: 'frmSiteVerify',
            validation: true,
            script: 'site/auth/get/otp',
            rules,
            afterSuccess: {
                type: 'inflate_redirect_response_data',
            },
        });
    }
});
