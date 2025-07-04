import { ajaxRequest } from '@oriansoft/utils';

$(document).ready(function () {
    if ($('#frmSiteVerify2faOtp').length > 0) {
        let rules = {
            otp: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmSiteVerify2faOtp',
            validation: true,
            script: 'admin/profile/verify/2fa',
            rules,
            afterSuccess: {
                type: 'inflate_redirect_response_data',
            },
        });
    }
});
