import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@orians/utils';

$(document).ready(function () {
    let rules = {
        name: {
            required: true,
            maxlength: 253,
        },
        url: {
            required: true,
        },
        family: {
            required: true,
            maxlength: 253,
        },
    };
    if ($('#frmCreateThemeFont').length > 0) {
        ajaxRequest({
            element: 'frmCreateThemeFont',
            validation: true,
            script: 'admin/theme/font/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
            },
        });
    }
    if ($('#frmUpdateThemeFont').length > 0) {
        ajaxRequest({
            element: 'frmUpdateThemeFont',
            validation: true,
            script: 'admin/theme/font/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    if ($('#frmUpdateThemeFontSettings').length > 0) {
        let rules = {
            menu_font: {
                required: true,
                maxlength: 253,
            },
            breaking_font: {
                required: true,
                maxlength: 253,
            },
            headline_font: {
                required: true,
                maxlength: 253,
            },
            title_font: {
                required: true,
                maxlength: 253,
            },
            text_font: {
                required: true,
                maxlength: 253,
            },
            button_font: {
                required: true,
                maxlength: 253,
            },
            publisher_font: {
                required: true,
                maxlength: 253,
            },
        };
        ajaxRequest({
            element: 'frmUpdateThemeFontSettings',
            validation: true,
            script: 'admin/theme/font/settings/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtThemeFont').length > 0) {
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
                data: 'family',
                title: table?.col?.family,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/theme/font/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtThemeFont', {
            select: true,
            url: 'admin/theme/font/list',
            columns: col_draft,
            pdf: [0, 2, 3, 4],
        });
    }
});

window.dtThemeFont = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllThemeFont',
        script: 'admin/theme/font/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllThemeFont',
        script: 'admin/theme/font/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadThemeFontPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadThemeFontExcel', dataTable: 'yes' });
};