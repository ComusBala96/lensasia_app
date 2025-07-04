import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@oriansoft/utils';
    
$(document).ready(function () {
    if ($('#frmCreatePermission').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253,
            },
        };
        ajaxRequest({
            element: 'frmCreatePermission',
            validation: true,
            script: 'admin/users/access/permission/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
            },
        });
    }
    if ($('#frmUpdatePermission').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdatePermission',
            validation: true,
            script: 'admin/users/access/permission/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    
    if ($('#dtPermission').length > 0) {
        const lang = G.pageLang;
        const {table} = lang;
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
                    return `<a href="${domain_url}admin/users/access/permission/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtPermission', {
            select: true,
            url: 'admin/users/access/permission/list',
            columns: col_draft,
            pdf: [0, 2, 3],
        });
    }
});
    
window.dtPermission = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllPermission',
        script: 'admin/users/access/permission/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllPermission',
        script: 'admin/users/access/permission/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadPermissionPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadPermissionExcel', dataTable: 'yes' });
};