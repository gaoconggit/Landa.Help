/// <reference path="jquery-3.2.1.js" />
(function () {
    $.fn.extend({
        TrListBox: function (config) {
            var dom = $(this);
            var Tr = (function () {
                function temple() {
                    //生成html模板
                    $(dom).append("<div class='top' ></div>"
                                    + "<div class='body'>"
                                    + "<input name='checkAll'  type='checkbox' />全选"
                                    + "<ul>"
                                    + "<li><input name='a1' value='1' type='checkbox'/>唐大人新华书店</li>"
                                    + "<li><input name='a2' value='2' type='checkbox' />唐大人酒店</li>"
                                    + "<li><input name='a3' value='3' type='checkbox' />唐大人旅馆</li>"
                                    + "<li><input name='a4' value='4' type='checkbox' />唐大人阿里巴巴</li>"
                                    + " <li><input name='a5' value='5' type='checkbox' />唐大人教育</li>"
                                    + "</ul>"
                                    + "</div>");       
                    //绑定数据
                    Tr.bundDate("test.json");
                    //绑定css样式
                    $(dom).addClass("TangDRlistBox");
                    //输入框点击事件绑定
                    Tr.clickTop();
                    //鼠标划过绑定
                    Tr.hoverBody();
                    //选中全部事件绑定
                    Tr.checkAll();
                };
                function bundDate(url) {
                    //绑定json数据
                    $.getJSON(url, function (data) {
                        var additems = "";
                        $(data).each(function () {
                            additems += "<li><input name='" + this.name + "' value='" + this.value + "' type='checkbox'/>" + this.text + "</li>";
                        })
                        $(dom).find(".body ul").append(additems);
                        $(dom).find("ul li [type=checkbox]").change(function () {
                            var status = $(this).prop("checked");
                            var name = $(this).prop("name");
                            var text = $(this).parent()["0"].innerText;
                            //添加选中项
                            if (status) {
                                var labelElement = "<span name='" + name + "'>" + text + "<img class='delImage' onclick='$().TrListBox().Tr.delTag(event,this)' src='images/icon1.png'/></span>";
                                $(dom).find(".top").append(" " + labelElement);
                            }
                                //取消选中项
                            else {
                                $(dom).find(".top [name=" + name + "]").remove();
                            }
                            //全选帮助
                            Tr.checkAllHelp();
                        })
                    })
                };
                function clickTop() {
                    $(dom).find(".top").click(function () {
                        $(dom).find(".body").toggle();
                    })
                };
                function hoverBody() {
                    $(dom).hover(function () {
                        $(dom).find(".body ul li").hover(function () {
                            $(this).css("background", "#ccc");
                        }, function () {
                            $(this).css("background", "none");
                        })
                    },
                    function () {
                        //$("#mutipleSelect .body").hide();
                    })
                };
                function checkAll() {
                    $(dom).find("[name=checkAll]").change(function () {
                        var status = $(dom).find("[name=checkAll]").prop("checked");
                        if (status) {
                            //勾选全部
                            $(dom).find(".body li").find("input").prop("checked", true)
                            //清除top内容
                            $(dom).find(".top").text("");
                            //全部内容到输入框
                            $(dom).find("ul li [type=checkbox]").each(function () {
                                var name = $(this).prop("name");
                                var text = $(this).parent()["0"].innerText;
                                var labelElement = "<span name='" + name + "'>" + text + "<img class='delImage' onclick='$().TrListBox().Tr.delTag(event,this)'  src='images/icon1.png'/></span>";
                                $(dom).find(".top").append(" " + labelElement);
                            })
                        }
                        else {
                            //取消勾选
                            $(dom).find(".body li").find("input").prop("checked", false)
                            $(dom).find(".top").text("");
                        }
                    })
                };
                function checkAllHelp() {
                    var getItem = method.getItems();
                    if (getItem.length_checked == getItem.length) {
                        $(dom).find("[name=checkAll]").prop("checked", true);
                    }
                    else {
                        $(dom).find("[name=checkAll]").prop("checked", false);
                    }
                };
                function delTag(e, obj) {
                    var dom=$(obj).parent().parent().parent();
                    var name = $(obj).parent().attr("name")
                    e.stopPropagation();
                    $(dom).find(".top [name=" + name + "]").remove();
                    $(dom).find(".body ul li [name=" + name + "]").prop("checked", false)
                    if ($(dom).find(".top").text() == "") {
                        $(dom).find(".body [name=checkAll]").prop("checked", false);
                    }
                    if (getItem.checked() == getItem.lenght()) {
                        $(dom).find("[name=checkAll]").prop("checked", true);
                    }
                    else {
                        $(dom).find("[name=checkAll]").prop("checked", false);
                    }
                }
                return {
                    temple: temple,
                    bundDate: bundDate,
                    clickTop: clickTop,
                    hoverBody: hoverBody,
                    checkAll: checkAll,
                    checkAllHelp: checkAllHelp,
                    delTag: delTag
                };
            })(dom);
            //方法调用
            var method = (function () {
                getItems = function () {
                    var group;
                    var length = $(dom).find(".body li").find("input").length;
                    var length_checked = 0;
                    var array = $(dom).find(".body ul li").find("input");
                    $(array).each(function () {
                        if ($(this).prop("checked") == true) {
                            length_checked++;
                        }
                    })
                    var array = new Array();
                    var item = $(dom).find(".body ul li").find("input");
                    $(item).each(function () {
                        if ($(this).prop("checked") == true) {
                            array.push($(this).prop("value"))
                        }
                    })
                    group = {
                        length: length,
                        length_checked: length_checked,
                        length_unhecked: length - length_checked,
                        value: array
                    }
                    return group;
                };
                return {
                    getItems: getItems
                }
            })(dom);
            //生成模板
            Tr.temple();
            //方法返回
            switch (config) {
                case "getItems":
                    return method.getItems();
                    break;
            };
            return {
                Tr: Tr
            }
        }
    })

})($);







































var common = (function () {
    bundDate = function (url) {
        //绑定json数据
        $.getJSON(url, function (data) {
            var additems = "";
            $(data).each(function () {
                additems += "<li><input name='" + this.name + "' value='" + this.value + "' type='checkbox'/>" + this.text + "</li>"
            })
            $("#mutipleSelect .body ul").append(additems);
            $("#mutipleSelect ul li [type=checkbox]").change(function () {
                var status = $(this).prop("checked");
                var name = $(this).prop("name");
                var text = $(this).parent()["0"].innerText;
                //添加选中项
                if (status) {
                    var labelElement = "<span name='" + name + "'>" + text + "<img class='delImage' onclick='common.delTag(event,this)' src='images/icon1.png'/></span>";
                    $("#mutipleSelect .top").append(" " + labelElement);
                }
                    //取消选中项
                else {
                    $("#mutipleSelect .top [name=" + name + "]").remove();
                }
                common.checkAllHelp();
            })
        })

    },
    clickTop = function() {
        $("#mutipleSelect .top").click(function () {
            $("#mutipleSelect .body").toggle();
        })
    },
    hoverBody = function () {
        $("#mutipleSelect").hover(function () {
            $("#mutipleSelect .body ul li").hover(function () {
                $(this).css("background", "#ccc");
            }, function () {
                $(this).css("background", "none");
            })
        },
        function () {
    //$("#mutipleSelect .body").hide();
})
    },
    checkAll = function () {
        $("#mutipleSelect [name=checkAll]").change(function () {
            var status = $("#mutipleSelect [name=checkAll]").prop("checked");
            if (status) {
                //勾选全部
                $("#mutipleSelect .body li").find("input").prop("checked", true)
                //清除top内容
                $("#mutipleSelect .top").text("");
                //全部内容到输入框
                $("#mutipleSelect ul li [type=checkbox]").each(function () {
                    var name = $(this).prop("name");
                    var text = $(this).parent()["0"].innerText;
                    var labelElement = "<span name='"+ name +"'>" + text + "<img class='delImage' onclick='common.delTag(event,this)' src='images/icon1.png'/></span>";
                    $("#mutipleSelect .top").append(" " + labelElement);
                })
            }
            else {
                //取消勾选
                $("#mutipleSelect .body li").find("input").prop("checked", false)
                $("#mutipleSelect .top").text("");
            }
        })
    },
    checkAllHelp = function () {   
        if (getItem.checked() == getItem.lenght()) {
            $("#mutipleSelect [name=checkAll]").prop("checked", true);
        }
        else {
            $("#mutipleSelect [name=checkAll]").prop("checked", false);
        }
    },
    delTag = function (e, obj) {
        var name = $(obj).parent().attr("name")
        e.stopPropagation();
        $("#mutipleSelect .top [name=" + name + "]").remove();
        $("#mutipleSelect .body ul li [name=" + name + "]").prop("checked", false)
        if ($("#mutipleSelect .top").text() == "") {
            $("#mutipleSelect .body [name=checkAll]").prop("checked", false);
        }
        if (getItem.checked() == getItem.lenght()) {
            $("#mutipleSelect [name=checkAll]").prop("checked", true);
        }
        else {
            $("#mutipleSelect [name=checkAll]").prop("checked", false);
        }
    }
    return {
        bundDate: bundDate,
        clickTop: clickTop,
        hoverBody: hoverBody,
        checkAll: checkAll,
        checkAllHelp: checkAllHelp,
        delTag: delTag
    }
}($))
var getItem = (function () {
    lenght = function () {
        var allItem = $("#mutipleSelect .body li").find("input").length;
        return allItem;
    },
    checked = function () {
        var checkedItem = 0;
        var array = $("#mutipleSelect .body ul li").find("input");
        $(array).each(function () {
            if ($(this).prop("checked") == true) {
                checkedItem++;
            }
        })
        return checkedItem;
    }
    value = function () {
        var array = new Array();
        var item = $("#mutipleSelect .body ul li").find("input");
        $(item).each(function () {
            if ($(this).prop("checked") == true) {
                
                array.push($(this).prop("value"))
            }
        })
        return array;
    }
    return {
        lenght: lenght,
        checked: checked,
        value: value
    }
}())
common.bundDate("test.json");
//选择框点击事件
common.clickTop();
//鼠标移动事件
common.hoverBody();
//选中全部
common.checkAll();






