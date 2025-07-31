import { ajaxRequest} from '@orians/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateSocialSettings').length > 0) {
        let rules = {
            facebook: {
                required: false,
                maxlength: 253
            },
            twitter: {
                required: false,
                maxlength: 253
            },
            instagram: {
                required: false,
                maxlength: 253
            },
            linkedin: {
                required: false,
                maxlength: 253
            },
            telegram: {
                required: false,
                maxlength: 253
            },
            youtube: {
                required: false,
                maxlength: 253
            },
            tiktok: {
                required: false,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdateSocialSettings',
            validation: true,
            script: 'admin/settings/general/social/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});