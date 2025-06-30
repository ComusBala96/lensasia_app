import { multi_select, ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable, createImageUrl, dtp, jodit, bdtp, adtp, getMimes } from '@orian/utils';

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
    $('#video').on('change', function () {
        let file = this.files[0];
        $('.display_video').html('');
        if (typeof file == 'object') {
            let url = createImageUrl(file);
            $('.display_video').addClass('h-full w-full  p-1').removeClass('p-2');
            $('.display_video').html(`<div class="relative pb-[65%]"><video src="${url}" controls class="absolute h-full w-full object-cover"></video></div>`);
        } else {
            $('.display_video').removeClass('h-full w-full p-1').addClass('p-2');
            $(this).value = '';
        }
    });
    $('#thumb').on('change', function () {
        let file = this.files[0];
        if (typeof file == 'object') {
            let url = createImageUrl(file);
            $('.display_thumb_image').addClass('h-full w-full  p-1').removeClass('p-2');
            $('.display_thumb_image').html(`<div class="relative pb-[65%]"><img src="${url}" alt="${file.name}" class="absolute h-full w-full object-cover"></div>`);
        } else {
            $('.display_thumb_image').removeClass('h-full w-full p-1').addClass('p-2');
            $('.display_thumb_image').html(placeholder?.video.select);
            $(this).value = '';
        }
    });
    $('#url').on('keyup', function () {
        if ($(this).val() !== '') {
            $('#video').value = '';
            $('.select_video').addClass('hidden');
            $('.select_thumb').addClass('hidden');
            $('.select_thumb_url').addClass('hidden');
        } else {
            $('#video').value = '';
            $('.select_video').removeClass('hidden');
            $('.select_thumb').removeClass('hidden');
            $('.select_thumb_url').removeClass('hidden');
        }
    });
    if ($('#frmCreateVideo').length > 0) {
        $('.save_draft').on('click', function () {
            const draft = $(this).data('draft');
            if ($('#frmCreateVideo input[name="draft"]').length === 0) {
                $('<input>').attr({ type: 'hidden', name: 'draft', value: draft }).appendTo('#frmCreateVideo');
            } else {
                $('#frmCreateVideo input[name="draft"]').val(draft);
            }
            $('.publish').click();
        });
        let rules = {
            title: {
                required: true,
                maxlength: 253,
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
            public: {
                required: false,
            },
            'tags[]': {
                required: false,
            },
            content: {
                required: false,
            },
            video: {
                require_from_group: [1, '.video_group'],
                extension: getMimes($('#video').attr('accept'))
            },
            url: {
                require_from_group: [1, '.video_group'],
            },
            thumb: {
                require_from_group: [1, '.thumb_group'],
                extension: getMimes($('#thumb').attr('accept'))
            },
            thumb_url: {
                require_from_group: [1, '.thumb_group'],
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
            element: 'frmCreateVideo',
            validation: true,
            script: 'admin/news/create/video/create',
            rules,
            afterSuccess: {
                type: '',
            },
        });
    }
    if ($('#frmUpdateVideo').length > 0) {
        let rules = {
            title: {
                required: true,
                maxlength: 253,
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
            public: {
                required: false,
            },
            'tags[]': {
                required: false,
            },
            content: {
                required: false,
            },
            video: {
                required: false,
                extension: getMimes($('#video').attr('accept'))
            },
            url: {
                required: false,
            },
            thumb: {
                required: false,
                extension: getMimes($('#thumb').attr('accept'))
            },
            thumb_url: {
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
            element: 'frmUpdateVideo',
            validation: true,
            script: 'admin/news/create/video/update',
            rules,
            afterSuccess: {
                type: ''
            }
        });
    }

    if ($('#dtVideo').length > 0) {
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
                    return `<input type="number" value="${data.serial}" class="w-full pl-2 py-1 border border-body-blue bg-white text-black focus:outline-none rounded-sm serial z-999"><input type="hidden" value="${data.id}" class="ids">`;
                }
            },
            {
                data: 'video',
                title: table?.col?.video,
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
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/news/create/video/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtVideo', {
            select: true,
            url: 'admin/news/create/video/list',
            columns: col_draft,
            pdf: [0, 2, 3, 4, 5, 6, 7],
        });
    }
});

window.dtVideo = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllVideo',
        script: 'admin/news/create/video/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllVideo',
        script: 'admin/news/create/video/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadVideoPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadVideoExcel', dataTable: 'yes' });
};

