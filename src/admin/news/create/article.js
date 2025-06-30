import { multi_select, ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable, createImageUrl, jodit, bdtp, adtp, getMimes } from '@orian/utils';

$(document).ready(function () {
    const lang = G.pageLang;
    const { placeholder } = lang;
    jodit({
        element: 'summernote_content',
        height: 600,
        placeholder: placeholder?.content,
    });
    multi_select({
        element: 'keywords',
        tags: true,
        placeholder: placeholder?.keywords,
    });
    multi_select({
        element: 'tags',
        tags: true,
        placeholder: placeholder?.tags,
    });
    $('#author').on('change', function () {
        if ($(this).is(':checked')) {
            $('#select_author').removeClass('hidden');
        } else {
            $('#select_author').addClass('hidden');
            $('#author_id').prop('selectedIndex', 0);
        }
    });
    $('#published').on('change', function () {
        if ($(this).is(':checked')) {
            $('#select_publish').removeClass('hidden');
        } else {
            $('#select_publish').addClass('hidden');
            $('#published_at').val('');
        }
    });
    $('#scheduled').on('change', function () {
        if ($(this).is(':checked')) {
            $('#select_schedule').removeClass('hidden');
        } else {
            $('#select_schedule').addClass('hidden');
            $('#scheduled_at').val('');
        }
    });
    bdtp({
        format: 'Y-m-d H:i:s',
        timepicker: true,
        step: 5,
    });
    adtp({
        format: 'Y-m-d H:i:s',
        timepicker: true,
        step: 5,
    });
    $('#image').on('change', function () {
        let file = this.files[0];
        if (typeof file == 'object') {
            let url = createImageUrl(file);
            $('.display_image').addClass('h-full w-full  p-1').removeClass('p-2');
            $('.display_image').html(`<div class="relative pb-[65%]"><img src="${url}" alt="${file.name}" class="absolute h-full w-full object-cover"></div>`);
        } else {
            $('.display_image').removeClass('h-full w-full p-1').addClass('p-2');
            $('.display_image').html(placeholder?.image.select);
        }
    });
    if ($('#frmCreateArticle').length > 0) {
        $('.save_draft').on('click', function () {
            const draft = $(this).data('draft');
            if ($('#frmCreateArticle input[name="draft"]').length === 0) {
                $('<input>').attr({ type: 'hidden', name: 'draft', value: draft }).appendTo('#frmCreateArticle');
            } else {
                $('#frmCreateArticle input[name="draft"]').val(draft);
            }
            $('.publish').click();
        });

        let rules = {
            title: {
                required: true,
            },
            description: {
                required: true,
            },
            'keywords[]': {
                required: false,
            },
            visibility: {
                required: true,
            },
            breaking: {
                required: false,
            },
            latest: {
                required: false,
            },
            headline: {
                required: false,
            },
            feature: {
                required: false,
            },
            popular: {
                required: false,
            },
            public: {
                required: false,
            },
            menu_id: {
                required: true,
            },
            'tags[]': {
                required: false,
            },
            optional_url: {
                required: false,
            },
            content: {
                required: true,
            },
            image: {
                require_from_group: [1, '.group_required'],
                extension: getMimes($('#image').attr('accept'))
            },
            image_url: {
                require_from_group: [1, '.group_required'],
            },
            image_caption: {
                required: false,
            },
            'additional_images[]': {
                required: false,
            },
            'files[]': {
                required: false,
            },
            author_id: {
                required: false,
            },
            published_at: {
                required: false,
            },
            scheduled_at: {
                required: false,
            },
        };
        ajaxRequest({
            element: 'frmCreateArticle',
            validation: true,
            script: 'admin/news/create/article/create',
            rules,
            afterSuccess: {
                type: '',
            },
        });
    }
    if ($('#frmUpdateArticle').length > 0) {
        let rules = {
            title: {
                required: true,
            },
            description: {
                required: true,
            },
            'keywords[]': {
                required: false,
            },
            visibility: {
                required: true,
            },
            breaking: {
                required: false,
            },
            latest: {
                required: false,
            },
            headline: {
                required: false,
            },
            feature: {
                required: false,
            },
            popular: {
                required: false,
            },
            public: {
                required: false,
            },
            menu_id: {
                required: true,
            },
            'tags[]': {
                required: false,
            },
            optional_url: {
                required: false,
            },
            content: {
                required: true,
            },
            image: {
                required: false,
                extension: getMimes($('#image').attr('accept'))
            },
            image_url: {
                required: false,
            },
            image_caption: {
                required: false,
            },
            'additional_images[]': {
                required: false,
            },
            'files[]': {
                required: false,
            },
            author_id: {
                required: false,
            },
            published_at: {
                required: false,
            },
            scheduled_at: {
                required: false,
            },
        };
        ajaxRequest({
            element: 'frmUpdateArticle',
            validation: true,
            script: 'admin/news/create/article/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtArticle').length > 0) {
        const { table } = lang;
        let col_draft = [
            {
                data: 'id',
                title: table?.col?.id,
            },
            {
                data: 'serial',
                title: table?.col?.serial,
                render: function (data, type, row) {
                    return `<input type="number" value="${row.serial}" class="w-full pl-2 py-1 border border-body-blue bg-white text-black focus:outline-none rounded-sm serial z-999"><input type="hidden" value="${row.id}" class="ids">`;
                }
            },
            {
                data: 'news',
                title: table?.col?.news,
            },
            {
                data: 'category',
                title: table?.col?.category,
            },
            {
                data: 'author',
                title: table?.col?.author,
            },
            {
                data: 'visibility',
                title: table?.col?.visibility,
            },
            {
                data: 'views',
                title: table?.col?.views,
            },
            {
                data: 'published_at',
                title: table?.col?.published_at,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: 'action',
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/news/create/article/edit/${row.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtArticle', {
            select: true,
            url: 'admin/news/create/article/list',
            columns: col_draft,
            pdf: [0, 2, 3, 4, 5, 6, 8],
        });
    }
});

window.dtArticle = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllArticle',
        script: 'admin/news/create/article/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllArticle',
        script: 'admin/news/create/article/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadArticlePdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadArticleExcel', dataTable: 'yes' });
};