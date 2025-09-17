window.loadPostModal = () => {
    if ($('.copyToClipBoard').length > 0) {
        $('.copyToClipBoard').on('click', function () {
            $('.postUrl').select();
            document.execCommand('copy');
            $('.copyToClipBoard').html('Copied');
            setTimeout(() => {
                $('.copyToClipBoard').html('Copy');
            }, 1000);
        });
    }
};