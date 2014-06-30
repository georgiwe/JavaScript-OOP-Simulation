var domModule = (function () {
    var res,
        buffer = [];

    function domModuleAppendChild(elemToAppend, selector) {
        var appendToElement = document.querySelector(selector);
        appendToElement.appendChild(elemToAppend);
    }

    function domModuleRemoveChild(elemSelector, removalSelector) {
        var removeFromElements,
            i,
            j,
            ln,
            ln2,
            elementsToRemove,
            currElemToRemoveFrom;

        removeFromElements = document.querySelectorAll(elemSelector);

        for (i = 0, ln = removeFromElements.length; i < ln; i++) {
            currElemToRemoveFrom = removeFromElements[i];
            elementsToRemove = currElemToRemoveFrom.querySelectorAll(removalSelector);

            for (j = 0, ln2 = elementsToRemove.length; j < ln2; j++) {
                currElemToRemoveFrom.removeChild(elementsToRemove[j]);
            }
        }
    }

    function domModuleAddHandler(selector, eventType, handler, capture) {
        var elemsToAttachHandlerTo,
            i,
            ln,
            currElem;

        elemsToAttachHandlerTo = document.querySelectorAll(selector);

        for (i = 0, ln = elemsToAttachHandlerTo.length; i < ln; i++) {
            currElem = elemsToAttachHandlerTo[i];
            currElem.addEventListener(eventType, handler, capture);
        }
    }

    function domModuleAppendToBuffer(parentSelector, elemToAppend) {
        var currPair, // meaning a parent/elemToAppend pair
            parent,
            fragment,
            currParent,
            container,
            currContainer,
            i;

        parent = document.querySelector(parentSelector);

        if (!parent) {
            return;
        }

        if (!buffer[parentSelector]) {
            buffer[parentSelector] = [elemToAppend];
        } else {
            buffer[parentSelector].push(elemToAppend);

            if (buffer[parentSelector].length === 100) {
                appendAllElemsFromBufferToDocFragment();
                document.body.appendChild(fragment);
            }
        }

        function appendAllElemsFromBufferToDocFragment() {
            fragment = document.createDocumentFragment();

            for (container in buffer) {
                currContainer = buffer[container];
                for (i = 0; i < currContainer.length; i++) {
                    fragment.appendChild(currContainer[i]);
                }
            }
        }
    }

    function domModuleAppendToBuffer(selector) {
        var selectedElements = document.querySelectorAll(selector);
        return selectedElements;
    }

    return {
        appendChild: domModuleAppendChild,
        removeChild: domModuleRemoveChild,
        addHandler: domModuleAddHandler,
        appendToBuffer: domModuleAppendToBuffer,
        getElements: domModuleAppendToBuffer
    };
})();

document.querySelector('button').addEventListener('click', function () {
    var div = document.createElement('div');
    div.innerText = 'Div to test append child';
    domModule.appendChild(div, '#wrapper');
    domModule.removeChild('ul', 'li:first-child, li:nth-child(3)');
    domModule.addHandler("a.button", 'click', function () {
        alert("Clicked");
    });
    var divForCnt = div.cloneNode(true);
    divForCnt.textContent = 'Div in Content';
    domModule.appendToBuffer("container", divForCnt);
    var divForNav = div.cloneNode(true);
    divForCnt.textContent = 'Div in Main nav ul';
    domModule.appendToBuffer("#main-nav ul", divForNav);
    for (var i = 0; i < 99; i++) {
        domModule.appendToBuffer("#main-nav ul", divForNav.cloneNode(true));
    }
});