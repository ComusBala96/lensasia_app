import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable, MakePdf } from '@orians/utils';

$(document).ready(function () {
    if ($('#video_print').length > 0) {
        $('#video_print').on('click', function () {
            let op = JSON.parse($(this).attr('data-pdf-op'));
            MakePdf({ ...op });
        });
    }
    if ($('#dtVideoScheduled').length > 0) {
        const lang = G.pageLang;
        const { table } = lang;
        let col_draft = [
            {
                data: 'id',
                title: table?.col?.id,
            },
            {
                data: 'video',
                title: table?.col?.video,
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
                data: 'scheduled_at',
                title: table?.col?.scheduled_at,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/video/scheduled/view/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-eye"></i></span></a>
                            <button data-uuid="${data.uuid}" class="scheduled whitespace-nowrap"><span class="px-2 py-1 rounded-md shadow-md text-white bg-body-blue">Publish Now</span></button>`;
                },
            },
        ];
        makeAjaxDataTable('dtVideoScheduled', {
            select: false,
            url: 'admin/video/scheduled/list',
            columns: col_draft,
            pdf: [0, 1, 2, 3, 4, 5, 6, 7],
        });
    }
});

window.dtVideoScheduled = (table, api, op) => {
    if ($('.scheduled').length > 0) {
        $('.scheduled').on('click', function () {
            ajaxRequest({
                element: 'scheduled',
                confirm: true,
                script: 'admin/video/scheduled/update',
                type: 'request',
                dataType: 'json',
                body: { uuid: $(this).data('uuid') ?? '', updated_by: $('#updated_by').val() ?? '' },
                afterSuccess: {
                    type: '',
                },
            });
        });
    }
    downloadPdf({ ...op, btn: 'downloadVideoScheduledPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadVideoScheduledExcel', dataTable: 'yes' });
};