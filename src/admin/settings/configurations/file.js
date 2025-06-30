import { ajaxRequest, G, multi_select } from '@orian/utils';

$(document).ready(function () {
    if ($('#frmUpdateFileConfig').length > 0) {
        const lang = G.pageLang;
        const { placeholder } = lang;
        multi_select({
            element: 'file_accepts',
            tags: true,
            placeholder: placeholder?.file?.accepts,
        });
        let rules = {
            file_format: {
                required: true,
                maxlength: 253
            },
            'file_accepts[]': {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateFileConfig',
            validation: true,
            script: 'admin/settings/configurations/file/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});