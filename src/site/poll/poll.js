import { ajaxRequest, isValidUrl } from '@orians/utils';
import html2canvas from 'html2canvas';

$(document).ready(function () {
    $(document).on('click', '.poll-container input[type=radio]', function () {
        let option_uuid = $(this).data('option_uuid');
        let poll_uuid = $(this).data('poll_uuid');
        let $pollBox = $(this).closest('#poll-' + poll_uuid);;
        ajaxRequest({
            element: 'frmCreatePoll-' + poll_uuid,
            script: 'site/poll/vote',
            type: 'request',
            dataType: 'json',
            body: { option_uuid, poll_uuid },
            afterSuccess: {
                type: 'api_response',
                afterLoad: (op) => {
                    if (op.response.success) {
                        $pollBox.load(location.href + ' #poll-' + poll_uuid);
                    };
                }
            }
        });
    });
    if ($('#pollContainer').length > 0) {
        $('#pollContainer').on('click', '.pagination span', function () {
            if (!isValidUrl($(this).data('href'))) return;
            let url = new URL($(this).data('href'));
            const params = new URLSearchParams(url.search);
            const value = params.get('items');
            ajaxRequest({
                element: 'pollContainer',
                script: 'site/poll/show',
                type: 'request',
                dataType: 'json',
                body: { items: value },
                afterSuccess: {
                    type: 'load_html',
                    target: 'pollContainer',
                }
            });
        });
    }
    $(document).on('click', '.print_poll', function () {
        let uuid = $(this).data('uuid');
        ajaxRequest({
            element: 'poll_image',
            script: 'site/poll/image/download',
            type: 'request',
            dataType: 'json',
            body: { uuid },
            afterSuccess: {
                type: 'load_html',
                target: 'poll_image',
                afterLoad: (op) => {
                    const target = $('#poll_image #html2image')[0];
                    if (!target) {
                        console.error('Target not found!');
                        return;
                    }
                    html2canvas(target, {
                        useCORS: true,
                        backgroundColor: '#fff'
                    }).then((canvas) => {
                        const link = document.createElement('a');
                        link.href = canvas.toDataURL('image/png');
                        link.download = 'Lens_Asia_poll_' + uuid + '.png';
                        link.click();
                        $('#poll_image').empty();
                    });
                }
            }
        });
    });
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