import { backToTop, clickToHide, loadBounceOnceAnimation, loadLocalStorage, pageAction, scrollToHideShow } from '@orian/utils';

$(document).ready(function () {
    loadLocalStorage();
    pageAction();
    loadBounceOnceAnimation();
    clickToHide((e) => {
        if ($('.messageCard').length > 0 && $('.message').length > 0) {
            if (!$('.messageCard')[0].contains(e.target) && $('.message')[0] !== e.target) {
                $('.messageCard').slideUp().stop(true, true);
            }
        }
        if ($('.notificationCard').length > 0 && $('.notification').length > 0) {
            if (!$('.notificationCard')[0].contains(e.target) && $('.notification')[0] !== e.target) {
                $('.notificationCard').slideUp().stop(true, true);
            }
        }
        if ($('.userCard').length > 0 && $('.user').length > 0) {
            if (!$('.userCard')[0].contains(e.target) && $('.user')[0] !== e.target) {
                $('.userCard').slideUp().stop(true, true);
            }
        }
        if ($('.side_menu').length > 0 && $('.side_menu_btn').length > 0) {
            if (!$('.side_menu_btn')[0].contains(e.target) && !$('.side_menu')[0].contains(e.target) && $('.side_menu')[0] !== e.target) {
                $('.side_menu').addClass('-translate-x-full').removeClass('translate-x-0');
                $('.side_menu_btn i').removeClass('fa-xmark').addClass('fa-bars');
            }
        }
    });
    if ($('#btn-back-to-top').length > 0) {
        scrollToHideShow(() => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                $('#btn-back-to-top').removeClass('hidden');
            } else {
                $('#btn-back-to-top').addClass('hidden');
            }
        });
        backToTop('btn-back-to-top', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
