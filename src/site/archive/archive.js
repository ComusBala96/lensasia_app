import { ajaxRequest, dp, isValidUrl, swiper, } from '@orians/utils';
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
                script: 'site/archive',
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
    if ($('#frmArchive').length > 0) {

        dp({
            format: 'Y-m-d'
        });
        let rules = {
            category: {
                required: false,
            },
            from: {
                required: false,
                maxlength: 253
            },
            to: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmArchive',
            validation: true,
            script: 'site/archive',
            rules,
            afterSuccess: {
                type: 'load_html',
                target: 'loadArchiveContent',
                afterLoad: () => {
                    if ($('#archiveResult').length > 0) {
                        $('#archiveResult').on('click', '.pagination span', function () {
                            if (!isValidUrl($(this).data('href'))) return;
                            let url = new URL($(this).data('href'));
                            const params = new URLSearchParams(url.search);
                            const value = params.get('archive');
                            ajaxRequest({
                                element: 'archiveResult',
                                script: 'site/archive',
                                type: 'request',
                                dataType: 'json',
                                body: { category: $('#category').val(), from: $('#from').val(), to: $('#to').val(), archive: value },
                                afterSuccess: {
                                    type: 'load_html',
                                    target: 'archiveResult',
                                }
                            });
                        });
                    }
                }
            }
        });
    }
});