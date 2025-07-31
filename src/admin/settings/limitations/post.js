import { ajaxRequest } from '@orians/utils';

$(document).ready(function () {
    if ($('#frmUpdateArticlePostLimit').length > 0) {
        let rules = {
            article_title_min: {
                required: true,
            },
            article_title_max: {
                required: true,
            },
            article_description_min: {
                required: true,
            },
            article_description_max: {
                required: true,
            },
            article_keywords_min: {
                required: true,
            },
            article_keywords_max: {
                required: true,
            },
            article_tags_min: {
                required: true,
            },
            article_tags_max: {
                required: true,
            },
            article_url_min: {
                required: true,
            },
            article_url_max: {
                required: true,
            },
            article_image_url_min: {
                required: true,
            },
            article_image_url_max: {
                required: true,
            },
            article_image_caption_min: {
                required: true,
            },
            article_image_caption_max: {
                required: true,
            },
            article_additional_images_min: {
                required: true,
            },
            article_additional_images_max: {
                required: true,
            },
            article_files_min: {
                required: true,
            },
            article_files_max: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateArticlePostLimit',
            validation: true,
            script: 'admin/settings/limitations/post/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateGalleryPostLimit').length > 0) {
        let rules = {
            gallery_title_min: {
                required: true,
            },
            gallery_title_max: {
                required: true,
            },
            gallery_description_min: {
                required: true,
            },
            gallery_description_max: {
                required: true,
            },
            gallery_keywords_min: {
                required: true,
            },
            gallery_keywords_max: {
                required: true,
            },
            gallery_tags_min: {
                required: true,
            },
            gallery_tags_max: {
                required: true,
            },
            gallery_url_min: {
                required: true,
            },
            gallery_url_max: {
                required: true,
            },
            gallery_image_url_min: {
                required: true,
            },
            gallery_image_url_max: {
                required: true,
            },
            gallery_image_caption_min: {
                required: true,
            },
            gallery_image_caption_max: {
                required: true,
            },
            gallery_additional_images_min: {
                required: true,
            },
            gallery_additional_images_max: {
                required: true,
            },
            gallery_files_min: {
                required: true,
            },
            gallery_files_max: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateGalleryPostLimit',
            validation: true,
            script: 'admin/settings/limitations/post/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateVideoPostLimit').length > 0) {
        let rules = {
            video_title_min: {
                required: true,
            },
            video_title_max: {
                required: true,
            },
            video_description_min: {
                required: true,
            },
            video_description_max: {
                required: true,
            },
            video_keywords_min: {
                required: true,
            },
            video_keywords_max: {
                required: true,
            },
            video_tags_min: {
                required: true,
            },
            video_tags_max: {
                required: true,
            },
            video_url_min: {
                required: true,
            },
            video_url_max: {
                required: true,
            },
            video_image_url_min: {
                required: true,
            },
            video_image_url_max: {
                required: true,
            },
            video_image_caption_min: {
                required: true,
            },
            video_image_caption_max: {
                required: true,
            },
            video_additional_images_min: {
                required: true,
            },
            video_additional_images_max: {
                required: true,
            },
            video_files_min: {
                required: true,
            },
            video_files_max: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateVideoPostLimit',
            validation: true,
            script: 'admin/settings/limitations/post/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdatePollPostLimit').length > 0) {
        let rules = {
            poll_question_min: {
                required: true,
            },
            poll_question_max: {
                required: true,
            },
            poll_option_min: {
                required: true,
            },
            poll_option_max: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdatePollPostLimit',
            validation: true,
            script: 'admin/settings/limitations/post/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateVotePostLimit').length > 0) {
        let rules = {
            vote_question_min: {
                required: true,
            },
            vote_question_max: {
                required: true,
            },
            vote_option_min: {
                required: true,
            },
            vote_option_max: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateVotePostLimit',
            validation: true,
            script: 'admin/settings/limitations/post/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});