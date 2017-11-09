/// <reference path="javascript/jquery-3.2.1.js" />
/// <reference path="javascript/TangDr_Js.js" />
/// <reference path="javascript/TangDR_Help.js" />
(function () {
    $.fn.extend({
        ListBox: function (config) {
            var Widget = {
                init: function (dom, method) {
                    this.dom = dom;
                },
                insert: function () {
                    this.dom.append("<div class='top'></div>"
                                     + "<div class='body'>"
                                     + "<input name='checkAll'  type='checkbox' />全选"
                                     + "<ul>"
                                     + "</ul>"
                                     + "</div>");
                    this.dom.addClass("TangDRlistBox");
                },

            }
            //继承自Widget方法
            var method = Object.create(Widget);
            method.init(this);
            method.getItems = function (dom) {
                var group = new Array();
                var name
                    ,text
                    ,value;
                dom.find("ul li [type=checkbox]").each(function (i) {
                     name = $(this).prop("name");
                     text = $(this).parent()["0"].innerText;
                     value = $(this).prop("value");
                     group[i] = {
                         name: name,
                         text: text,
                         value: value
                     }
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
                var length_checked = 0;
                var array = dom.find(".body ul li").find("input");
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
            //属性配置
            if (typeof (config) == "object") {
                var configArray = new Array();
                for (var i in config) {
                    switch (i) {
                        case "data":
                            configArray.push(i);
                            var url = config[i];
                            break;
                    }
                }
            }
            //方法调用
            else if (typeof (config) == "string") {
                switch (config) {
                    case "getItems":
                        return method.getItems(this);
                        break;
                    case "getSelectedValues":
                        return method.getSelectedValues(this);
                        break;
                    case "length":
                        return method.length(this);
                        break;
                    case "length_Checked":
                        return method.length_Checked(this);
                        break;
                    case "length_Unchecked":
                        return method.length_Unchecked(this);
                        break;
                }
            }
            //继承method
            var listbox = Object.create(method);
            var vaild = Object.create(listbox);
            vaild.configVaild = function () {
                if (typeof (config) != "string" && typeof (config) != "object") {
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
                if (typeof (config) == "object") {
                    for (var name in config) {
                        if ($(configArray).isArraySame(name) == false) {
                            throw Error("ListBox配置项错误！");
                        }
                    }
                }
            }
            listbox.topclick = function () {
                this.dom.find(".top").click(function (e) {
                    $(this).parent().find(".body").toggle()
                })
            }
            listbox.hoverBody = function () {
                
                this.dom.find(".body ul li").hover(function () {
                    $(this).css("background", "#ccc");
                }, function () {
                    $(this).css("background", "none");
                })

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
            }
            listbox.checkAllHelp = function () {
                var dom = this.dom;
                var length = this.length(dom);
                var length_Checked = this.length_Checked(dom);
                if (length == length_Checked) {
                    dom.find("[name=checkAll]").prop("checked", true);
                }
                else {
                    dom.find("[name=checkAll]").prop("checked", false);
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


            }
            listbox.genaraeItems = function (data) {
                var additems = "";
                $(data).each(function () {
                    additems += "<li><input name='" + this.name + "' value='" + this.value + "' type='checkbox'/>" + this.text + "</li>";
                })
                this.dom.find(".body ul").append(additems);
                listbox.itemClick();
                listbox.topclick();
                listbox.hoverBody();
                listbox.checkAll();
            }
            listbox.bundData = function (url) {
                var dom = this.dom;
                debugger
                if (typeof (url) == "string") {
                    $.getJSON(url, function (data) {
                        listbox.insert();
                        //异步json数据生成控件项
                        listbox.genaraeItems(data);

                    })
                }
                else if (typeof (url) == "object") {
                    listbox.insert();
                    //本地数据生成控件项
                    var data = url;
                    listbox.genaraeItems(data);
                }
                listbox.help();

            }
            listbox.delTag = function () {
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
            }
            listbox.help = function () {
                //点到控件外自动隐藏body
                var dom = this.dom;
                dom.click(function (e) {
                    e.stopPropagation();
                })
                $(document).click(function (event) {
                    dom.find(".body").hide();
                });
            }
            //配置验证
            vaild.configVaild(config);
            //绑定数据
            listbox.bundData(url);
        }
    })
})($)