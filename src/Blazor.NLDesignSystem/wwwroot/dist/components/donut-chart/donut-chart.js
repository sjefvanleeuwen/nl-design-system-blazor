/*!
NL Design System Componenten library 0.1.1, build date 27-06-2020
Copyright 2011-2020 The NL Design System Authors
Copyright 2011-2020 Duo
Author: DUO & The NL Design System Authors
Author URI: https://nl-design-system.gitlab.io/nl-design-system/
License: EUPL v1.2
License URL: https://joinup.ec.europa.eu/software/page/eupl5
Version: 0.1.1
*/
var INNER_COLOR = '#ffffff';
var GLOBAL_ALPHA_OPACITY = 0.2;
/**
 * @class DonutChart
 * Creates a donut chart.
 */
var DonutChart = (function () {
    function DonutChart(element) {
        this.element = element;
        this._value = 0;
        if (element) {
            this.setup();
            this.setupListeners();
        }
        else {
            throw new Error('No element provided');
        }
    }
    Object.defineProperty(DonutChart.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value <= 100 && value >= 0) {
                this._value = value;
            }
            else {
                throw new Error('Value should be a percentage and therefore between (and including) 0 and 100');
            }
        },
        enumerable: true,
        configurable: true
    });
    DonutChart.prototype.setup = function () {
        this.canvas = this.element.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.setColor();
        this.setSize();
        this.setInner();
    };
    DonutChart.prototype.setInner = function () {
        var innerDiv = this.element.getElementsByClassName('donut-chart__inner')[0];
        if (innerDiv) {
            var innerRadius = (2 * this.radius) - this.arcWidth;
            // inner div should be the biggest square that could fit inside the inner radius of the chart.
            var innerSize = Math.sqrt(Math.pow(innerRadius, 2) / 2);
            innerDiv.style.width = innerSize + "px";
            innerDiv.style.height = innerSize + "px";
        }
        else {
            throw new Error('No element with class "donut-chart__inner" found');
        }
    };
    DonutChart.prototype.setupListeners = function () {
        var _this = this;
        window.addEventListener('resize', this.debounce(function () { return _this.updateSize(); }, 250));
    };
    /**
     * draws the donut chart.
     */
    DonutChart.prototype.draw = function () {
        var offset = this.calcOffset();
        var switchPoint = this.calcSwitchPoint(offset);
        var startPoint = this.calcStartPoint(offset);
        var endPoint = this.calcEndPoint(offset);
        // fill chart until given value.
        this.ctx.beginPath();
        this.ctx.lineWidth = this.arcWidth;
        this.ctx.arc(this.xCoord, this.yCoord, this.radius, startPoint, switchPoint);
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        // fill remaining part of chart.
        this.ctx.beginPath();
        this.ctx.arc(this.xCoord, this.yCoord, this.radius, switchPoint, endPoint);
        this.ctx.strokeStyle = this.color;
        this.ctx.globalAlpha = GLOBAL_ALPHA_OPACITY;
        this.ctx.stroke();
        // fill center. Otherwise it is a pie, not a donut.
        this.ctx.beginPath();
        this.ctx.fillStyle = INNER_COLOR;
        this.ctx.fill();
    };
    DonutChart.prototype.calcOffset = function () {
        return -Math.PI * 0.5;
    };
    DonutChart.prototype.calcStartPoint = function (offset) {
        return 0 + offset;
    };
    DonutChart.prototype.calcSwitchPoint = function (offset) {
        return ((this._value / 100) * (Math.PI * 2)) + offset;
    };
    DonutChart.prototype.calcEndPoint = function (offset) {
        return (Math.PI * 2) + offset;
    };
    DonutChart.prototype.setColor = function () {
        var styles = window.getComputedStyle(this.element);
        this.color = styles.color;
    };
    DonutChart.prototype.setSize = function () {
        var size = this.canvas.clientWidth;
        var dpi = window.devicePixelRatio;
        this.canvas.style.height = size + "px";
        this.canvas.height = size * dpi;
        this.canvas.width = size * dpi;
        this.yCoord = (size * dpi) / 2;
        this.xCoord = (size * dpi) / 2;
        this.arcWidth = 0.1 * (size * dpi);
        this.radius = ((size * dpi) / 2) - this.arcWidth;
    };
    DonutChart.prototype.updateSize = function () {
        this.setSize();
        this.setInner();
        this.draw();
    };
    DonutChart.prototype.destroy = function () {
        var _this = this;
        window.removeEventListener('resize', this.debounce(function () { return _this.updateSize(); }, 250));
    };
    DonutChart.prototype.debounce = function (func, timeout) {
        var timer;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            window.clearTimeout(timer);
            timer = window.setTimeout(function () { func.apply(void 0, args); }, timeout);
        };
    };
    return DonutChart;
})();
exports.DonutChart = DonutChart;
