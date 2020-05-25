/**
 * 用原生 JS 封装一个 Toast 组件
 */
var Toast = {
    // 隐藏的 setTimeOut 引用
    hideTimeOut: null,
    /**
     * 初始化
     */
    init: function () {
        var toastNode = document.getElementById("toastWaka");
        if (toastNode == undefined) {
            toastNode = document.createElement("section");
            toastNode.innerHTML =
                '<i class="iconfont icon-success"></i><i class="iconfont icon-error"></i><span class="text">111</span>';
            toastNode.id = "toastWaka"; // 设置id，一个页面有且仅有一个Toast
            toastNode.setAttribute("class", "toast"); // 设置类名
            toastNode.style.display = "none"; // 设置隐藏
            document.body.appendChild(toastNode);
        }
    },
    /**
     * 显示Toast
     * @param text 文本内容
     * @param type 类型 success error
     * @param duration 持续时间
     */
    show: function (text, type, duration) {
        Toast.init();
        // 确保上一次的 TimeOut 已被清空
        if (this.hideTimeOut) {
            clearTimeout(this.hideTimeOut);
            this.hideTimeOut = null;
        }
        if (!text) {
            return;
        }
        var domToastWaka = document.getElementById("toastWaka");
        if (!domToastWaka) {
            return;
        }
        var domIconSuccess = domToastWaka.querySelector(".icon-success"); // 成功图标
        var domIconError = domToastWaka.querySelector(".icon-error"); // 错误图标
        var domToastText = domToastWaka.querySelector(".text"); // 文字
        domToastText.innerHTML = text || "";
        switch (type) {
            case "success":
                domIconSuccess.style.display = "inline";
                domIconError.style.display = "none";
                break;
            case "error":
                domIconSuccess.style.display = "none";
                domIconError.style.display = "inline";
                break;
            default:
                domIconSuccess.style.display = "none";
                domIconError.style.display = "none";
                break;
        }
        domToastWaka.style.display = "block";
        SetOpacity(G("toastWaka"), 100);
        this.hideTimeOut = setTimeout(function () {
            Toast.hide();
        }, duration || 2000);
    },
    /**
     * 隐藏 Toast
     */
    hide: function () {
        fadeOut(G('toastWaka'), 40, 0);
    }
};
function G(name) {
    return document.getElementById(name);
}
function SetOpacity(ev, v) {
    ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
}
function fadeIn(elem, speed, opacity) {
    speed = speed || 20;
    opacity = opacity || 100;
    elem.style.display = 'block';
    iBase.SetOpacity(elem, 0);
    var val = 0;
    (function () {
        SetOpacity(elem, val);
        val += 10;
        if (val <= opacity + 500) {
            setTimeout(arguments.callee, speed);
        } else {
            fadeOut(iBase.Id(elem.id));
        }
    })();
}
function fadeOut(elem, speed, opacity) {
    speed = speed || 20;
    opacity = opacity || 0;
    var val = 150;
    (function () {
        SetOpacity(elem, val);
        val -= 10;
        if (val >= opacity) {
            setTimeout(arguments.callee, speed);
        } else if (val <= 0) {
            elem.style.display = 'none';
        }
    })();
}