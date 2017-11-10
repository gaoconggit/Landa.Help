/// <reference path="javascript/jquery-3.2.1.js" />
/// <reference path="javascript/TangDr_Js.js" />
/// <reference path="javascript/TangDR_Help.js" />
(function () {
    $.fn.extend({
        ListBox: function (config) {
            var Widget = {
                init: function (dom) {
                    this.dom = dom;
                },
                insert: function () {
                    this.dom.append("<div class='top'></div>"
                                        + "<div class='body'>"
                                        + "<input name='checkAll'  type='checkbox' />全选"
                                        + "<ul>"
                                        + "</ul>"
                                        + "</div>");
                    this.dom.addClass("LandaListbox");
                },
            }
            //方法类
            var method = Object.create(Widget);
            method.init(this);
            method.getItems = function (dom) {
                var group = new Array()
                    , name
                    , text
                    , value;
                dom.find("ul li [type=checkbox]").each(function (i) {
                    name = $(this).prop("name");
                    text = $(this).parent()["0"].innerText;
                    value = $(this).prop("value");
                    group[i] = {
                        name: name,
                        text: text,
                        value: value
                    };
                });
                return group;
            }
            method.getSelectedValues = function (dom) {
                var array = new Array();
                var item = dom.find(".body ul li").find("input");
                $(item).each(function () {
                    if ($(this).prop("checked") == true) {
                        array.push($(this).prop("value"))
                    }
                })
                return array;
            }
            method.length = function (dom) {
                var length = dom.find(".body li").find("input").length;
                return length;
            },
            method.length_Checked = function (dom) {
                var length_checked = 0,
                array = dom.find(".body ul li").find("input");
                $(array).each(function () {
                    if ($(this).prop("checked") == true) {
                        length_checked++;
                    }
                })
                return length_checked;
            }
            method.length_Unchecked = function (dom) {
                var length_Unhecked = method.length(dom) - method.length_Checked(dom);
                return length_Unhecked;
            }
            var listbox = Object.create(method);
            var vaild = Object.create(listbox);
            vaild.configVaild = function (config) {
                /// <summary>
                /// config配置验证
                /// </summary>
                /// <param name="config" type="type">config对象配置</param>
                var configArray = new Array();
                if (typeof (config) != "string"
                 && typeof (config) != "object") {
                    throw Error("ListBox配置项错误！");
                }
                if (typeof (config) == "string") {
                    var isVaild = false;
                    for (var name in method) {
                        if (name == config) {
                            isVaild = true;
                            break;
                        }
                    }
                    if (isVaild == false) {
                        throw Error("ListBox方法名错误！");
                    }
                }
                else if (typeof (config) == "object") {
                    for (var i in config) {
                        configArray.push(i)
                    }
                    for (var name in config) {
                        if ($(configArray).isArraySame(name) == false) {
                            throw Error("ListBox配置项错误！");
                        }
                    }
                }
            };
            vaild.callFunction = function (config) {
                /// <summary>
                /// 方法或者属性调用
                /// </summary>
                /// <param name="config" type="type"></param>
                /// <returns type=""></returns>
                var dom = this.dom;
                //属性配置调用
                if (typeof (config) == "object") {
                    var configArray = new Array();
                    for (var i in config) {
                        switch (i) {
                            case "data":
                                //绑定数据
                                listbox.bindData(config[i]);
                                url = config[i];
                                break;
                        }
                    }
                }
                    //方法调用
                else if (typeof (config) == "string") {
                    switch (config) {
                        case "getItems":
                            return method.getItems(dom);
                            break;
                        case "getSelectedValues":
                            return method.getSelectedValues(dom);
                            break;
                        case "length":
                            return method.length(dom);
                            break;
                        case "length_Checked":
                            return method.length_Checked(dom);
                            break;
                        case "length_Unchecked":
                            return method.length_Unchecked(dom);
                            break;
                    }
                }
            };
            listbox.topclick = function () {
                /// <summary>
                /// 隐藏或者显示下拉框
                /// </summary>
                this.dom.find(".top").click(function (e) {
                    $(this).parent().find(".body").toggle()
                })
            };
            listbox.hoverBody = function () {
                /// <summary>
                /// 下拉框鼠标经过时出现背景色
                /// </summary>
                this.dom.find(".body ul li").hover(function () {
                    $(this).css("background", "#ccc");
                }, function () {
                    $(this).css("background", "none");
                })

            };
            listbox.checkAll = function () {
                /// <summary>
                /// 全选功能
                /// </summary>
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
                            var labelElement = "<span name='" + name + "'>" + text + "<img class='delImage'   src='https://raw.githubusercontent.com/gaoconggit/Landa.Help/LandaUI/Landa.Help/TangDR/images/icon1.png'/></span>";
                            dom.find(".top").append(" " + labelElement);
                        });
                        listbox.delTag();
                    }
                    else {
                        //取消勾选
                        dom.find(".body li").find("input").prop("checked", false)
                        dom.find(".top").text("");
                    }
                })
            };
            listbox.checkAllHelp = function () {
                /// <summary>
                /// 全选辅助
                /// </summary>
                var dom = this.dom;
                var length = this.length(dom);
                var length_Checked = this.length_Checked(dom);
                if (length == length_Checked) {
                    dom.find("[name=checkAll]").prop("checked", true);
                }
                else {
                    dom.find("[name=checkAll]").prop("checked", false);
                }
            };
            listbox.itemsChange = function () {
                /// <summary>
                /// 项勾选
                /// </summary>
                var dom = this.dom;
                var checkAllHelp = this.checkAllHelp;
                this.dom.find("ul li [type=checkbox]").change(function () {
                    var status = $(this).prop("checked");
                    var name = $(this).prop("name");
                    var text = $(this).parent()["0"].innerText;
                    //添加选中项
                    if (status) {
                        var labelElement = "<span name='" + name + "'>" + text + "<img class='delImage'  src='https://raw.githubusercontent.com/gaoconggit/Landa.Help/LandaUI/Landa.Help/TangDR/images/icon1.png'/></span>";
                        dom.find(".top").append(" " + labelElement);
                    }
                        //取消选中项
                    else {
                        dom.find(".top [name=" + name + "]").remove();
                    }
                    listbox.delTag();
                    //全选帮助
                    listbox.checkAllHelp();
                })


            };
            listbox.genarateItems = function (data) {
                /// <summary>
                /// 生成项
                /// </summary>
                /// <param name="data" type="type"></param>
                var additems = "";
                $(data).each(function () {
                    additems += "<li><input name='" + this.name + "' value='" + this.value + "' type='checkbox'/>" + this.text + "</li>";
                })
                this.dom.find(".body ul").append(additems);
                listbox.topclick();
                listbox.hoverBody();
                listbox.itemsChange();
                listbox.checkAll();
            };
            listbox.bindData = function (url) {
                /// <summary>
                /// 绑定数据
                /// </summary>
                /// <param name="url" type="type">url地址或者本地数据</param>
                var dom = this.dom;
                if (typeof (url) == "string") {
                    $.getJSON(url, function (data) {
                        listbox.insert();
                        //异步json数据生成控件项
                        listbox.genarateItems(data);

                    })
                }
                else if (typeof (url) == "object") {
                    listbox.insert();
                    //本地数据生成控件项
                    var data = url;
                    listbox.genarateItems(data);
                }
                listbox.help();

            };
            listbox.delTag = function () {
                /// <summary>
                /// 点击图片删除事件
                /// </summary>
                var dom = this.dom;
                dom.find(".top img").click(function (e) {
                    e.stopPropagation();
                    var name = $(this).parent().attr("name");
                    var length = method.length(dom);
                    var length_Checked = method.length_Unchecked(dom);
                    dom.find(".top [name=" + name + "]").remove();
                    dom.find(".body ul li [name=" + name + "]").prop("checked", false)
                    if (dom.find(".top").text() == "") {
                        dom.find(".body [name=checkAll]").prop("checked", false);
                    }
                    if (length == length_Checked) {
                        dom.find("[name=checkAll]").prop("checked", true);
                    }
                    else {
                        dom.find("[name=checkAll]").prop("checked", false);
                    }
                });
            };
            listbox.help = function () {
                /// <summary>
                /// 点到控件外面隐藏下拉框
                /// </summary>
                var dom = this.dom;
                dom.click(function (e) {
                    e.stopPropagation();
                })
                $(document).click(function (event) {
                    dom.find(".body").hide();
                });
            };
            //config配置验证
            vaild.configVaild(config);
            //配置属性或调用方法
            return vaild.callFunction(config);
        }
    })
})($)