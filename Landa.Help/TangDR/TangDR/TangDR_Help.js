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
        getMax: function (obj) {
            /// <summary>
            /// 得到数组最大数 
            /// </summary>
            /// <param name="obj" type="array">数组</param>
            /// <returns type="array">数组</returns>
			var max = obj[0];
			$(obj).each(function(i){
				if( max < obj[i])
				{
					max = obj[i];
				}		
			})
			return max;
		},
        getMin: function(obj) {
            /// <summary>
            /// 得到数组最小数
            /// </summary>
            /// <param name="obj" type="array">数组</param>
            /// <returns type="int">最小数</returns>
			var min = obj[0];
			$(obj).each(function(i){
				if( min > obj[i])
				{
					min = obj[i];
				}		
			})
			return min;
        },
        arraySoft: function (obj, rule) {
            /// <summary>
            /// 数组排序
            /// </summary>
            /// <param name="obj" type="array">数组</param>
            /// <param name="rule" type="string">max从大到小，min从小到大</param>
            /// <returns type="array">得到排序的数组</returns>
            var temp;
            $(obj).each(function (i) {
                $(obj).each(function (j) {
                    if (rule == "max") {
                        if (obj[i] > obj[j]) {
                            temp = obj[i];
                            obj[i] = obj[j];
                            obj[j] = temp;
                        }
                    }
                    else if(rule == "min") {
                        if (obj[i] < obj[j]) {
                            temp = obj[i];
                            obj[i] = obj[j];
                            obj[j] = temp;
                        }
                    }
                })
            })
            return obj;
        },
        getParamater: function (name) {
            /// <summary>
            /// 获取url中参数
            /// </summary>
            /// <param name="name" type="string">参数名称</param>
            /// <returns type="string"></returns>
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
	})
}($))

