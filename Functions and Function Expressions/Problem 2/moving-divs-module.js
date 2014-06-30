var movingShapes = (function () {
    var allMovingShapes = [];

    var div = document.createElement('div');
    div.style.border = '3px solid #000000';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.className = 'moving-div';
    div.classList.add


    return {
        add: function addShape(shapeType) {
            shapeType = shapeType.toLowerCase();
            var currDiv = getRandomDiv();

            if (shapeType === 'rect') {
                currDiv.style.left = '400px';
                currDiv.style.top = '100px';
                currDiv.classList.add('rect-div');
            } else if (shapeType === 'ellipse') {
                currDiv.style.borderRadius = '100%';
                currDiv.style.left = '100px';
                currDiv.style.top = '100px';
                currDiv.classList.add('ellipse-div');
            }

            allMovingShapes.push(currDiv);
            document.body.appendChild(currDiv);
        }
    };

    function getRandomPositiveNumBetween(min, max, decimalDigits) {
        if (arguments.length === 1) {
            max = arguments[0];
            decimalDigits = 16;
            min = 0;
        } else if (arguments.length === 2) {
            decimalDigits = arguments[1];
            max = arguments[0];
            min = 0;
        }

        if (max < min) {
            throw new Error('min cannot be bigger than max');
        }

        var result = min + Math.random() * (max - min);
        return +result.toFixed(decimalDigits);
    }

    function getRandomColorHex() {
        var digits = '0123456789ABCDEF'.split('');
        var result = '';
        for (var i = 0; i < 6; i++) {
            var ind = getRandomPositiveNumBetween(0, 15, 0);
            result += digits[ind];
        }
        return result;
    }

    function getRandomDiv() {
        var currDiv = div.cloneNode(true);
        currDiv.style.color = '#' + getRandomColorHex();
        currDiv.style.borderColor = '#' + getRandomColorHex();
        currDiv.style.backgroundColor = '#' + getRandomColorHex();
        return currDiv;
    }
})();


document.querySelector('button#add-circle-butt').addEventListener('click', function () {
    movingShapes.add('ellipse');
});
document.querySelector('button#add-rect-butt').addEventListener('click', function () {
    movingShapes.add('rect');
});;

setInterval(moveDivs, 50);
var angle;
var centerX = 100;
var centerY = 100;
var radius = 50;
var step = 5;

function moveDivs() {
    var i;
    var ln;
    var currDiv;
    var currLeftValue;
    var allMovingDivs = document.getElementsByClassName('moving-div');

    for (i = 0, ln = allMovingDivs.length; i < ln; i++) {
        currDiv = allMovingDivs[i];
        currLeftValue = parseFloat(currDiv.style.left);

        if (currDiv.classList.contains('rect-div')) {
            moveRect(currDiv);
        } else if (currDiv.classList.contains('ellipse-div')) {
            moveEllipse(currDiv);
        }
    }

    function moveEllipse(currEllipse) {

        angle = angle | 0;
        angle++;

        if (angle === 360) {
            angle = 0;
        }

        var left = centerX + Math.cos((2 * Math.PI / 180) * (angle)) * radius;
        var right = centerY + Math.sin((2 * Math.PI / 180) * (angle)) * radius;

        currEllipse.style.left = left + 'px';
        currEllipse.style.top = right + 'px';
    }

    function moveRect(currRect) {
        var left = parseFloat(currRect.style.left);
        var top = parseFloat(currRect.style.top);

        if (left < 650 && top == 100) {
            left += step;
        }
        else if (left > 400 && top == 200) {
            left -= step;
        }
        else if (left <= 400 && top > 100) {
            top -= step;
        } else if (left == 650 &&
                   top < 200) {
            top += step;
        }

        currRect.style.left = left + 'px';
        currRect.style.top = top + 'px';
    }
}