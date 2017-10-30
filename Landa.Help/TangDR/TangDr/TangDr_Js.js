/**
*@class JavaScript原生拓展
*
* 
* 
* 
* 
* 
* 
* 
**/

(function () {
    
    String.prototype.trim = function () {
        /// <summary>
        /// 清除字符串两边空格
        /// </summary>
        /// <param name=") {" type="type"></param>
        return this.replace(/(^\s*)|(\s*$)/g, '');
    };

    String.prototype.resetBlank = function () {
        /// <summary>
        /// 字符串空格合并（所有2个以上空格合并为一个）
        /// </summary>
        /// <returns type=""></returns>
        var regEx = /\s+/g;
        return this.replace(regEx, ' ');
    };

    String.prototype.getNum = function () {
        /// <summary>
        /// 得到字符串中的数字
        /// </summary>
        /// <returns type=""></returns>
        var regEx = /[^\d]/g;
        return this.replace(regEx, '');
    };

    String.prototype.getCN = function () {
        /// <summary>
        /// 得到字符串中的中文
        /// </summary>
        /// <returns type=""></returns>
        var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
        return this.replace(regEx, '');
    };


    String.prototype.toInt = function () {
        /// <summary>
        /// String转化为Number  
        /// </summary>
        /// <returns type=""></returns>
        return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
    };

    Object.prototype.isEmpty = function () {
        var obj = this;
        /// <summary>
        /// 是否为空  
        /// </summary>
        /// <returns type=""></returns>
        var flag = false;
        if (obj == null || obj == undefined || typeof (obj) == 'undefined' || obj == '') {
            flag = true;
        } else if (typeof (obj) == 'string') {
            obj = obj.trim();
            if (obj == '') {//为空  
                flag = true;
            } else {//不为空  
                obj = obj.toUpperCase();
                if (obj == 'NULL' || obj == 'UNDEFINED' || obj == '{}') {
                    flag = true;
                }
            }
        }
        else {
            flag = false;
        }
        return flag;
    }
}())