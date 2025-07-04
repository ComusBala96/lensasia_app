import { ajaxRequest } from '@oriansoft/utils';

$(document).ready(function () {
    let loadProfile = localStorage.getItem('loadProfile');
    if ($('#loadProfilePage').length > 0 && $('#loadAboutPage').length > 0) {
        if (loadProfile == 'true' || loadProfile == null) {
            loadProfileHome();
        } else {
            loadAboutPage();
        }
    }
    if ($('#loadProfilePage').length > 0) {
        $('#loadProfilePage').on('click', function () {
            localStorage.setItem('loadProfile', true);
            loadProfileHome();
        });
    }
    if ($('#loadAboutPage').length > 0) {
        $('#loadAboutPage').on('click', function () {
            localStorage.setItem('loadProfile', false);
            loadAboutPage();
        });
    }
});

function loadProfileHome() {
    $('#loadProfilePage').addClass('bg-body-blue text-white rounded-md');
    $('#loadAboutPage').removeClass('bg-body-blue text-white rounded-md');
    ajaxRequest({
        element: 'loadProfilePage',
        script: 'site/user/profile/load/home',
        type: 'request',
        dataType: 'json',
        body: { uuid: $('#loadProfilePage').data('uuid') },
        globLoader: false,
        status: false,
        afterSuccess: {
            type: 'load_html',
            target: 'loadProfileContent',
        },
    });
}

function loadAboutPage() {
    $('#loadProfilePage').removeClass('bg-body-blue text-white rounded-md');
    $('#loadAboutPage').addClass('bg-body-blue text-white rounded-md');
    ajaxRequest({
        element: 'loadAboutPage',
        script: 'site/user/profile/load/about',
        type: 'request',
        dataType: 'json',
        body: { uuid: $('#loadAboutPage').data('uuid') },
        globLoader: false,
        status: false,
        afterSuccess: {
            type: 'load_html',
            target: 'loadProfileContent',
        },
    });
}
