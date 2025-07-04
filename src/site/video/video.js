import { ajaxRequest, isValidUrl, MakePdf, swiper } from '@oriansoft/utils';

$(document).ready(function () {
    if ($('#videoContainer').length > 0) {
        $('#videoContainer').on('click', '.pagination span', function () {
            if (!isValidUrl($(this).data('href'))) return;
            let url = new URL($(this).data('href'));
            const params = new URLSearchParams(url.search);
            const value = params.get('items');
            ajaxRequest({
                element: 'videoContainer',
                script: 'site/video/show',
                type: 'request',
                dataType: 'json',
                body: { items: value },
                afterSuccess: {
                    type: 'load_html',
                    target: 'videoContainer',
                }
            });
        });
    }
    if ($('.sideAdsEvenSwiper').length > 0) {
        swiper({
            elements: [ 'sideAdsEvenSwiper', 'sideAdsOddSwiper',],
            directions: [ 'vertical', 'vertical',],
            slidesPerViews: [ 1, 1],
            loops: [ true, true,],
            autoPlay: [ { delay: 5000 }, { delay: 5000 }],
            navigation: [ false, false,],
            pagination: [ false, false,],
            breakpoints: [{ xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 },],
        });
    }
    if ($('#video_content').length > 0) {
        $('#video_content p, #video_content br').attr('data-style', '{"alignment":"justify","fontSize":"8","margin":[0,5,0,0]}');
    }
    if ($('#video_print').length > 0) {
        $('#video_print').on('click', function () {
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
                script: 'site/video/view/' + $('#moreNews').data('uuid'),
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
});