; (function (context) {
    "use strict"
    Date.formatReg = /d+|M+|y+|h+|H+|m+|s+/g;
    Date.milliseconds = 1;
    Date.second = Date.milliseconds * 1000;
    Date.minute = Date.second * 60;
    Date.hour = Date.minute * 60;
    Date.day = Date.hour * 24;
    Date.year365 = Date.day * 365;
    Date.year366 = Date.day * 366;
    Date.timespanType = {
        Milliseconds: "millisecond",
        Second: "second",
        Minute: "minute",
        Hour: "hour",
        Day: "day"
    }

    function init() {
        if (this.isinit) {
            return
        }
        this.isinit = true;
        this.d = this.getDate().toString(); //月中的某一天。一位数的日期没有前导零
        this.dd = this.getDate().fillZero(2); //月中的某一天。一位数的日期有一个前导零。 
        this.M = (this.getMonth() + 1).toString(); //月份数字。一位数的月份没有前导零。
        this.MM = (this.getMonth() + 1).fillZero(2); //月份数字。一位数的月份有一个前导零。 
        this.yy = (this.getFullYear() % 100).fillZero(2); //不包含纪元的年份。如果不包含纪元的年份小于 10，则显示具有前导零的年份。
        this.yyyy = this.getFullYear().toString(); //包括纪元的四位数的年份。 
        this.h = (this.getHours() % 12).toString(); //12 小时制的小时。一位数的小时数没有前导零。
        this.hh = (this.getHours() % 12).fillZero(2); //12 小时制的小时。一位数的小时数有前导零。 
        this.H = this.getHours().toString(); //24 小时制的小时。一位数的小时数没有前导零。 
        this.HH = this.getHours().fillZero(2); //24 小时制的小时。一位数的小时数有前导零。 
        this.m = this.getMinutes().toString(); //分钟。一位数的分钟数没有前导零。 
        this.mm = this.getMinutes().fillZero(2); //分钟。一位数的分钟数有一个前导零。 
        this.s = this.getSeconds().toString(); //一位数的秒数没有前导零。 
        this.ss = this.getSeconds().fillZero(2); //一位数的秒数有一个前导零。 
    }

    /**
    * 格式化时间输出
    * @param {*时间输出格式} format 
    */
    function format(format) {
        this.init();
        if (typeof format === "string") {
            return format.replace(Date.formatReg, function (arg) {
                return this[arg];
            }.bind(this));
        } else {
            return;
        }
    }

    /**
     * 添加指定的时间
     * @param {*增加的类型} type 
     * @param {*增加的数值} num 
     */
    function addTimeSpan(type, num) {
        if (type && typeof type === "number") {
            num = type;
            type = "second";
        }
        switch (type) {
            case Date.timespanType.milliseconds:
                return new Date(this.getTime() + num);
            case Date.timespanType.second:
                return new Date(this.getTime() + num * Date.second);
            case Date.timespanType.Minute:
                return new Date(this.getTime() + num * Date.minute);
            case Date.timespanType.Hour:
                return new Date(this.getTime() + num * Date.hour);
            case Date.timespanType.Day:
                return new Date(this.getTime() + num * Date.day);
            default:
                return this;
        }
    }

    /**
     * 相对指定的时间验证是不是有效时间（比指定时间大则为有效时间）
     * @param {*用于作为验证的参考时间} num 
     */
    function isValidDate(num) {
        if (typeof num !== "number") {
            num = 0;
        }
        return this.getTime() >= num;
    }

    /**
     * 验证时间是否有效，并指定格式输出
     * @param {*用于进行验证的参考时间} num 
     * @param {*格式化样式} format 
     * @param {*无效时间时的默认输出} defaultstr 
     */
    function validString(num, format, defaultstr) {
        if (this.isValidDate(num)) {
            return this.format(format);
        } else {
            return defaultstr || "";
        }
    }

    /**
     * 计算两个时间之间相隔的时间
     * @param {*用于进行比较的时间} date 
     * @param {*输出的时间差值的类型} type 
     */
    function timespan(date, type) {
        var span = this - date;
        switch (type) {
            case Date.timespanType.milliseconds:
                return span;
            case Date.timespanType.second:
                return parseInt(span / Date.second);
            case Date.timespanType.Minute:
                return parseInt(span / Date.minute);
            case Date.timespanType.Hour:
                return parseInt(span / Date.hour);
            case Date.timespanType.Day:
                return parseInt(span / Date.day);
            default:
                return this;
        }
    }

    /**
     * 是否在指定的时间之前
     * @param {date/string/number} dt 
     */
    function before(dt) {
        if (typeof dt == "object" && dt instanceof Date) {
            return this.before(dt.getTime())
        } else if (typeof dt == "string") {
            this.before(new Date(dt))
        } else if (typeof dt == "number") {
            return this.getTime() < dt
        }
    }

    /**
     * 是否在指定时间之后
     * @param {date/string/number} dt 
     */
    function after(dt) {
        return !this.before(dt);
    }

    function extend() {
        Object.defineProperties(Date.prototype, {
            init: {
                enumerable: false,
                writable: false,
                value: init
            },
            format: {
                enumerable: false,
                writable: false,
                value: format
            },
            addTimeSpan: {
                enumerable: false,
                writable: false,
                value: addTimeSpan
            },
            isValidDate: {
                enumerable: false,
                writable: false,
                value: isValidDate
            },
            validString: {
                enumerable: false,
                writable: false,
                value: validString
            },
            where: {
                enumerable: false,
                writable: false,
                value: where
            },
            timespan: {
                enumerable: false,
                writable: false,
                value: timespan
            },
            before: {
                enumerable: false,
                writable: false,
                value: before
            },
            after: {
                enumerable: false,
                writable: false,
                value: after
            }
        });
    }
    if (typeof define == "function" && define.amd) {
        define(function (require) {
            require("./number");
            extend();
        });
    } else if (typeof module == "object" && module.exports) {
        require("./number")
        extend();
    } else {
        //依赖于number库
        extend();
    }
})(window ? window : this || {})