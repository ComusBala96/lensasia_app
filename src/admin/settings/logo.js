import { ajaxRequest } from '@orians/utils';
    
$(document).ready(function () {
    $.validator.addMethod('requiredIfOthersEmpty', function (value, element, fields) {
        let isAnyOtherFilled = fields.some(function (selector) {
            return $.trim($(selector).val()) !== '';
        });
        return isAnyOtherFilled || $.trim(value) !== '';
    }, 'At least one field is required.');
    if ($('#frmUpdateLogoSettings').length > 0) {
        let rules = {
            logo: { requiredIfOthersEmpty: ['#favicon', '#auth_logo'] },
            favicon: { requiredIfOthersEmpty: ['#logo', '#auth_logo'] },
            auth_logo: { requiredIfOthersEmpty: ['#logo', '#favicon'] }
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