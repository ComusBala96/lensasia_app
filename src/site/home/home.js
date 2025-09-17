import { ajaxRequest, swiper } from '@orians/utils';
import html2canvas from 'html2canvas';

$(document).ready(function () {
    swiper({
        elements: ['latestSwiper', 'featureSwiper', 'pollSwiper', 'categorySwiper', 'breakingAdsSwiper', 'headerAdsSwiper', 'middleAdsSwiper', 'trendingAdsSwiper', 'latestAdsSwiper', 'footerAdsSwiper', 'middlePopupAdsSwiper', 'footerPopupAdsSwiper',],
        directions: ['horizontal', 'vertical', 'horizontal', 'horizontal', 'vertical', 'horizontal', 'horizontal', 'horizontal', 'horizontal', 'horizontal', 'horizontal', 'vertical',],
        slidesPerViews: [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        loops: [false, true, false, true, true, true, true, true, true, true, true, true,],
        autoPlay: [false, { delay: 4000 }, false, { delay: 3000 }, { delay: 5000 }, { delay: 5000 }, { delay: 5000 }, { delay: 5000 }, { delay: 5000 }, { delay: 5000 }, { delay: 3000 }, { delay: 3000 },],
        navigation: [false, false, { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, false, false, false, false, false, false, false, false,],
        pagination: [{ el: '.swiper-pagination', type: 'bullets', clickable: true }, false, false, false, false, false, false, false, false, false, false, false,],
        breakpoints: [{ xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 5, sm: 5, md: 5, lg: 5 }, { xs: 1, sm: 2, md: 2, lg: 1 }, { xs: 1, sm: 2, md: 2, lg: 4 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 },],
    });
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
    if ($('#breakingAds').length > 0) {
        $('#breakingAds').find('.popup-close').click(function () {
            $('#breakingAds').fadeOut(function () {
                $('#breakingAdsBar').fadeIn();
            });
        });
        $('#openBreakingAdsBar').click(function () {
            $('#breakingAdsBar').fadeOut(function () {
                $('#breakingAds').fadeIn();
            });
        });
    }
    if ($('#headerAds').length > 0) {
        $('#headerAds').find('.popup-close').click(function () {
            $('#headerAds').fadeOut(function () {
                $('#headerAdsBar').fadeIn();
            });
        });
        $('#openHeaderAdsBar').click(function () {
            $('#headerAdsBar').fadeOut(function () {
                $('#headerAds').fadeIn();
            });
        });
    }
    if ($('#middleAds').length > 0) {
        $('#middleAds').find('.popup-close').click(function () {
            $('#middleAds').fadeOut(function () {
                $('#middleAdsBar').fadeIn();
            });
        });
        $('#openMiddleAdsBar').click(function () {
            $('#middleAdsBar').fadeOut(function () {
                $('#middleAds').fadeIn();
            });
        });
    }
    if ($('#trendingAds').length > 0) {
        $('#trendingAds').find('.popup-close').click(function () {
            $('#trendingAds').fadeOut(function () {
                $('#trendingAdsBar').fadeIn();
            });
        });
        $('#openTrendingAdsBar').click(function () {
            $('#trendingAdsBar').fadeOut(function () {
                $('#trendingAds').fadeIn();
            });
        });
    }
    if ($('#latestAds').length > 0) {
        $('#latestAds').find('.popup-close').click(function () {
            $('#latestAds').fadeOut(function () {
                $('#latestAdsBar').fadeIn();
            });
        });
        $('#openLatestAdsBar').click(function () {
            $('#latestAdsBar').fadeOut(function () {
                $('#latestAds').fadeIn();
            });
        });
    }
    if ($('#footerAds').length > 0) {
        $('#footerAds').find('.popup-close').click(function () {
            $('#footerAds').fadeOut(function () {
                $('#footerAdsBar').fadeIn();
            });
        });
        $('#openFooterAdsBar').click(function () {
            $('#footerAdsBar').fadeOut(function () {
                $('#footerAds').fadeIn();
            });
        });
    }
    if ($('#middlePopupAds').length > 0) {
        var $popup = $('#middlePopupAds');
        var $mouseOver = $('.mouse-over');
        if (!$popup.length) return;
        var showDelay = 3000;
        var visibleDuration = 9000;
        var animationMs = 400;
        var autoCloseTimer = null;
        function clearAutoTimer() {
            if (autoCloseTimer) {
                clearTimeout(autoCloseTimer);
                autoCloseTimer = null;
            }
        }
        function startAutoCloseTimer() {
            clearAutoTimer();
            autoCloseTimer = setTimeout(function () {
                closePopup();
            }, visibleDuration);
        }
        function openPopup() {
            if ($popup.hasClass('show')) {
                startAutoCloseTimer();
                return;
            }
            $popup.css('display', 'flex');
            $popup[0].offsetHeight;
            $popup.addClass('show');
            startAutoCloseTimer();
            $popup.attr('aria-hidden', 'false');
        }
        function closePopup() {
            clearAutoTimer();
            $popup.removeClass('show');
            setTimeout(function () {
                if (!$popup.hasClass('show')) {
                    $popup.css('display', 'none');
                    $popup.attr('aria-hidden', 'true');
                }
            }, animationMs + 20);
        }
        setTimeout(function () {
            openPopup();
        }, showDelay);
        $popup.find('.popup-close').click(function () {
            closePopup();
        });
        $(document).on('mouseup', function (e) {
            var $content = $popup.find('.mouse-over');
            if ($popup.hasClass('show') && !$content.is(e.target) && $content.has(e.target).length === 0) {
                closePopup();
            }
        });
        $mouseOver.on('mouseenter', function () {
            clearAutoTimer();
        }).on('mouseleave', function () {
            startAutoCloseTimer();
        });
    }

    if ($('#footerPopupAd').length > 0) {
        setTimeout(function () {
            $('#footerPopupAd').slideDown();
        }, 9000);
        $('#footerPopupAd').find('.popup-close').click(function () {
            $('#footerPopupAd').slideUp(function () {
                $('#footerOpenBar').slideDown();
            });
        });
        $('#openPopupBtn').click(function () {
            $('#footerOpenBar').slideUp(function () {
                $('#footerPopupAd').slideDown();
            });
        });
    }
});