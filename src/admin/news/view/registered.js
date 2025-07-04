import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable, MakePdf, swiper } from '@oriansoft/utils';
    
$(document).ready(function () {
    if ($('.newsSwiper').length > 0) {
        swiper({
            elements: ['newsSwiper',],
            directions: ['horizontal',],
            slidesPerViews: [1,],
            loops: [true,],
            autoPlay: [false,],
            navigation: [{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },],
            pagination: [{ el: '.swiper-pagination', clickable: true, },],
            breakpoints: [{ sm: 1, md: 1, lg: 1 },],
        });
    }
    if ($('#news_content').length > 0) {
        $('#news_content p, #news_content br').attr('data-style', '{"alignment":"justify","fontSize":"8","margin":[0,5,0,0]}');
    }
    if ($('#news_print').length > 0) {
        $('#news_print').on('click', function () {
            let op = JSON.parse($(this).attr('data-pdf-op'));
            MakePdf({ ...op });
        });
    }    
    if ($('#dtRegistered').length > 0) {
        const lang = G.pageLang;
        const {table} = lang;
        let col_draft = [
            {
                data: 'id',
                title: table?.col?.id,
            },
            {
                data: 'news',
                title: table?.col?.news,
            },
            {
                data: 'type',
                title: table?.col?.type,
            },
            {
                data: 'category',
                title: table?.col?.category,
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
                    return `<a href="${domain_url}admin/news/show/registered/view/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-eye"></i></span></a>
                            <button data-uuid="${data.uuid}" class="private"><span class="px-2 py-1 rounded-md shadow-md text-white bg-body-blue">Public</span></button>`;
                },
            },
        ];
        makeAjaxDataTable('dtRegistered', {
            select: false,
            url: 'admin/news/show/registered/list',
            columns: col_draft,
            pdf: [0, 1, 3, 4, 6, 7],
        });
    }
});
    
window.dtRegistered = (table, api, op) => {
    if ($('.private').length > 0) {
        $('.private').on('click', function () {
            ajaxRequest({
                element: 'private',
                confirm: true,
                script: 'admin/news/show/registered/update',
                type:'request',
                dataType:'json',
                body: { uuid: $(this).data('uuid') ?? '', updated_by: $('#updated_by').val() ?? '' },
                afterSuccess: {
                    type: '',
                },
            });
        });
    }
    downloadPdf({ ...op, btn: 'downloadRegisteredPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadRegisteredExcel', dataTable: 'yes' });
};