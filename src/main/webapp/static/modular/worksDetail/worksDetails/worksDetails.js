/**
 * 作品管理管理初始化
 */
var WorksDetails = {
    id: "WorksDetailsTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
WorksDetails.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '活动ID', field: 'activityId', visible: true, align: 'center', valign: 'middle'},
            {title: '用户ID', field: 'uid', visible: true, align: 'center', valign: 'middle'},
            {title: '评论数量', field: 'replyNumber', visible: true, align: 'center', valign: 'middle'},
            {title: '转发数量', field: 'forwardNumber', visible: true, align: 'center', valign: 'middle'},
            {title: '点赞数量', field: 'giveLikeNumber', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'createTime', visible: true, align: 'center', valign: 'middle'},
            {title: '审核状态(0待审核1通过-1不通过)', field: 'state', visible: true, align: 'center', valign: 'middle'},
            {title: '是否定位(0无定位1有定位)', field: 'hasPoint', visible: true, align: 'center', valign: 'middle'},
            {title: '作品名称', field: 'worksTitle', visible: true, align: 'center', valign: 'middle'},
            {title: '图片数量', field: 'imgNumber', visible: true, align: 'center', valign: 'middle'},
            {title: '第一个图片地址', field: 'imgUrl', visible: true, align: 'center', valign: 'middle'},
            {title: '图片说明', field: 'imgRemark', visible: true, align: 'center', valign: 'middle'},
            {title: '拍摄时间', field: 'pohtoTime', visible: true, align: 'center', valign: 'middle'},
            {title: '天气', field: 'weather', visible: true, align: 'center', valign: 'middle'},
            {title: '拍摄地点', field: 'address', visible: true, align: 'center', valign: 'middle'},
            {title: '拍摄作者', field: 'takenAuthor', visible: true, align: 'center', valign: 'middle'},
            {title: '拍摄工具', field: 'takenTool', visible: true, align: 'center', valign: 'middle'},
            {title: '二记', field: 'content', visible: true, align: 'center', valign: 'middle'},
            {title: '问题1', field: 'answerOne', visible: true, align: 'center', valign: 'middle'},
            {title: '问题2', field: 'answerTwo', visible: true, align: 'center', valign: 'middle'},
            {title: '问题3', field: 'answerThree', visible: true, align: 'center', valign: 'middle'},
            {title: '问题4', field: 'answerFour', visible: true, align: 'center', valign: 'middle'},
            {title: '问题5', field: 'answerFive', visible: true, align: 'center', valign: 'middle'},
            {title: '问题6', field: 'answerSix', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
WorksDetails.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        WorksDetails.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加作品管理
 */
WorksDetails.openAddWorksDetails = function () {
    var index = layer.open({
        type: 2,
        title: '添加作品管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/worksDetails/worksDetails_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看作品管理详情
 */
WorksDetails.openWorksDetailsDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '作品管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/worksDetails/worksDetails_update/' + WorksDetails.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除作品管理
 */
WorksDetails.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/worksDetails/delete", function (data) {
            Feng.success("删除成功!");
            WorksDetails.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("worksDetailsId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询作品管理列表
 */
WorksDetails.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    WorksDetails.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = WorksDetails.initColumn();
    var table = new BSTable(WorksDetails.id, "/worksDetails/list", defaultColunms);
    table.setPaginationType("client");
    WorksDetails.table = table.init();
});