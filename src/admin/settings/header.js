import { ajaxRequest} from '@oriansoft/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateHeaderCode').length > 0) {
        let rules = {
            header_script: {
                required: false,
            },
        };
        ajaxRequest({
            element: 'frmUpdateHeaderCode',
            validation: true,
            script: 'admin/settings/general/header/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});