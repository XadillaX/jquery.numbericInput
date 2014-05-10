/**
 * Created by XadillaX on 14-5-11.
 */
// <button class="numberic-ipt-group-btn">-</button><input type="text" class="numberic-ipt-group-ipt" /><button class="numberic-ipt-group-btn">+</button>
;
(function ($) {
    var addListener = function (obj, callback) {
        var ipt = obj.find("input");

        ipt.keyup(function () {
            var val = $(this).val();
            if (val !== "") {
                $(this).attr("prevValue", val);
            } else {
                if (val !== $(this).attr("prevValue")) {
                    if (undefined !== callback) {
                        callback(parseInt(val));
                    }
                }
            }
        });
        ipt.blur(function () {
            var val = $(this).val();
            if (val === "") {
                $(this).val($(this).attr("prevValue"));
            }
        });

        obj.find(".numberic-ipt-dec").click(function () {
            var val = ipt.val();
            val = parseInt(val);
            if (val === "" && ipt.attr("preValue")) {
                val = ipt.attr("prevValue");
                val = parseInt(val);
            }

            var min = parseInt(ipt.attr("min"));
            if (ipt.attr("min") === "") min = NaN;

            if (isNaN(val)) {
                if (isNaN(min)) val = 0;
                else val = min;
            } else {
                val--;
                if (!isNaN(min) && val < min) val = min;
            }

            ipt.val(val);
            ipt.attr("prevValue", val);

            if (callback !== undefined) callback(val);
        });

        obj.find(".numberic-ipt-plus").click(function () {
            var val = ipt.val();
            val = parseInt(val);
            if (val === "" && ipt.attr("preValue")) {
                val = ipt.attr("prevValue");
                val = parseInt(val);
            }

            var max = parseInt(ipt.attr("max"));
            if (ipt.attr("max") === "") max = NaN;
            var min = parseInt(ipt.attr("min"));
            if (ipt.attr("min") === "") min = NaN;

            if (isNaN(val)) {
                if (isNaN(min)) val = 0;
                else val = min;
            } else {
                val++;
                if (!isNaN(max) && val > max) val = max;
            }

            ipt.val(val);
            ipt.attr("prevValue", val);

            if (callback !== undefined) callback(val);
        });
    };

    $.browser = {};
    $.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    $.fn.numbericInput = function (op) {
        var num = parseInt(op);
        if (!isNaN(num) || undefined === op || typeof op === "object") {
            if (undefined) num = 0;
            else if (typeof op === "object") {
                num = op.number;
                if (undefined === num) {
                    num = 0;
                }
            }
            var html = '<button class="numberic-ipt-group-btn numberic-ipt-dec">-</button><input type="text" prevValue="' + num + '" value="' + num + '" class="numberic-ipt-group-ipt" /><button class="numberic-ipt-group-btn numberic-ipt-plus">+</button>';
            $(this).html(html);

            if (typeof op === "object") {
                if (typeof op.min === "number") {
                    $(this).find("input").attr("min", op.min);
                }
                if (typeof op.max === "number") {
                    $(this).find("input").attr("max", op.max);
                }
            }
            $(this).find("input").numeral();

            var onChange = undefined;
            if (typeof op === "object" && typeof op.onChange === "function") {
                onChange = op.onChange;
                onChange = onChange.bind(this);
            }

            addListener($(this), onChange);
        } else if ("getVal" === op) {
            return parseInt($(this).find(".numberic-ipt-group-ipt").val());
        }
    };

    $.fn.numeral = function () {
        $(this).css("ime-mode", "disabled");
        this.bind("keypress", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
            if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下不能使用退格键
            {
                return;
            }
            return code >= 48 && code <= 57;
        });
        this.bind("blur", function () {
            if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
                this.value = this.value.substr(0, this.value.length - 1);
            } else if (isNaN(this.value)) {
                this.value = "";
            }
        });
        this.bind("paste", function () {
            var s = clipboardData.getData('text');
            if (!/\D/.test(s));
            value = s.replace(/^0*/, '');
            return false;
        });
        this.bind("dragenter", function () {
            return false;
        });
        this.bind("keyup", function () {
            if (/(^0+)/.test(this.value)) {
                this.value = this.value.replace(/^0*/, '');
            }
        });
    };
})(jQuery);
