import { ajaxRequest } from '@orian/utils';

$(document).ready(function () {

    if ($('#frmSubscribe').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
            email: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmSubscribe',
            validation: true,
            script: 'admin/users/subscribers/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data'
            }
        });
    }
});
