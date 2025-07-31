import { swiper } from '@orians/utils';

$(document).ready(function () {
    swiper({
        elements: ['latestSwiper', 'featureSwiper', 'headlineSwiper', 'categorySwiper', 'breakingAdsSwiper', 'headerAdsSwiper', 'middleAdsSwiper', 'trendingAdsSwiper', 'latestAdsSwiper', 'footerAdsSwiper',],
        directions: ['vertical', 'vertical', 'horizontal', 'horizontal', 'vertical', 'horizontal', 'horizontal', 'horizontal', 'horizontal', 'horizontal'],
        slidesPerViews: [4, 4, 1, 1, 1, 1, 1, 1, 1, 1,],
        loops: [true, true, true, true, true, true, true, true, true, true,],
        autoPlay: [{ delay: 3000 }, { delay: 4000 }, { delay: 4000 }, { delay: 3000 }, { delay: 5000 }, { delay: 5000 }, { delay: 5000 }, { delay: 5000 }, { delay: 5000 }, { delay: 5000 },],
        navigation: [false, false, { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, false, false, false, false, false, false,],
        pagination: [false, false, false, false, false, false, false, false, false, false,],
        breakpoints: [{ xs: 4, sm: 4, md: 4, lg: 4 }, { xs: 4, sm: 4, md: 4, lg: 4 }, { xs: 1, sm: 2, md: 2, lg: 1 }, { xs: 1, sm: 2, md: 2, lg: 4 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 }, { xs: 1, sm: 1, md: 1, lg: 1 },],
    });
});