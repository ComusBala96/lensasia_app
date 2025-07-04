import { domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@oriansoft/utils';

$(document).ready(function () {
    if ($('#dtCommentReplays').length > 0) {
        const lang = G.pageLang;
        const { table } = lang;
        let col_draft = [
            {
                data: 'id',
                title: table?.col?.id,
            },
            {
                data: null,
                title: table?.col?.serial,
                render: function (data, type, row) {
                    return `<input type="number" value="${data.serial}" class="pl-2 py-1 border border-body-blue bg-white text-black focus:outline-none rounded-sm serial z-999">
                            <input type="hidden" value="${data.id}" class="ids">`;
                }
            },
            {
                data: 'name',
                title: table?.col?.name,
            },
            {
                data: 'email',
                title: table?.col?.email,
            },
            {
                data: 'comment',
                title: table?.col?.comment,
            },
            {
                data: 'replay',
                title: table?.col?.replay,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/comment/replays/view/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-eye"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtCommentReplays', {
            select: true,
            url: 'admin/comment/replays/list',
            columns: col_draft,
            pdf: [0, 2, 3, 4, 5],
        });
    }
});

window.dtCommentReplays = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllCommentReplays',
        script: 'admin/comment/replays/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllCommentReplays',
        script: 'admin/comment/replays/updateRow',
        confirm: true,
        dataCols: {
            key: 'ids',
            items: [
                {
                    index: 1,
                    name: 'ids',
                    type: 'input',
                    data: [],
                },
                {
                    index: 1,
                    name: 'serial',
                    type: 'input',
                    data: []
                }
            ]
        },
        api,
        afterSuccess: {
            type: 'inflate_response_data'
        }
    });
    downloadPdf({ ...op, btn: 'downloadCommentReplaysPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadCommentReplaysExcel', dataTable: 'yes' });
};