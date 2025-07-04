import { ajaxRequest, createImageUrl, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@oriansoft/utils';
$(document).ready(function () {
    $('#image').on('change', function (e) {
        let file = e.target.files[0];
        if (typeof file == 'object') {
            let url = createImageUrl(file);
            $('.trending_image').html(`<img src="${url}" alt="${file.name}" class="h-30 w-full object-cover">`);
        } else {
            $('.trending_image').html('');
        }
    });
    if ($('#frmCreateTrendingAd').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253,
            },
            image: {
                required: false,
            },
            visibility: {
                required: true,
            },
            sponsored: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmCreateTrendingAd',
            validation: true,
            script: 'admin/advertisement/space/trending/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad: () => {
                    $('.trending_image').html('');
                }
            },
        });
    }
    if ($('#frmUpdateTrendingAd').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253,
            },
            image: {
                required: false,
            },
            visibility: {
                required: true,
            },
            sponsored: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateTrendingAd',
            validation: true,
            script: 'admin/advertisement/space/trending/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtTrendingAd').length > 0) {
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
                data: 'image',
                title: table?.col?.image,
            },
            {
                data: 'name',
                title: table?.col?.name,
            },
            {
                data: 'visibility',
                title: table?.col?.visibility,
            },
            {
                data: 'sponsored',
                title: table?.col?.sponsored,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/advertisement/space/trending/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtTrendingAd', {
            select: true,
            url: 'admin/advertisement/space/trending/list',
            columns: col_draft,
            pdf: [0, 3, 4, 5, 6],
        });
    }
});

window.dtTrendingAd = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllTrendingAd',
        script: 'admin/advertisement/space/trending/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllTrendingAd',
        script: 'admin/advertisement/space/trending/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadTrendingAdPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadTrendingAdExcel', dataTable: 'yes' });
};