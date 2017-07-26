CKEDITOR.plugins.add('upload', {
    requires: 'dialog',
    icons: 'upload', // %REMOVE_LINE_CORE%
    hidpi: true, // %REMOVE_LINE_CORE%
    init: function (editor) {
        editor.addCommand('upload', new CKEDITOR.dialogCommand('upload', {
            // allowedContent: 'img[alt,height,!src,title,width]',
            // requiredContent: 'img'
        }));
        editor.ui.addButton('upload', {
            label: '上传图片',
            command: 'upload',
            toolbar: 'insert,100'
        });
        CKEDITOR.dialog.add('upload', this.path + 'dialogs/upload.js');
    }
});