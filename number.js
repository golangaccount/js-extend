; (function (context) {
    'use strict';
    /**
     * 用于进行填充补位
     * @param {*} 输出长度 
     * @param {*} 填充字符
     */
    function fillstr(length, fillstr) {
        var result = this.toString();
        var fill = [];
        if (result.length >= length) {
            return result;
        } else {
            fillstr = typeof fillstr === "string" && fillstr || "0" //默认使用0进行填充
            var count = length - result.length;
            for (var i = 0; i < count; i++) {
                fill.push(fillstr);
            }
            fill.push(result);
            return fill.join("");
        }
    }

    Object.defineProperties(Number.prototype, {
        FillStr: {
            enumerable: false,
            writable: false,
            value: fillstr
        }
    })

})(window ? window : this || {});