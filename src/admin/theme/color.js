import { ajaxRequest, changeColor } from '@orian/utils';

$(document).ready(function () {
    changeColor({
        elements: ['topbar_color', 'navbar_color', 'navbar_hover_color', 'active_border_color', 'breaking_color', 'breaking_bg_color', 'body_color', 'background_color', 'subscriber_color', 'footer_color', 'copyright_color', 'scroller_color', 'scroller_hover_color',],
        targets: ['topbar', 'navbar', 'navbar_hover', 'active_border', 'breaking', 'breaking_bg', 'body', 'background', 'image_hover', 'subscriber', 'footer', 'copyright', 'scroller', 'scroller_hover',],
    });
    changeColor({
        targets: ['topbar_color', 'navbar_color', 'navbar_hover_color', 'active_border_color', 'breaking_color', 'breaking_bg_color', 'body_color', 'background_color', 'subscriber_color', 'footer_color', 'copyright_color', 'scroller_color', 'scroller_hover_color',],
        elements: ['topbar', 'navbar', 'navbar_hover', 'active_border', 'breaking', 'breaking_bg', 'body', 'background', 'image_hover', 'subscriber', 'footer', 'copyright', 'scroller', 'scroller_hover',],
    });
    let rules = {
        topbar: {
            required: true,
            maxlength: 253
        },
        navbar: {
            required: true,
            maxlength: 253
        },
        navbar_hover: {
            required: true,
            maxlength: 253
        },
        active_border: {
            required: true,
            maxlength: 253
        },
        breaking: {
            required: true,
            maxlength: 253
        },
        breaking_bg: {
            required: true,
            maxlength: 253
        },
        body: {
            required: true,
            maxlength: 253
        },
        background: {
            required: true,
            maxlength: 253
        },
        subscriber: {
            required: true,
            maxlength: 253
        },
        footer: {
            required: true,
            maxlength: 253
        },
        copyright: {
            required: true,
            maxlength: 253
        },
        scroller: {
            required: true,
            maxlength: 253
        },
        scroller_hover: {
            required: true,
            maxlength: 253
        },
    };
    if ($('#frmUpdateThemeLightColor').length > 0) {
        ajaxRequest({
            element: 'frmUpdateThemeLightColor',
            validation: true,
            script: 'admin/theme/color/light/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateThemeDarkColor').length > 0) {
        ajaxRequest({
            element: 'frmUpdateThemeDarkColor',
            validation: true,
            script: 'admin/theme/color/dark/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});
