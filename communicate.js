/**
 * page页面之间进行通讯
 * 页面之间通讯需要依赖localstorge的storge事件
 */

; (function (context) {
    var classevent;
    var MARK = "COMMUNICATE_"

    function init() {
        if (typeof classevent != "function") {
            throw (new Error("classevent为空"));
        }
        var instance = new classevent();
        var original = instance.ExcuteEvent;

        window.addEventListener("storage", function (ev) {
            var key = ev.key;
            if (!key.startsWith(MARK) || !ev.newValue) {
                return;
            }
            var type = key.replace(MARK, "");
            value = JSON.parse(ev.newValue);
            if (value.isskip) {
                return;
            }
            original.call(instance, type, value.sender, value.event);
        })
        /**
         * 调整exec的实现，先进行相关数据的转换，然后将数据存储到localstorge中，出发storage事件，然后将数据进行解析出发对应的事件
         * @param sender string 用于标记消息发送的页面，网站中唯一
         * @param event object 可以用于进行json化转换为string字符串
         */
        instance.ExcuteEvent = function (type, sender, event) {
            localStorage.setItem(MARK + type, JSON.stringify({ isskip: true }));
            localStorage.setItem(MARK + type, JSON.stringify({ sender: sender, event: event, isskip: false }));
        }
        return instance
    }


    if (typeof define == "function" && define.amd) {
        define(function (require) {
            classevent = require("./classevent")
            return init();
        });
    } else if (typeof module == "object" && module.exports) {
        classevent = require("./classevent")
        module.exports = init();
    } else {
        classevent = context["ClassEvent"]
        context["PAGECOMMUNICATE"] = init();
    }
})(window ? window : this || {})