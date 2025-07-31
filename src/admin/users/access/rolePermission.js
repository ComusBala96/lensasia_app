import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable, multi_select } from '@orians/utils';

$(document).ready(function () {
    if ($('#frmUpdateManageRolePermission').length > 0) {
        const lang = G.pageLang;
        const { placeholder } = lang;
        multi_select({
            element: 'permissions',
            tags: false,
            placeholder: placeholder?.permissions,
        });
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdateManageRolePermission',
            validation: true,
            script: 'admin/users/access/role/permission/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#dtManageRolePermission').length > 0) {
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
                title: table?.col?.role,
            },
            {
                data: 'permissions',
                title: table?.col?.permissions,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/users/access/roles/permissions/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtManageRolePermission', {
            select: true,
            url: 'admin/users/access/role/permission/list',
            body: { type: $('#list_type').val() ?? '' },
            columns: col_draft,
            pdf: [0, 2, 3, 4],
        });
    }
});

window.dtManageRolePermission = (table, api, op) => {
    // G.deleteAll({
    //     element: 'deleteAllManageRolePermission',
    //     script: 'admin/users/access/role/permission/delete',
    //     confirm: true,
    //     api,
    // });
    G.updateAll({
        element: 'updateAllManageRolePermission',
        script: 'admin/users/access/role/permission/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadManageRolePermissionPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadManageRolePermissionExcel', dataTable: 'yes' });
};