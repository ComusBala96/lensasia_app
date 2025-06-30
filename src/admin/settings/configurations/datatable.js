import { ajaxRequest } from '@orian/utils';

$(document).ready(function () {
    if ($('#frmUpdateDatatableConfig').length > 0) {
        let rules = {
            dt_size: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdateDatatableConfig',
            validation: true,
            script: 'admin/settings/configurations/datatable/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});