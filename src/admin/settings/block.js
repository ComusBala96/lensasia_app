import { ajaxRequest, createImageUrl, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@oriansoft/utils';

$(document).ready(function () {
    let rules = {
        name: {
            required: true,
            maxlength: 253,
        },
        image: {
            required: true,
        },
        code: {
            required: false,
        },
    };
    $('#image').on('change', function () {
        let file = this.files[0];
        if (typeof file == 'object') {
            let url = createImageUrl(file);
            $('.display_image').html(`<img src="${url}" alt="${file.name}" class="h-full w-full object-cover">`);
        }
    });
    if ($('#frmCreateBlock').length > 0) {
        ajaxRequest({
            element: 'frmCreateBlock',
            validation: true,
            script: 'admin/settings/block/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad: () => {
                    $('.display_image').html('');
                }
            },
        });
    }
    if ($('#frmUpdateBlock').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdateBlock',
            validation: true,
            script: 'admin/settings/block/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtBlock').length > 0) {
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
                data: 'image',
                title: table?.col?.image,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/settings/block/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtBlock', {
            select: true,
            url: 'admin/settings/block/list',
            columns: col_draft,
            pdf: [0, 2, 4],
        });
    }
});

window.dtBlock = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllBlock',
        script: 'admin/settings/block/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllBlock',
        script: 'admin/settings/block/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadBlockPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadBlockExcel', dataTable: 'yes' });
};