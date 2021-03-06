/// <reference path="jquery-3.2.1.min.js" />
/*
 * @function: getMax 得到数组最大数 
 * @function: getMin 得到数组最小数
 * @function: arraySoft 数组排序
 * @function: getParamater 得到url中的参数值
 *
 *
 * 
 * */


(function(){
    $.extend({
        getMax: function (arr) {
            /// <summary>
            /// 得到数组最大数 
            /// </summary>
            /// <param name="obj" type="array">数组</param>
            /// <returns type="array">数组</returns>
            return Math.max.apply(null, arr);
		},
        getMin: function (arr) {
            /// <summary>
            /// 得到数组最小数
            /// </summary>
            /// <param name="obj" type="array">数组</param>
            /// <returns type="int">最小数</returns>
            return Math.min.apply(null, arr);
        },
        arraySoft: function(obj, rule) {
            /// <summary>
            /// 数组排序
            /// </summary>
            /// <param name="obj" type="array">数组</param>
            /// <param name="rule" type="string">max从大到小，min从小到大</param>
            /// <returns type="array">得到排序的数组</returns>
            if (rule == "max") {
                obj.sort(function (a, b) { return b - a });
            }
            if (rule == "min") {
                obj.sort(function (a, b) { return a - b });
            }
        },
        objectSoft: function(obj, value, rule) {
            /// <summary>
            /// 对象数组排序
            /// </summary>
            /// <param name="obj" type="array">对象数组</param>
            /// <param name="value" type="string">排序属性</param>
            /// <param name="rule" type="string">max：从大到小，min：从小到大</param>
            /// <returns type=""></returns>
            if (rule == "max") {
                obj.sort(function (a, b) { return b.value - a.value });
            }
            if (rule == "min") {
                obj.sort(function (a, b) { return a.value - b.value });
            }
        },
        getParamater: function(name) {
            /// <summary>
            /// 获取url中参数
            /// </summary>
            /// <param name="name" type="string">参数名称</param>
            /// <returns type="string"></returns>
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        formDataLoad: function (domId, obj) {
            /// <summary>
            /// json自动填充From表格
            /// </summary>
            /// <param name="domId" type="type">填充From的ID号</param>
            /// <param name="obj" type="type">填充json数据 json格式："name": "内容"</param>
            for (var property in obj) {
                if (obj.hasOwnProperty(property) == true) {
                    if ($("#" + domId + " [name='" + property + "']").length > 0) {
                        $("#" + domId + " [name='" + property + "']").each(function () {
                            var dom = this;
                            if ($(dom).attr("type") == "radio") {
                                $(dom).filter("[value='" + obj[property] + "']").attr("checked", true);
                            }
                            if ($(dom).attr("type") == "checkbox") {
                                obj[property] == true ? $(dom).attr("checked", "checked") : $(dom).attr("checked", "checked").removeAttr("checked");
                            }
                            if ($(dom).attr("type") == "text" || $(dom).prop("tagName") == "SELECT" || $(dom).attr("type") == "hidden" || $(dom).attr("type") == "textarea") {
                                $(dom).val(obj[property]);
                            }
                            if ($(dom).prop("tagName") == "TEXTAREA") {
                                $(dom).val(obj[property]);
                            }
                            if ($(dom).prop("type") == "password") {
                                $(dom).val(obj[property]);
                            }
                        });
                    }
                }
            }
        }
    })
    $.fn.extend({
        resetForm: function () {
            /// <summary>
            /// 清空表单
            /// </summary>
            return this.each(function(){
                this.reset();
            });
        },
        isArraySame: function (name) {
            /// <summary>
            /// 在数组中是否有相同name
            /// </summary>
            /// <param name="name" type="type">检测的name</param>
            /// <returns type="">bool</returns>
            for (var i in this)
            {
                if (this[i] == name) {
                    return true;
                }
            }
            return false;
        }
    })
}($))

