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
});