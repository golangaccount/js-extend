; (function (context) {

    function ClassEvent() {
        this.EventSuffix = "Event";//事件名称的后缀
        this.EventOption = "Option";//注册事件时携带参数 参数与注册函数绑定时的名称的后缀
        this.EventName = [];//所有已经注册的事件名称
    }

    /**
     * 注册事件的名称
     * @param name 事件的名称
     */
    ClassEvent.prototype.RegistEventName = function (name) {
        if (this.EventName.indexOf(name) == -1) {
            this.EventName.push(name);
        }
    }

    /**
     * 获取所有注册事件名称
     */
    ClassEvent.prototype.GetRegistEventName=function(){
        return this.EventName;
    }

    /**
    * 注册事件
    * @param type 事件类型
    * @param callback 事件的回调函数
    * @param option 与注册事件绑定的回调参数
    */
    ClassEvent.prototype.RegistEvent = function (type, callback, option) {
        if (typeof type !== "string" || typeof callback != "function")
            return;
        this.RegistEventName(type);
        if (!this[type + this.EventSuffix]) {
            this[type + this.EventSuffix] = [];
        }
        if (option) {
            callback[type + this.EventSuffix + this.EventOption] = option;
        }
        this[type + this.EventSuffix].push(callback);
    }

    /**
    * 注册事件(只执行一次) 取消事件时，需要使用返回的函数进行取消
    * @param type 事件类型
    * @param callback 事件的回调函数
    * @param option 与注册事件绑定的回调参数
    */
    ClassEvent.prototype.RegistOnce = function (type, callback, option) {
        if (typeof callback != "function") {
            return
        }
        var _self = this;

        var va = function (send, event, op) {
            callback(send, event, option)
            _self.RemoveEvent(type, va);
        }
        this.RegistEvent(type, va);
        return va;
    }

    /**
     * 移除注册的事件
     * @param type 事件类型
     * @param callback 需要移除的事件
     */
    ClassEvent.prototype.RemoveEvent = function (type, callback) {
        if (this[type + this.EventSuffix]) {
            var index = this[type + this.EventSuffix].index(callback);
            if (index != -1) {
                delete callback[type + this.EventSuffix + this.EventOption];
                this[type + this.EventSuffix].splice(index, 1);
            }
        }
    }

    /**
     * 清除某一类型的所有时间
     * @param type 需要清除的事件类型
     */
    ClassEvent.prototype.ClearEvent = function (type) {
        if (this[type + this.EventSuffix]) {
            for (var i = 0; i < this[type + this.EventSuffix].length; i++) {
                delete this[type + this.EventSuffix][i][type + this.EventSuffix + this.EventOption];
            }
            this[type + this.EventSuffix] = [];
        }
    }

    /**
     * 执行某一类型的事件
     * @param type 事件的类型
     * @param send 事件的发起者
     * @param event 事件参数
     */
    ClassEvent.prototype.ExcuteEvent = function (type, send, event) {
        if (this[type + this.EventSuffix]) {
            for (var i = 0; i < this[type + this.EventSuffix].length; i++) {
                this[type + this.EventSuffix][i](send, event, this[type + this.EventSuffix][i][type + this.EventSuffix + this.EventOption]);
            }
        }
    }



    if (typeof define == "function" && define.amd) {
        define(function () {
            return ClassEvent;
        });
    } else if (typeof module == "object" && module.exports) {
        module.exports = ClassEvent;
    } else {
        context["ClassEvent"] = ClassEvent;
    }

})(window ? window : this || {})