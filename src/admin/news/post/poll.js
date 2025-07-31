import { ajaxRequest, createImageUrl, domain_url, downloadExcel, downloadPdf, dtp, dynamicDom, G, getMimes, makeAjaxDataTable } from '@orians/utils';

$(document).ready(function () {
    dynamicDom({
        clickId: 'addMore',
        domId: 'copyDom',
        cloneId: 'pasteDom',
        addRemoveClass: 'removeField',
        inputClass: ['options'],
        errorClass: ['options_error']
    });
    dtp({
        format: 'Y-m-d h:i:s',
        timepicker: false,
        onChangeDateTime: function (currentDateTime) {
            const now = new Date();
            currentDateTime.setHours(now.getHours());
            currentDateTime.setMinutes(now.getMinutes());
            currentDateTime.setSeconds(now.getSeconds());
        }
    });

    $('#image').on('change', function (e) {
        let file = e.target.files[0];
        let url = createImageUrl(file);
        $('.poll_image').html(`<img src="${url}" alt="${file.name}" class="h-28 w-40 object-cover">`);
    });
    if ($('#frmCreatePoll').length > 0) {
        let rules = {
            question: {
                required: true,
            },
            image: {
                required: true,
                extension:getMimes($('#image').attr('accept'))
            },
            'options[]': {
                required: true,
            },
            permission: {
                required: true,
            },
            status: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmCreatePoll',
            validation: true,
            script: 'admin/news/post/poll/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad:()=>{
                    $('#image').value='';
                    $('.poll_image').html('');
                }
            },
        });
    }
    if ($('#frmUpdatePoll').length > 0) {
        let rules = {
            question: {
                required: true,
            },
            image: {
                required: false,
                extension:getMimes($('#image').attr('accept'))
            },
            'options[]': {
                required: true,
            },
            permission: {
                required: true,
            },
            status: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdatePoll',
            validation: true,
            script: 'admin/news/post/poll/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtPoll').length > 0) {
        const lang = G.pageLang;
        const { table, modal } = lang;
        let triggerUpdatePollOptions = {
            body: {},
            modalCallback: 'pollOptionsModal',
            element: 'pollOptionsModal',
            script: 'admin/news/post/poll/options/modal',
            title: modal?.title,
            globLoader: false,
        };
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
                data: 'question',
                title: table?.col?.question,
            },
            {
                data: 'options',
                title: table?.col?.options,
            },
            {
                data: 'results',
                title: table?.col?.results,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    triggerUpdatePollOptions = {
                        ...triggerUpdatePollOptions,
                        body: {
                            uuid: data.uuid,
                        }
                    };
                    return `<a href="${domain_url}admin/news/post/poll/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>
                            <button data-modal-target='editModal' data-edit-prop='${JSON.stringify(triggerUpdatePollOptions)}'><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><span class="">Options</span></span></button>`;
                },
            },
        ];
        makeAjaxDataTable('dtPoll', {
            select: true,
            url: 'admin/news/post/poll/list',
            columns: col_draft,
            pdf: [0, 3, 4, 5, 6],
        });
    }
});

window.dtPoll = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllPoll',
        script: 'admin/news/post/poll/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllPoll',
        script: 'admin/news/post/poll/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadPollPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadPollExcel', dataTable: 'yes' });
};
window.pollOptionsModal = () => {
    if ($('#frmUpdatePollOptions').length > 0) {
        dynamicDom({
            clickId: 'addMore',
            domId: 'copyDom',
            cloneId: 'pasteDom',
            addRemoveClass: 'removeField',
            inputClass: ['options'],
            errorClass: ['options_error']
        });
        $('.deleteOption').on('click', function () {
            ajaxRequest({
                element: 'deleteOption',
                confirm: true,
                script: 'admin/news/post/poll/delete/option',
                rules,
                dataType: 'json',
                type: 'request',
                body: { id: $(this).data('op-id') },
                afterSuccess: {
                    type: ''
                }
            });
        });
        let rules = {
            'options[]': {
                required: false,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdatePollOptions',
            validation: true,
            script: 'admin/news/post/poll/update/options',
            rules,
            afterSuccess: {
                type: ''
            }
        });
    }
};