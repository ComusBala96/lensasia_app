import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable, MakePdf } from '@oriansoft/utils';

$(document).ready(function () {
    if ($('#video_print').length > 0) {
        $('#video_print').on('click', function () {
            let op = JSON.parse($(this).attr('data-pdf-op'));
            MakePdf({ ...op });
        });
    }
    if ($('#dtVideoPrivate').length > 0) {
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
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/video/private/view/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-eye"></i></span></a>
                            <button data-uuid="${data.uuid}" class="private whitespace-nowrap"><span class="px-2 py-1 rounded-md shadow-md text-white bg-body-blue">Public</span></button>`;
                },
            },
        ];
        makeAjaxDataTable('dtVideoPrivate', {
            select: false,
            url: 'admin/video/private/list',
            columns: col_draft,
            pdf: [0, 1, 2, 3, 4, 5, 6],
        });
    }
});

window.dtVideoPrivate = (table, api, op) => {
    if ($('.private').length > 0) {
        $('.private').on('click', function () {
            ajaxRequest({
                element: 'private',
                confirm: true,
                script: 'admin/video/private/update',
                type: 'request',
                dataType: 'json',
                body: { uuid: $(this).data('uuid') ?? '', updated_by: $('#updated_by').val() ?? '' },
                afterSuccess: {
                    type: '',
                },
            });
        });
    }
    downloadPdf({ ...op, btn: 'downloadVideoPrivatePdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadVideoPrivateExcel', dataTable: 'yes' });
};