import { ajaxRequest, G, jodit } from '@oriansoft/utils';

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
    if ($('#frmSendMailToUser').length > 0) {
        $('.save_draft').on('click', function () {
            const draft = $(this).data('draft');
            if ($('#frmSendMailToUser input[name="draft"]').length === 0) {
                $('<input>').attr({ type: 'hidden', name: 'draft', value: draft }).appendTo('#frmSendMailToUser');
            } else {
                $('#frmSendMailToUser input[name="draft"]').val(draft);
            }
            $('.send').click();
        });
        window.addEventListener('beforeunload', function (e) {
            if (!$('#subject').val() && !$('#message').val()) {
                return;
            }
            $('<input>').attr({ type: 'hidden', name: 'draft', value: true }).appendTo('#frmSendMailToUser');
            if ($('#frmSendMailToUser input[name="draft"]').length > 0) {
                $('.send').click();
            }
        });
        let rules = {
            email: {
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
            element: 'frmSendMailToUser',
            validation: true,
            script: 'admin/mailbox/compose/create',
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
});

