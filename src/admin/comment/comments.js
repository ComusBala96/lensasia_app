import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@oriansoft/utils';

$(document).ready(function () {
    if ($('#frmReplayComments').length > 0) {
        let rules = {
            replay: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmReplayComments',
            validation: true,
            script: 'admin/comment/comments/replay',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data'
            }
        });
    }

    if ($('#dtComments').length > 0) {
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
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/comment/comments/edit/${data.uuid}"><span class="px-2 py-1 rounded-md shadow-md text-white" style="background-color:#2edcdc;">Replay</span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtComments', {
            select: true,
            url: 'admin/comment/comments/list',
            columns: col_draft,
            pdf: [0, 2, 3, 4],
        });
    }
});

window.dtComments = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllComments',
        script: 'admin/comment/comments/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllComments',
        script: 'admin/comment/comments/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadCommentsPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadCommentsExcel', dataTable: 'yes' });
};