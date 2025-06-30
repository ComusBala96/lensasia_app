import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@orian/utils';

$(document).ready(function () {
    if ($('#frmCreateManageUsers').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253,
            },
            email: {
                required: true,
                maxlength: 253,
            },
            phone: {
                required: true,
                maxlength: 253,
            },
            password: {
                required: true,
                maxlength: 253,
            },
            password_confirmation: {
                required: true,
                maxlength: 253,
            },
            role: {
                required: true,
                maxlength: 253,
            },
        };
        ajaxRequest({
            element: 'frmCreateManageUsers',
            validation: true,
            script: 'admin/users/manage/create/users/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
            },
        });
    }
    if ($('#frmUpdateManageUsers').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253,
            },
            email: {
                required: true,
                maxlength: 253,
            },
            phone: {
                required: true,
                maxlength: 253,
            },
            role: {
                required: true,
                maxlength: 253,
            },
        };
        ajaxRequest({
            element: 'frmUpdateManageUsers',
            validation: true,
            script: 'admin/users/manage/create/users/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtManageUsers').length > 0) {
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
                data: 'profile',
                title: table?.col?.profile,
            },
            {
                data: 'name',
                title: table?.col?.name,
            },
            {
                data: 'role',
                title: table?.col?.role,
            },
            {
                data: 'permissions',
                title: table?.col?.permissions,
            },
            {
                data: 'email',
                title: table?.col?.email,
            },
            {
                data: 'phone',
                title: table?.col?.phone,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/users/manage/create/users/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtManageUsers', {
            select: true,
            url: 'admin/users/manage/create/users/list',
            columns: col_draft,
            pdf: [3, 4, 5, 6, 8],
        });
    }
});

window.dtManageUsers = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllManageUsers',
        script: 'admin/users/manage/create/users/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllManageUsers',
        script: 'admin/users/manage/create/users/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadManageUsersPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadManageUsersExcel', dataTable: 'yes' });
};