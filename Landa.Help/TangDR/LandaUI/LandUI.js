/// <reference path="jquery-3.2.1.js" />

(function () {
    $.fn.extend({
        ListBox: function (config) {
            var Widget = {
                init: function (dom, method) {
                    this.dom = dom;
                },
                insert: function() {
                    this.dom.append("<div class='top'></div>"
                                     + "<div class='body'>"
                                     + "<input name='checkAll'  type='checkbox' />全选"
                                     + "<ul>"
                                     + "</ul>"
                                     + "</div>");
                    this.dom.addClass("TangDRlistBox");
                }
            }
            //继承自Widget方法
            var method = Object.create(Widget);
            method.init(this);
            method.getItems = function (dom) {
                var items = method.getLength(dom);
                return {
                    length: items.length,
                    length_checked: items.length_checked,
                    length_unhecked: items.length_unhecked,
                    value: method.getSelectdValues(dom)
                }
            }
            method.getSelectdValues = function (dom) {
                var array = new Array();
                var item = dom.find(".body ul li").find("input");
                $(item).each(function () {
                    if ($(this).prop("checked") == true) {
                        array.push($(this).prop("value"))
                    }
                })
                return array;
            }
            method.getLength = function (dom) {
                var length = dom.find(".body li").find("input").length;
                var length_checked = 0;
                var array = dom.find(".body ul li").find("input");
                $(array).each(function () {
                    if ($(this).prop("checked") == true) {
                        length_checked++;
                    }
                })
                return {
                    length: length,
                    length_checked: length_checked,
                    length_unhecked : length - length_checked
                };
            }
            //属性配置
            if (typeof (config) == "object") {
                for (var i in config) {
                    switch (i) {
                        case "data":
                            var url = config[i];
                            break;
                    }
                }
            }
            //方法调用
            else if(typeof(config) =="string") {
                switch (config) {
                    case "getItems":
                        return method.getItems(this);
                        break;
                    case "getSelectdValues":
                        return method.getSelectdValues(this);
                        break;
                    case "getLength":
                        return method.getLength(this);
                        break;
                }
            }
            //继承method
            var listbox = Object.create(method);
            listbox.topclick = function () {
                this.dom.find(".top").click(function () {
                    $(this).parent().find(".body").toggle()
                })
            }
            listbox.hoverBody = function () {
                this.dom.click(function (event) {
                    event = event || window.event;
                    event.stopPropagation();
                        $(this).find(".body ul li").hover(function () {
                            $(this).css("background", "#ccc");
                        }, function () {
                            $(this).css("background", "none");
                        })
                });
                $(document).click(function (e) {
                    $("#demo .body").hide();
                });
              }
            listbox.checkAll = function () {
                var dom = this.dom;
                dom.find("[name=checkAll]").change(function () {
                    var status = $(this).prop("checked");
                    if (status) {
                        //勾选全部
                        dom.find(".body li").find("input").prop("checked", true)
                        //清除top内容
                        dom.find(".top").text("");
                        //全部内容到输入框
                        dom.find("ul li [type=checkbox]").each(function () {
                            var name = $(this).prop("name");
                            var text = $(this).parent()["0"].innerText;
                            var labelElement = "<span name='" + name + "'>" + text + "<img class='delImage' onclick='$().ListBox().listbox.delTag(event,this)'  src='https://raw.githubusercontent.com/gaoconggit/Landa.Help/LandaUI/Landa.Help/TangDR/images/icon1.png'/></span>";
                            dom.find(".top").append(" " + labelElement);
                        })
                    }
                    else {
                        //取消勾选
                        dom.find(".body li").find("input").prop("checked", false)
                        dom.find(".top").text("");
                    }
                })
            }
            listbox.checkAllHelp = function () {
                var getItem = this.getItems(this.dom);
                    if (getItem.length_checked == getItem.length) {
                        this.dom.find("[name=checkAll]").prop("checked", true);
                    }
                    else {
                        this.dom.find("[name=checkAll]").prop("checked", false);
                    }
            }
            listbox.itemClick = function () {
                var dom = this.dom;
                var checkAllHelp = this.checkAllHelp;
                this.dom.find("ul li [type=checkbox]").change(function () {
                    var status = $(this).prop("checked");
                    var name = $(this).prop("name");
                    var text = $(this).parent()["0"].innerText;
                    //添加选中项
                    if (status) {
                        var labelElement = "<span name='" + name + "'>" + text + "<img class='delImage' onclick='$().ListBox().listbox.delTag(event,this)' src='https://raw.githubusercontent.com/gaoconggit/Landa.Help/LandaUI/Landa.Help/TangDR/images/icon1.png'/></span>";
                        dom.find(".top").append(" " + labelElement);
                    }
                        //取消选中项
                    else {
                        dom.find(".top [name=" + name + "]").remove();
                    }
                    //全选帮助
                    listbox.checkAllHelp();
                })


            }
            listbox.genaraeItems = function (data) {
                var additems = "";
                $(data).each(function () {
                    additems += "<li><input name='" + this.name + "' value='" + this.value + "' type='checkbox'/>" + this.text + "</li>";
                })
                this.dom.find(".body ul").append(additems);
                listbox.itemClick();
            }
            listbox.bundData = function (url) {
                var dom = this.dom;
                if ( typeof (url) == "string" ) {
                    $.getJSON(url, function (data) {
                        //异步json数据生成控件项
                        listbox.genaraeItems(data);
                    })
                }
                else if (typeof (url) == "object")
                {
                        //本地数据生成控件项
                        listbox.genaraeItems(data);
                }
               

            }
            listbox.delTag = function (e, obj) {
                var dom = $(obj).parent().parent().parent();
                var name = $(obj).parent().attr("name");
                var getItem;
                e.stopPropagation();
                $(dom).find(".top [name=" + name + "]").remove();
                $(dom).find(".body ul li [name=" + name + "]").prop("checked", false)
                if ($(dom).find(".top").text() == "") {
                    $(dom).find(".body [name=checkAll]").prop("checked", false);
                }
                getItem = this.getItems(dom);
                if (getItem.length_checked == getItem.length) {
                    $(dom).find("[name=checkAll]").prop("checked", true);
                }
                else {
                    $(dom).find("[name=checkAll]").prop("checked", false);
                }
            }
            listbox.insert();
            listbox.bundData(url);
            listbox.topclick();
            listbox.hoverBody();
            listbox.checkAll();
            return {
                listbox: listbox
            };
        }
    })
})($)