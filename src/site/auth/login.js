import { ajaxRequest } from '@orians/utils';

$(document).ready(function () {
    if ($('#frmSiteLogin').length > 0) {
        let rules = {
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                minlength: 8,
            },
        };
        ajaxRequest({
            element: 'frmSiteLogin',
            validation: true,
            script: 'site/auth/login',
            rules,
            afterSuccess: {
                type: 'inflate_redirect_response_data',
            },
        });
    }
});
