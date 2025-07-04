import { ajaxRequest, G, jodit } from '@oriansoft/utils';
$(document).ready(function () {
    if ($('#frmUpdateContactSettings').length > 0) {
        const lang = G.pageLang;
        const { placeholder } = lang;
        jodit({
            element: 'contact_text',
            height: 400,
            placeholder: placeholder?.contact_text,
        });
        let rules = {
            address_bd: {
                required: true,
                maxlength: 253
            },
            address_in: {
                required: false,
                maxlength: 253
            },
            email: {
                required: true,
                maxlength: 253
            },
            phone_bd: {
                required: true,
                maxlength: 253
            },
            phone_in: {
                required: false,
                maxlength: 253
            },
            map_link: {
                required: false,
            },
            contact_text: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateContactSettings',
            validation: true,
            script: 'admin/settings/general/contact/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});