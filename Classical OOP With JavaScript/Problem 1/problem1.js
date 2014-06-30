var CanvasModule = (function () {
    var ctx = document.querySelector('canvas').getContext('2d');

    function CanvasModule(defaultOptions, canvasToUse) {
        // Gives a default drawing style to the module
        // which is used by each method, if no 
        // concrete parameters are passed to it.
        defaultOptions = defaultOptions || {};
        canvasToUse = canvasToUse || ctx;

        this.defaultFillStyle = defaultOptions.fillStyle || 'white';
        this.defaultStrokeStyle = defaultOptions.strokeStyle || 'black';
        this.defaultLineWidth = defaultOptions.line || 3;
    }

    CanvasModule.prototype.drawRect = function canvasModuleDrawRect(rect, drawOptions) {
        drawOptions = drawOptions || {};

        ctx.fillStyle = drawOptions.fillStyle || this.defaultFillStyle;
        ctx.lineWidth = drawOptions.lineWidth || this.defaultLineWidth;
        ctx.strokeStyle = drawOptions.strokeStyle || this.defaultStrokeStyle;

        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        ctx.fill();
        ctx.stroke();
    }

    CanvasModule.prototype.drawCircle = function canvasModuleDrawCircle(circle, drawOptions) {
        drawOptions = drawOptions || {};

        ctx.fillStyle = drawOptions.fillStyle || this.defaultFillStyle;
        ctx.lineWidth = drawOptions.lineWidth || this.defaultLineWidth;
        ctx.strokeStyle = drawOptions.strokeStyle || this.defaultStroke;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    CanvasModule.prototype.drawLine = function canvasModuleDrawLine(line, drawOptions) {
        drawOptions = drawOptions || {};

        ctx.fillStyle = drawOptions.fillStyle || this.defaultFillStyle;
        ctx.lineWidth = drawOptions.lineWidth || this.defaultLineWidth;
        ctx.strokeStyle = drawOptions.strokeStyle || this.defaultStroke;

        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
        ctx.fill();
    }

    return CanvasModule;
})();

var Rectangle = (function () {
    function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rectangle;
})();

var Circle = (function () {
    function Circle(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    return Circle;
})();

var Line = (function () {
    function Line(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    return Line;
})();

var DrawOptions = (function () {
    function DrawOptions(fillStyle, strokeStyle, lineWidth) {
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }
    return DrawOptions;
})();

var canvModule = new CanvasModule();
var drawOptions = new DrawOptions('red', 'green', 5);
canvModule.drawRect(new Rectangle(5, 5, 55, 25), drawOptions);

drawOptions.fillStyle = 'green';
drawOptions.strokeStyle = 'red';
drawOptions.lineWidth = 1;
canvModule.drawCircle(new Circle(85, 17, 15), drawOptions);

drawOptions.strokeStyle = 'blue';
drawOptions.lineWidth = 2;
canvModule.drawLine(new Line(5, 50, 100, 50), drawOptions);