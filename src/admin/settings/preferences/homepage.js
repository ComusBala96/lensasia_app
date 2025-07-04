import { ajaxRequest } from '@oriansoft/utils';

$(document).ready(function () {
    if ($('#frmUpdateHomepagePreferences').length > 0) {
        let rules = {
            breaking: {
                required: true,
            },
            hero: {
                required: true,
            },
            trending: {
                required: true,
            },
            popular: {
                required: true,
            },
            latest: {
                required: true,
            },
            video: {
                required: true,
            },
            gallery: {
                required: true,
            },
            subscriber: {
                required: true,
            },
            footer_category: {
                required: true,
            },
            breaking_ad: {
                required: true,
            },
            latest_ad: {
                required: true,
            },
            trending_ad: {
                required: true,
            },
            header_ad: {
                required: true,
            },
            middle_ad: {
                required: true,
            },
            footer_ad: {
                required: true,
            },
            side_ad: {
                required: true,
            },
            news_ad: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateHomepagePreferences',
            validation: true,
            script: 'admin/settings/preferences/homepage/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});