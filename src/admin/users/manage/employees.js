import { ajaxRequest, csrf_token, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@orians/utils';

$(document).ready(function () {
    if ($('#cover').length > 0) {
        $('#cover').on('change', function (e) {
            let file = e.target.files[0];
            if (typeof file === 'object') {
                $('#frmCover').submit();
            }
        });
    }
    if ($('#frmCover').length > 0) {
        let rules = {
            cover: {
                required: true,
                extension: 'jpeg|png|webp',
            }
        };
        ajaxRequest({
            element: 'frmCover',
            validation: true,
            rules,
            script: 'admin/profile/settings/cover/update',
            afterSuccess: {
                type: '',
                afterLoad: () => {
                    $('#cover').value = '';
                }
            },
        });
    }
    if ($('#profile').length > 0) {
        $('#profile').on('change', function (e) {
            let file = e.target.files[0];
            if (typeof file === 'object') {
                $('#frmProfile').submit();
            }
        });
    }
    if ($('#frmProfile').length > 0) {
        let rules = {
            profile: {
                required: true,
                extension: 'jpg|jpeg|png|webp',
            }
        };
        ajaxRequest({
            element: 'frmProfile',
            validation: true,
            rules,
            script: 'admin/profile/settings/profile/update',
            afterSuccess: {
                type: '',
                afterLoad: () => {
                    $('#profile').value = '';
                }
            },
        });
    }
    if ($('#frmUpdateEmployeeInfo').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
            email: {
                required: true,
                maxlength: 253
            },
            phone: {
                required: true,
                maxlength: 253
            },
            about: {
                required: false,
            },
        };
        ajaxRequest({
            element: 'frmUpdateEmployeeInfo',
            validation: true,
            script: 'admin/profile/settings/user/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateEmployeeSocial').length > 0) {
        let rules = {
            facebook: {
                required: false,
            },
            twitter: {
                required: false,
            },
            instagram: {
                required: false,
            },
            linkedin: {
                required: false,
            },
            telegram: {
                required: false,
            },
            youtube: {
                required: false,
            },
            tiktok: {
                required: false,
            },
            website: {
                required: false,
            },

        };
        ajaxRequest({
            element: 'frmUpdateEmployeeSocial',
            validation: true,
            script: 'admin/profile/settings/social/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateEmployeePassword').length > 0) {
        let rules = {
            current_password: {
                required: true,
                maxlength: 253
            },
            password: {
                required: true,
                maxlength: 253
            },
            password_confirmation: {
                required: true,
                maxlength: 253
            },

        };
        ajaxRequest({
            element: 'frmUpdateEmployeePassword',
            validation: true,
            script: 'admin/profile/settings/password/update',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data'
            }
        });
    }
    if ($('#dtEmployees').length > 0) {
        const lang = G.pageLang;
        const { table } = lang;
        let col_draft = [
            {
                data: 'id',
                title: '',
            },
            {
                data: 'id',
                title: table?.col?.id,
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
                data: 'email',
                title: table?.col?.email,
            },
            {
                data: 'phone',
                title: table?.col?.phone,
            },
            {
                data: null,
                title: table?.col?.status,
                render: function (data, type, row) {
                    if (data?.status == 'active') {
                        return `<span class="px-2 py-1 bg-body-green text-xs text-white rounded-sm">${data?.status}</span>`;
                    }
                    if (data?.status == 'banned') {
                        return `<span class="px-2 py-1 bg-red-600 text-xs text-white rounded-sm">${data?.status}</span>`;
                    }
                }
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/users/manage/employees/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>
                            <button data-uuid='${data.uuid}' class="status"><span class="px-2 py-1 rounded-md shadow-md text-white" style="background-color:#2edcdc;">${data?.status === 'active' ? 'Lock' : 'Unlock'}</span></button>`;
                },
            },
        ];
        makeAjaxDataTable('dtEmployees', {
            select: true,
            url: 'admin/users/manage/employees/list',
            body: { type: $('#list_type').val() ?? '' },
            columns: col_draft,
            pdf: [1, 3, 4, 5, 7],
        });
    }
});

window.dtEmployees = (table, api, op) => {
    // G.deleteAll({
    //     element: 'deleteAllEmployees',
    //     script: 'admin/users/manage/employees/delete',
    //     confirm: true,
    //     api,
    // });
    // G.updateAll({
    //     element: 'updateAllEmployees',
    //     script: 'admin/users/manage/employees/updateRow',
    //     confirm: true,
    //     dataCols: {
    //         key: 'ids',
    //         items: [
    //             {
    //                 index: 1,
    //                 name: 'ids',
    //                 type: 'input',
    //                 data: [],
    //             },
    //             {
    //                 index: 1,
    //                 name: 'serial',
    //                 type: 'input',
    //                 data: []
    //             }
    //         ]
    //     },
    //     api,
    //     afterSuccess: {
    //         type: 'inflate_response_data'
    //     }
    // });
    downloadPdf({ ...op, btn: 'downloadEmployeesPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadEmployeesExcel', dataTable: 'yes' });
    if ($('.status').length > 0) {
        $('.status').on('click', function () {
            ajaxRequest({
                element: 'status',
                confirm: true,
                script: 'admin/users/manage/employees/updateStatus',
                type: 'request',
                dataType: 'json',
                body: { uuid: $(this).data('uuid') },
                afterSuccess: {
                    type: ''
                }
            });
        });
    }
};

