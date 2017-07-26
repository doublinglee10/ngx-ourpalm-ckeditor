CKEDITOR.dialog.add('upload', function (editor) {
    console.info('editor.config', editor.config);

    var form_id = 'ckeditor-form-' + parseInt(Math.random() * 10000000);
    var init = false, dialog = null;
    var form = '<form id="' + form_id + '" action="' + editor.config.uploadImageFileUrl + '" method="post" enctype="multipart/form-data"><input type="file" name="' + editor.config.uploadImageFileName + '"><input type="button" value="上传" style="background-color:#09863E;padding:5px 10px;text-align:center;border-radius:3px;color:white;font-weight:bold;margin-top:10px;"/></form>';

    return {
        title: '上传图片',
        minWidth: 400,
        minHeight: 100,
        buttons: [],
        contents: [{
            label: '上传图片',
            elements: [{
                type: 'html',
                html: form
            }]
        }],
        onLoad: function (event) {
            dialog = event.sender;
        },
        onShow: function () {
            var $form = $('#' + form_id);
            var $file = $form.find('input[type=file]');
            $file.val(''); //清除上次选择的值

            //如果事件绑定过了退出
            if (init) return;

            init = true;
            $form.find('input[type=button]').click(function () {
                var val = $file.val();
                if (!!val) {
                    $form.submit();
                } else {
                    alert('请选择要上传的文件');
                }
            });
            $.fn.ajaxForm && $form.ajaxForm({
                xhrFields: {
                    withCredentials: true //跨域发送cookie, 异步提交表单时使用XHR2.0
                },
                success: function (result) {
                    if (editor.config.uploadImageSuccessEvent) {
                        var deferred = $.Deferred();
                        deferred.then(function (imageUrl) {
                            var img = '<img src="' + imageUrl + '"/>';
                            editor.insertHtml(img);
                            dialog.hide();
                        }, function () {
                            dialog.hide();
                        });
                        editor.config.uploadImageSuccessEvent(result, deferred.resolve, deferred.reject);
                    }
                },
                error: function (result) {
                    if (editor.config.uploadImageErrorEvent) {
                        var deferred = $.Deferred();
                        deferred.then(function (imageUrl) {
                            var img = '<img src="' + imageUrl + '"/>';
                            editor.insertHtml(img);
                            dialog.hide();
                        }, function () {
                            dialog.hide();
                        });
                        editor.config.uploadImageErrorEvent(result, deferred.resolve, deferred.reject);
                    }
                }
            });
        }
    };
});


