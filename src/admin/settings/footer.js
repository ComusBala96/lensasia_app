import { ajaxRequest } from '@orians/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateFooterCode').length > 0) {
        let rules = {
            footer_script: {
                required: false,
            },
        };
        ajaxRequest({
            element: 'frmUpdateFooterCode',
            validation: true,
            script: 'admin/settings/general/footer/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});