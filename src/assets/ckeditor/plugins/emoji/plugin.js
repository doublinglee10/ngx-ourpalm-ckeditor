CKEDITOR.plugins.add('emoji', {
    requires: 'dialog',
    // jscs:disable maximumLineLength
    lang: 'zh,zh-cn', // %REMOVE_LINE_CORE%
    // jscs:enable maximumLineLength
    icons: 'emoji', // %REMOVE_LINE_CORE%
    hidpi: true, // %REMOVE_LINE_CORE%
    init: function (editor) {
        // editor.config.emoji_path = editor.config.emoji_path || ( this.path + 'images/' );
        editor.config.emoji_path = '//bbsimg.gamebean.com/bbsimg/emoji/1.0/';
        editor.addCommand('emoji', new CKEDITOR.dialogCommand('emoji', {
            allowedContent: 'img[alt,height,!src,title,width]',
            requiredContent: 'img'
        }));
        editor.ui.addButton && editor.ui.addButton('Smiley', {
            label: editor.lang.emoji.toolbar,
            command: 'emoji',
            toolbar: 'insert,50'
        });
        CKEDITOR.dialog.add('emoji', this.path + 'dialogs/emoji.js');
    }
});

CKEDITOR.config.emoji_images = ['KaiXin.png', 'BuKaiXin.png', 'Se.png', 'JingDai.png', 'ZhuangKu.png', 'DaKu.png',
    'KeAi.png', 'MeiXiangFa.png', 'ShuiZhao.png', 'NanGuo.png', 'LiuHan.png',
    'NuQiChongChong.png', 'GaoGuai.png', 'GuiLian.png', 'MuDengKouDai.png', 'KuXiao.png', 'QinQin.png', 'TuSheTou.png', 'ZiYa.png',
    'DaXiao.png', 'TouXiao.png', 'TianShi.png', 'GaoXing.png', 'TiaoYan.png', 'TiaoDou.png', 'GanGa.png', 'CuoE.png',
    'NanShou.png', 'KaiHuai.png', 'HuiWei.png', 'HanXiao.png', 'JingXia.png', 'FaDai.png', 'GanMao.png', 'ShengBing.png', 'YouChou.png',
    'LengXiao.png', 'ShiHuai.png', 'HuaiRen.png', 'JiuJie.png', 'WuNai.png', 'WuYu.png', 'YaLi.png', 'KuXiao2.png',
    'DaiShi.png', 'JingE.png', 'SuoWen.png', 'FeiWen.png', 'FanSha.png', 'WuGan.png', 'DaiZhi.png', 'BengKui.png',
    'LiuLei.png', 'LengHan.png', 'ShengQi.png', 'FaNu.png', 'WuBiaoQing.png', 'XieShi.png'];

CKEDITOR.config.emoji_descriptions = ['KaiXin', 'BuKaiXin', 'Se', 'JingDai', 'ZhuangKu', 'DaKu',
    'KeAi', 'MeiXiangFa', 'ShuiZhao', 'NanGuo', 'LiuHan',
    'NuQiChongChong', 'GaoGuai', 'GuiLian', 'MuDengKouDai', 'KuXiao', 'QinQin', 'TuSheTou', 'ZiYa',
    'DaXiao', 'TouXiao', 'TianShi', 'GaoXing', 'TiaoYan', 'TiaoDou', 'GanGa', 'CuoE',
    'NanShou', 'KaiHuai', 'HuiWei', 'HanXiao', 'JingXia', 'FaDai', 'GanMao', 'ShengBing', 'YouChou',
    'LengXiao', 'ShiHuai', 'HuaiRen', 'JiuJie', 'WuNai', 'WuYu', 'YaLi', 'KuXiao2',
    'DaiShi', 'JingE', 'SuoWen', 'FeiWen', 'FanSha', 'WuGan', 'DaiZhi', 'BengKui',
    'LiuLei', 'LengHan', 'ShengQi', 'FaNu', 'WuBiaoQing', 'XieShi'];
