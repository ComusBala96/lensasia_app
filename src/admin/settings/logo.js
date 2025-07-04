import { ajaxRequest } from '@oriansoft/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateLogoSettings').length > 0) {
        let rules = {
            logo: {
                required: true,
            },
            favicon: {
                required: true,
            },
            auth_logo: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateLogoSettings',
            validation: true,
            script: 'admin/settings/general/logo/update',
            rules,
            afterSuccess: {
                type: ''
            }
        });
    }
});