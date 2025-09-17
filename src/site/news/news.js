import { ajaxRequest, domain_url, isValidUrl, MakePdf, swiper } from '@orians/utils';

$(document).ready(function () {
    if ($('.newsSwiper').length > 0) {
        swiper({
            elements: ['newsSwiper', 'sideAdsEvenSwiper', 'sideAdsOddSwiper', 'newsAdSwiper1', 'newsAdSwiper2'],
            directions: ['horizontal', 'vertical', 'vertical', 'horizontal', 'horizontal',],
            slidesPerViews: [1, 1, 1, 1, 1,],
            loops: [true, true, true, true, true,],
            autoPlay: [false, { delay: 5000 }, { delay: 5000 }, { delay: 3000 }, { delay: 7000 },],
            navigation: [{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, false, false, false, false,],
            pagination: [{ el: '.swiper-pagination', clickable: true, }, false, false, false, false,],
            breakpoints: [{ sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 },],
        });
    }
    if ($('#news_content').length > 0) {
        $('#news_content p').each(function (index) {
            const adId = 'ad' + (index + 1);
            const hiddenDiv = `<div id="${adId}" data-style='{"opacity":0}'></div>`;
            $(this).after(hiddenDiv);
        });
    }
    if ($('#news_content_pdf').length > 0) {
        $('#news_content_pdf p, #news_content_pdf br').attr('data-style', '{"alignment":"justify","fontSize":"8","margin":[0,5,0,0]}');
    }
    if ($('#news_print').length > 0) {
        $('#news_print').on('click', function () {
            $('#theDownloadLoader').show();
            setTimeout(() => {
                $('#theDownloadLoader').hide();
            }, 3000);           
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
                script: 'site/news/view/' + $('#moreNews').data('uuid'),
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
    if ($('#frmComment').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
            email: {
                required: true,
                maxlength: 253
            },
            comment: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmComment',
            validation: true,
            script: 'admin/comment/comments/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data'

            }
        });
    }
    if ($('#newsHeaderAds').length > 0) {
        $('#newsHeaderAds').find('.popup-close').click(function () {
            $('#newsHeaderAds').fadeOut(function () {
                $('#newsHeaderAdsBar').fadeIn();
            });
        });
        $('#openNewsHeaderAdsBar').click(function () {
            $('#newsHeaderAdsBar').fadeOut(function () {
                $('#newsHeaderAds').fadeIn();
            });
        });
    }
    if ($('#newsFooterAds').length > 0) {
        $('#newsFooterAds').find('.popup-close').click(function () {
            $('#newsFooterAds').fadeOut(function () {
                $('#newsFooterAdsBar').fadeIn();
            });
        });
        $('#openNewsFooterAdsBar').click(function () {
            $('#newsFooterAdsBar').fadeOut(function () {
                $('#newsFooterAds').fadeIn();
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