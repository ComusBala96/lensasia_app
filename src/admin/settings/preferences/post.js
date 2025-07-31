import { ajaxRequest } from '@orians/utils';

$(document).ready(function () {
    if ($('#frmUpdatePostPreferences').length > 0) {
        let rules = {
            comments: {
                required: true,
            },            
            post_date: {
                required: true,
            },            
            social_link: {
                required: true,
            },            
            print_option: {
                required: true,
            },            
            author: {
                required: true,
            },            
            article_module: {
                required: true,
            },            
            gallery_module: {
                required: true,
            },            
            video_module: {
                required: true,
            },            
            poll_module: {
                required: true,
            },            
            vote_module: {
                required: true,
            },            
        };
        ajaxRequest({
            element: 'frmUpdatePostPreferences',
            validation: true,
            script: 'admin/settings/preferences/post/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});