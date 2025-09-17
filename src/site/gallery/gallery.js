import { ajaxRequest, isValidUrl, MakePdf, swiper } from '@orians/utils';

$(document).ready(function () {
    if ($('#galleryContainer').length > 0) {
        $('#galleryContainer').on('click', '.pagination span', function () {
            if (!isValidUrl($(this).data('href'))) return;
            let url = new URL($(this).data('href'));
            const params = new URLSearchParams(url.search);
            const value = params.get('items');
            ajaxRequest({
                element: 'galleryContainer',
                script: 'site/gallery/show',
                type: 'request',
                dataType: 'json',
                body: { items: value },
                afterSuccess: {
                    type: 'load_html',
                    target: 'galleryContainer',
                }
            });
        });
    }
    if ($('.gallerySwiper').length > 0) {
        swiper({
            elements: ['gallerySwiper', 'sideAdsEvenSwiper', 'sideAdsOddSwiper',],
            directions: ['horizontal', 'vertical', 'vertical',],
            slidesPerViews: [1, 1, 1],
            loops: [true, true, true,],
            autoPlay: [false, { delay: 5000 }, { delay: 5000 }],
            navigation: [{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, false, false,],
            pagination: [{ el: '.swiper-pagination', clickable: true, }, false, false,],
            breakpoints: [{ sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 },],
        });
    }
    if ($('#gallery_content').length > 0) {
        $('#gallery_content p, #gallery_content br').attr('data-style', '{"alignment":"justify","fontSize":"8","margin":[0,5,0,0]}');
    }
    if ($('#gallery_print').length > 0) {
        $('#gallery_print').on('click', function () {
            let op = JSON.parse($(this).attr('data-pdf-op'));
            MakePdf({ ...op });
        });
    }
    if ($('#moreNews').length > 0) {
        $('#moreNews').on('click', '.pagination span', function () {
            if (!isValidUrl($(this).data('href'))) return;
            let url = new URL($(this).data('href'));
            const params = new URLSearchParams(url.search);
            const value = params.get('items');
            ajaxRequest({
                element: 'moreNews',
                script: 'site/gallery/view/' + $('#moreNews').data('uuid'),
                type: 'request',
                dataType: 'json',
                body: { items: value },
                afterSuccess: {
                    type: 'load_html',
                    target: 'moreNews',
                }
            });
        });
    }
    if ($('#sideAdsEven').length > 0) {
        $('#sideAdsEven').find('.popup-close').click(function () {
            $('#sideAdsEven').fadeOut(function () {
                $('#sideAdsEvenBar').fadeIn();
            });
        });
        $('#openSideAdsEvenBar').click(function () {
            $('#sideAdsEvenBar').fadeOut(function () {
                $('#sideAdsEven').fadeIn();
            });
        });
    }
    if ($('#sideAdsOdd').length > 0) {
        $('#sideAdsOdd').find('.popup-close').click(function () {
            $('#sideAdsOdd').fadeOut(function () {
                $('#sideAdsOddBar').fadeIn();
            });
        });
        $('#openSideAdsOddBar').click(function () {
            $('#sideAdsOddBar').fadeOut(function () {
                $('#sideAdsOdd').fadeIn();
            });
        });
    }
});