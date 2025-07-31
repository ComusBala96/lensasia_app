import { ajaxRequest } from '@orians/utils';

$(document).ready(function () {
    if ($('#frmSiteRegister').length > 0) {
        let rules = {
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                required: true,
            },
            password: {
                required: true,
                minlength: 8,
            },
            password_confirmation: {
                required: true,
                minlength: 8,
                equalTo: '#password',
            },
            terms: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmSiteRegister',
            validation: true,
            script: 'site/auth/register',
            rules,
            afterSuccess: {
                type: 'inflate_redirect_response_data',
            },
        });
    }
});
