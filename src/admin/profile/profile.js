import { ajaxRequest, csrf_token } from '@orian/utils';

$(document).ready(function () {
    if ($('#cover').length > 0) {
        $('#cover').on('change', function (e) {
            let file = e.target.files[0];
            if (typeof file === 'object') {
                $('#frmCover').submit();
            }
        });
    }
    if ($('#frmCover').length > 0) {
        let rules = {
            cover: {
                required: true,
                extension: 'jpeg|jpg|png|webp',
            }
        };
        ajaxRequest({
            element: 'frmCover',
            validation: true,
            rules,
            script: 'admin/profile/settings/cover/update',
            afterSuccess: {
                type: '',
            },
        });
    }
    if ($('#profile').length > 0) {
        $('#profile').on('change', function (e) {
            let file = e.target.files[0];
            if (typeof file === 'object') {
                $('#frmProfile').submit();
            }
        });
    }
    if ($('#frmProfile').length > 0) {
        let rules = {
            profile: {
                required: true,
                extension: 'jpeg|jpg|png|webp',
            }
        };
        ajaxRequest({
            element: 'frmProfile',
            validation: true,
            rules,
            script: 'admin/profile/settings/profile/update',
            afterSuccess: {
                type: '',
            },
        });
    }
    if ($('#frmUpdateLoggedUserInfo').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
            email: {
                required: true,
                maxlength: 253
            },
            phone: {
                required: true,
                maxlength: 253
            },
            about: {
                required: false,
            },
        };
        ajaxRequest({
            element: 'frmUpdateLoggedUserInfo',
            validation: true,
            script: 'admin/profile/settings/user/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateLoggedUserSocial').length > 0) {
        let rules = {
            facebook: {
                required: false,
            },
            twitter: {
                required: false,
            },
            instagram: {
                required: false,
            },
            linkedin: {
                required: false,
            },
            telegram: {
                required: false,
            },
            youtube: {
                required: false,
            },
            tiktok: {
                required: false,
            },
            website: {
                required: false,
            },

        };
        ajaxRequest({
            element: 'frmUpdateLoggedUserSocial',
            validation: true,
            script: 'admin/profile/settings/social/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateLoggedUserPassword').length > 0) {
        let rules = {
            current_password: {
                required: true,
                maxlength: 253
            },
            password: {
                required: true,
                maxlength: 253
            },
            password_confirmation: {
                required: true,
                maxlength: 253
            },

        };
        ajaxRequest({
            element: 'frmUpdateLoggedUserPassword',
            validation: true,
            script: 'admin/profile/settings/password/update',
            rules,
            afterSuccess: {
                type: 'inflate_redirect_response_data'
            }
        });
    }
    if ($('#frmUpdateGoogle2FA').length > 0) {
        let rules = {
            otp: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateGoogle2FA',
            validation: true,
            script: 'admin/profile/google-2fa/update',
            rules,
            afterSuccess: {
                type: ''
            }
        });
    }
});