import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, jodit, makeAjaxDataTable } from '@orians/utils';

$(document).ready(function () {
    const lang = G.pageLang;
    const { placeholder } = lang;
    const editor = jodit({
        element: 'mail_template_note',
        height: 500,
        placeholder: placeholder?.message,
    });
    $('#load').on('change', function () {
        editor.value = '';
        $('#subject').val();
        let data = $(this).val() ? JSON.parse($(this).val()) : {};
        if (data.subject) {
            $('#subject').val(data.subject);
        }
        if (data.message) {
            if (data.message) {
                editor.selection.insertHTML(data.message);
            }
        }
    });
    if ($('#frmSendBulkMailToAdministrator').length > 0) {
        function updateSelectedCount() {
            const count = $('.single_check:checked').length;
            if (count > 0) {
                $('#selected_count').removeClass('hidden').text('Selected: ' + count);
            } else {
                $('#selected_count').addClass('hidden').text('Selected: 0');
            }
        }
        $('#select_all').on('change', function () {
            const isChecked = $(this).is(':checked');
            $('.single_check').each(function () {
                $(this).prop('checked', isChecked);
                const uuidInput = $(this).siblings('.uuid');
                if (isChecked) {
                    uuidInput.val($(this).data('uuid'));
                } else {
                    uuidInput.val('');
                }
            });
            updateSelectedCount();
        });
        $('.single_check').on('change', function () {
            const uuidInput = $(this).siblings('.uuid');
            if ($(this).is(':checked')) {
                uuidInput.val($(this).data('uuid'));
            } else {
                uuidInput.val('');
            }

            const totalCheckboxes = $('.single_check').length;
            const checkedCheckboxes = $('.single_check:checked').length;
            $('#select_all').prop('checked', totalCheckboxes === checkedCheckboxes);

            updateSelectedCount();
        });
        updateSelectedCount();
        let rules = {
            subject: {
                required: true,
                maxlength: 253,
            },
            message: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmSendBulkMailToAdministrator',
            validation: true,
            script: 'admin/mailbox/administrator/bulkMail',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad: () => {
                    editor.value = '';
                    editor.synchronizeValues();
                    editor.setEditorValue('');
                    editor.events.fire('change');
                    $('.uuid').val('');
                    $('#selected_count').addClass('hidden').text('Selected: 0');
                }
            },
        });
    }
    if ($('#frmSendMailToAdministrator').length > 0) {

        $('.save_draft').on('click', function () {
            const draft = $(this).data('draft');
            if ($('#frmSendMailToAdministrator input[name="draft"]').length === 0) {
                $('<input>').attr({ type: 'hidden', name: 'draft', value: draft }).appendTo('#frmSendMailToAdministrator');
            } else {
                $('#frmSendMailToAdministrator input[name="draft"]').val(draft);
            }
            $('.send').click();
        });
        window.addEventListener('beforeunload', function (e) {
            if (!$('#subject').val() && !$('#message').val()) {
                return;
            }
            $('<input>').attr({ type: 'hidden', name: 'draft', value: true }).appendTo('#frmSendMailToAdministrator');
            if ($('#frmSendMailToAdministrator input[name="draft"]').length > 0) {
                $('.send').click();
            }
        });
        let rules = {
            to: {
                required: true,
            },
            subject: {
                required: true,
            },
            message: {
                required: true,
            },
            attachment: {
                required: false,
            },
        };
        ajaxRequest({
            element: 'frmSendMailToAdministrator',
            validation: true,
            script: 'admin/mailbox/administrator/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad: () => {
                    editor.value = '';
                    editor.synchronizeValues();
                    editor.setEditorValue('');
                    editor.events.fire('change');
                }
            },
        });
    }
    if ($('#dtAdministratorMail').length > 0) {
        const lang = G.pageLang;
        const { table } = lang;
        let col_draft = [
            {
                data: 'id',
                title: table?.col?.id,
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
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/mailbox/administrator/edit/${data.uuid}"><span class="px-2 py-1 rounded-md shadow-md text-white" style="background-color:#2edcdc;">Compose</span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtAdministratorMail', {
            select: false,
            url: 'admin/mailbox/administrator/list',
            body: { type: $('#list_type').val() ?? '' },
            columns: col_draft,
            pdf: [0, 1, 2],
        });
    }
});

window.dtAdministratorMail = (table, api, op) => {
    downloadPdf({ ...op, btn: 'downloadAdministratorMailPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadAdministratorMailExcel', dataTable: 'yes' });
};