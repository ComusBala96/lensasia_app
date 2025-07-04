import { ajaxRequest, multi_select, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@oriansoft/utils';

$(document).ready(function () {
    const lang = G.pageLang;
    const { placeholder } = lang;
    multi_select({
        element: 'keywords',
        tags: true,
        placeholder: placeholder?.keywords,
    });
    if ($('#frmCreateMenu').length > 0) {
        let rules = {
            title: {
                required: true,
                maxlength: 253,
            },
            description: {
                required: true,
            },
            homepage_serial: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmCreateMenu',
            validation: true,
            script: 'admin/navigation/menu/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad: () => {
                    $('#keywords').val([]).trigger('change');
                }
            },
        });
    }
    if ($('#frmUpdateMenu').length > 0) {
        let rules = {
            title: {
                required: true,
                maxlength: 253,
            },
            description: {
                required: true,
            },
            homepage_serial: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateMenu',
            validation: true,
            script: 'admin/navigation/menu/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtMenu').length > 0) {
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
                    if (data.title == 'Home' || data.title == 'হোম') {
                        return '<span class="pl-2 py-1 text-black">' + data.serial + '</span>';
                    } else {
                        return '<input type="number" value="' + data.serial + `" class="pl-2 py-1 border border-body-blue bg-white text-black focus:outline-none rounded-sm serial z-999">
                                <input type="hidden" value="` + data.id + '" class="ids">';
                    }
                }
            },
            {
                data: 'title',
                title: table?.col?.title,
            },
            {
                data: 'description',
                title: table?.col?.description,
            },
            {
                data: 'keywords',
                title: table?.col?.keywords,
            },
            {
                data: 'block',
                title: table?.col?.block,
            },
            {
                data: null,
                title: table?.col?.homepage_serial,
                render: function (data, type, row) {
                    if (data.homepage_serial != null) {
                        return '<input type="number" value="' + data.homepage_serial + '" class="pl-2 py-1 border border-body-blue bg-white text-black focus:outline-none rounded-sm homepage_serial z-999">';
                    } else {
                        return 'Not Required';
                    }
                }
            },
            {
                data: 'visibility',
                title: table?.col?.visibility,
            },
            {
                data: 'homepage',
                title: table?.col?.homepage,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/navigation/menu/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtMenu', {
            select: true,
            url: 'admin/navigation/menu/list',
            columns: col_draft,
            pdf: [0, 2, 5, 7, 8, 9],
        });
    }
});

window.dtMenu = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllMenu',
        script: 'admin/navigation/menu/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllMenu',
        script: 'admin/navigation/menu/updateRow',
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
                },
                {
                    index: 6,
                    name: 'homepage_serial',
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
    downloadPdf({ ...op, btn: 'downloadMenuPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadMenuExcel', dataTable: 'yes' });
};
