import { ajaxRequest, isValidUrl, swiper, } from '@orians/utils';
$(document).ready(function () {
    swiper({
        elements: ['sideAdsEvenSwiper', 'sideAdsOddSwiper',],
        directions: ['vertical', 'vertical',],
        slidesPerViews: [1, 1,],
        loops: [true, true,],
        autoPlay: [{ delay: 5000 }, { delay: 5000 },],
        navigation: [false, false,],
        pagination: [false, false,],
        breakpoints: [{ xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 },],
    });
    if ($('#moreNews').length > 0) {
        $('#moreNews').on('click', '.pagination span', function () {
            if (!isValidUrl($(this).data('href'))) return;
            let url = new URL($(this).data('href'));
            const params = new URLSearchParams(url.search);
            const value = params.get('items');
            ajaxRequest({
                element: 'moreNews',
                script: 'site/search',
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
    if ($('#frmSearch').length > 0) {
        let rules = {
            search: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmSearch',
            validation: true,
            script: 'site/search',
            rules,
            afterSuccess: {
                type: 'load_html',
                target: 'loadSearchContent',
                afterLoad: () => {
                    if ($('#searchResult').length > 0) {
                        $('#searchResult').on('click', '.pagination span', function () {
                            if (!isValidUrl($(this).data('href'))) return;
                            let url = new URL($(this).data('href'));
                            const params = new URLSearchParams(url.search);
                            const value = params.get('result');
                            ajaxRequest({
                                element: 'searchResult',
                                script: 'site/search',
                                type: 'request',
                                dataType: 'json',
                                body: { search: $('#search').val(), result: value },
                                afterSuccess: {
                                    type: 'load_html',
                                    target: 'searchResult',
                                }
                            });
                        });
                    }
                }
            }
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