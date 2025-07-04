import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@oriansoft/utils';

$(document).ready(function () {
    if ($('#frmCreateMessageReplay').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253,
            },
        };
        ajaxRequest({
            element: 'frmCreateMessageReplay',
            validation: true,
            script: 'admin/message/replay/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
            },
        });
    }
    if ($('#frmUpdateMessageReplay').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdateMessageReplay',
            validation: true,
            script: 'admin/message/replay/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtMessageReplay').length > 0) {
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
                data: 'subject',
                title: table?.col?.subject,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/message/replay/view/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-eye"></i></span></a>`;
                },
            },
        ];

        const role = $('#role').val();
        let pdf = [0, 2, 3, 4];
        if (role == 'Lensasia') {
            pdf = [0, 2, 3, 4, 5, 6];
            let new_col_draft = [
                {
                    data: 'email',
                    title: table?.col?.email,
                },
                {
                    data: 'phone',
                    title: table?.col?.phone,
                },
            ];
            col_draft.splice(3, 0, ...new_col_draft);
        }
        makeAjaxDataTable('dtMessageReplay', {
            select: true,
            url: 'admin/message/replay/list',
            columns: col_draft,
            pdf: pdf,
        });
    }
});

window.dtMessageReplay = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllMessageReplay',
        script: 'admin/message/replay/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllMessageReplay',
        script: 'admin/message/replay/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadMessageReplayPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadMessageReplayExcel', dataTable: 'yes' });
};