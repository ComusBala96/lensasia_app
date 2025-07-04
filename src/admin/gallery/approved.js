import { domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable, MakePdf, swiper } from '@oriansoft/utils';

$(document).ready(function () {
    if ($('.gallerySwiper').length > 0) {
        swiper({
            elements: ['gallerySwiper',],
            directions: ['horizontal',],
            slidesPerViews: [1,],
            loops: [true,],
            autoPlay: [false,],
            navigation: [{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },],
            pagination: [{ el: '.swiper-pagination', clickable: true, },],
            breakpoints: [{ sm: 1, md: 1, lg: 1 },],
        });
    }
    if ($('#gallery_print').length > 0) {
        $('#gallery_print').on('click', function () {
            let op = JSON.parse($(this).attr('data-pdf-op'));
            MakePdf({ ...op });
        });
    }
    if ($('#dtGalleryApproved').length > 0) {
        const lang = G.pageLang;
        const { table } = lang;
        let col_draft = [
            {
                data: 'id',
                title: table?.col?.id,
            },
            {
                data: 'gallery',
                title: table?.col?.gallery,
            },
            {
                data: 'author',
                title: table?.col?.author,
            },
            {
                data: 'visibility',
                title: table?.col?.visibility,
            },
            {
                data: 'views',
                title: table?.col?.views,
            },
            {
                data: 'published_at',
                title: table?.col?.published_at,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/gallery/approved/view/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-eye"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtGalleryApproved', {
            select: false,
            url: 'admin/gallery/approved/list',
            columns: col_draft,
            pdf: [0, 1, 2, 3, 4, 5, 6],
        });
    }
});

window.dtGalleryApproved = (table, api, op) => {
    downloadPdf({ ...op, btn: 'downloadGalleryApprovedPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadGalleryApprovedExcel', dataTable: 'yes' });
};