import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@orian/utils';

$(document).ready(function () {
    if ($('#frmCreateRole').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253,
            },
        };
        ajaxRequest({
            element: 'frmCreateRole',
            validation: true,
            script: 'admin/users/access/role/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
            },
        });
    }
    if ($('#frmUpdateRole').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdateRole',
            validation: true,
            script: 'admin/users/access/role/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtRole').length > 0) {
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
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/users/access/role/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtRole', {
            select: true,
            url: 'admin/users/access/role/list',
            columns: col_draft,
            pdf: [0, 2, 3],
        });
    }
});

window.dtRole = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllRole',
        script: 'admin/users/access/role/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllRole',
        script: 'admin/users/access/role/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadRolePdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadRoleExcel', dataTable: 'yes' });
};