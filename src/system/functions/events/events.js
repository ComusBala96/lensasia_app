import { actionModal, domain_url } from '@oriansoft/utils';
$(document).ready(function () {
    if ($('.side_menu_btn').length > 0) {
        $('.side_menu_btn').on('click', function (e) {
            e.preventDefault();
            if ($('.side_menu').hasClass('-translate-x-full')) {
                $('.side_menu').removeClass('-translate-x-full').addClass('translate-x-0');
                $('.side_menu_btn i').removeClass('fa-bars').addClass('fa-xmark');
            } else {
                $('.side_menu').addClass('-translate-x-full').removeClass('translate-x-0');
                $('.side_menu_btn i').removeClass('fa-xmark').addClass('fa-bars');
            }
        });
    }
    if ($('.side_menu_close').length > 0) {
        $('.side_menu_close').on('click', function (e) {
            e.preventDefault();
            $('.side_menu').addClass('-translate-x-full').removeClass('translate-x-0');
            $('.side_menu_btn i').removeClass('fa-xmark').addClass('fa-bars');
        });
    }
    if ($('.notification').length > 0) {
        $('.notification').on('click', function () {
            $('.notificationCard').slideToggle();
        });
    }
    if ($('.message').length > 0) {
        $('.message').on('click', function () {
            $('.messageCard').slideToggle();
        });
    }
    if ($('.user').length > 0) {
        $('.user').on('click', function () {
            $('.userCard').slideToggle();
        });
    }
    $('.menu').on('click', function (e) {
        e.preventDefault();
        $(this).next('.submenu').slideToggle();
        $(this).find('.fa-angle-right').toggleClass('rotate-90');
    });

    if ($('.scroll').length > 0) {
        $('html, .sidebar_scroll').animate({
            scrollTop: $('.scroll').offset().top - 400
        }, 500);
    }
    if ($('.colorMode').length > 0) {
        $('.colorMode').on('click', function () {
            if (localStorage.getItem('color-theme') === 'light') {
                localStorage.setItem('color-theme', 'dark');
                window.location.href = `${domain_url + 'update/color/dark'}`;
                $('html').addClass('dark');
            } else {
                localStorage.setItem('color-theme', 'light');
                window.location.href = `${domain_url + 'update/color/light'}`;
                $('html').removeClass('dark');
            }

        });
    }
    $('#closeError').on('click', function () {
        $('#showErros').html('');
        $('#errorBase').removeClass('activateErrors').fadeOut(500);
    });
    $('#closeDownload').on('click', function () {
        $('#theDownloadLoader').css({ display: 'none' });
    });
    $('.btn-close').on('click', function () {
        $(this).parent().hide();
    });

    $('.site_lang').on('click', function () {
        let lang = $(this).data('lang');
        window.location.href = `${domain_url + 'site/lang/' + lang}`;
    });
    $('.admin_lang').on('click', function () {
        let lang = $(this).data('lang');
        window.location.href = `${domain_url + 'admin/lang/' + lang}`;
    });
    $('.hoverMenu').on('mouseover', function (e) {
        e.stopPropagation();
        $(this).children('.newsContent').stop(true, true).fadeIn(200);
        $('.userCard').slideUp().stop(true, true);
    });
    $('.hoverMenu').on('mouseout', function (e) {
        let submenu = $(this).children('.newsContent');
        if (!$(this).is(e.relatedTarget) && !submenu.is(e.relatedTarget) && submenu.has(e.relatedTarget).length === 0) {
            submenu.stop(true, true).fadeOut();
        }
    });
    $('.hoverMore').on('mouseover', function (e) {
        e.stopPropagation();
        $(this).children('.moreContent').stop(true, true).fadeIn(200);
        $('.userCard').slideUp().stop(true, true);
    });
    $('.hoverMore').on('mouseout', function (e) {
        let submenu = $(this).children('.moreContent');
        if (!$(this).is(e.relatedTarget) && !submenu.is(e.relatedTarget) && submenu.has(e.relatedTarget).length === 0) {
            submenu.stop(true, true).fadeOut();
        }
    });

    $(document).on('click', '[data-modal-target]', function (e) {
        let trig = $(this);
        const modalId = trig.data('modal-target');
        const op = JSON.parse(trig.attr('data-edit-prop') || '{}');
        $('#' + modalId).removeClass('hidden').addClass('flex');
        actionModal(op);
    });
    $('.modal-close').on('click', function () {
        $('#editModal').addClass('hidden').removeClass('flex');
        $('.modal-body, .modal-title').html('');
    });
});
