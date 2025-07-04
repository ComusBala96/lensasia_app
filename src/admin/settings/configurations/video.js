import { ajaxRequest, G, multi_select } from '@oriansoft/utils';

$(document).ready(function () {
    if ($('#frmUpdateVideoConfig').length > 0) {
        const lang = G.pageLang;
        const { placeholder } = lang;
        multi_select({
            element: 'video_accepts',
            tags: true,
            placeholder: placeholder?.video?.accepts,
        });
        let rules = {
            video_format: {
                required: true,
                maxlength: 253
            },
            'video_accepts[]': {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateVideoConfig',
            validation: true,
            script: 'admin/settings/configurations/video/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});