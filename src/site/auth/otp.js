import { ajaxRequest } from '@orian/utils';

$(document).ready(function () {
    if ($('#frmSiteVerifyOtp').length > 0) {
        let rules = {
            otp: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmSiteVerifyOtp',
            validation: true,
            script: 'site/auth/verify/otp',
            rules,
            afterSuccess: {
                type: 'inflate_redirect_response_data',
            },
        });
    }
});
