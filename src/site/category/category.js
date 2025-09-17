import { ajaxRequest, isValidUrl, swiper, } from '@orians/utils';
$(document).ready(function () {
    if ($('#newsContainer').length > 0) {
        $('#newsContainer').on('click', '.pagination span', function () {
            if (!isValidUrl($(this).data('href'))) return;
            let url = new URL($(this).data('href'));
            const params = new URLSearchParams(url.search);
            const value = params.get('items');
            ajaxRequest({
                element: 'newsContainer',
                script: 'site/category/view/' + $('#newsContainer').data('category'),
                type: 'request',
                dataType: 'json',
                body: { items: value },
                afterSuccess: {
                    type: 'load_html',
                    target: 'newsContainer',
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