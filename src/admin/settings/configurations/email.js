import { ajaxRequest } from '@orian/utils';

$(document).ready(function () {
    if ($('#frmUpdateEmailConfig').length > 0) {
        let rules = {
            mail_mailer: {
                required: true,
                maxlength: 253,
            },
            mail_host: {
                required: true,
                maxlength: 253,
            },
            mail_port: {
                required: true,
                maxlength: 253,
            },
            mail_username: {
                required: true,
                maxlength: 253,
            },
            mail_password: {
                required: true,
                maxlength: 253,
            },
            mail_encryption: {
                required: true,
                maxlength: 253,
            },
            mail_from_address: {
                required: true,
                maxlength: 253,
            },
            mail_from_name: {
                required: true,
                maxlength: 253,
            },
        };
        ajaxRequest({
            element: 'frmUpdateEmailConfig',
            validation: true,
            script: 'admin/settings/configurations/email/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});