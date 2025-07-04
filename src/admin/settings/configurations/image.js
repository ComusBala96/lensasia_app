import { ajaxRequest, G, multi_select } from '@oriansoft/utils';

$(document).ready(function () {
    const lang = G.pageLang;
    const { placeholder } = lang;
    if ($('#frmUpdateProfileImageConfig').length > 0) {
        multi_select({
            element: 'profile_image_accepts',
            tags: true,
            placeholder: placeholder?.profile?.accepts,
        });
        let rules = {
            profile_image_format: {
                required: true,
                maxlength: 253
            },
            'profile_image_accepts[]': {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateProfileImageConfig',
            validation: true,
            script: 'admin/settings/configurations/image/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateCoverImageConfig').length > 0) {
        multi_select({
            element: 'cover_image_accepts',
            tags: true,
            placeholder: placeholder?.cover?.accepts,
        });
        let rules = {
            cover_image_format: {
                required: true,
                maxlength: 253
            },
            'cover_image_accepts[]': {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateCoverImageConfig',
            validation: true,
            script: 'admin/settings/configurations/image/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdatePostImageConfig').length > 0) {
        multi_select({
            element: 'post_image_accepts',
            tags: true,
            placeholder: placeholder?.post?.accepts,
        });
        let rules = {
            post_image_format: {
                required: true,
                maxlength: 253
            },
            'post_image_accepts[]': {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdatePostImageConfig',
            validation: true,
            script: 'admin/settings/configurations/image/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateAdImageConfig').length > 0) {
        multi_select({
            element: 'ad_image_accepts',
            tags: true,
            placeholder: placeholder?.ad?.accepts,
        });
        let rules = {
            ad_image_format: {
                required: true,
                maxlength: 253
            },
            'ad_image_accepts[]': {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateAdImageConfig',
            validation: true,
            script: 'admin/settings/configurations/image/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});