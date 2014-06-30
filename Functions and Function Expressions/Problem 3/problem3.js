var specialConsole = (function () {
    function specialConsoleWriteLine() {
        var msg = getOutputMessage.apply(null, arguments);
        console.log(msg);
    }

    function specialConsoleWriteError() {
        var msg = getOutputMessage.apply(null, arguments);
        console.error(msg);
    }

    function specialConsoleWriteWarning() {
        var msg = getOutputMessage.apply(null, arguments);
        console.warn(msg);
    }

    function getOutputMessage() {
        var i,
            msg,
            currPlaceholder,
            currPhRegex,
            itemsToInsert,
            placeholderMatches,
            placeholderCount;

        msg = arguments[0];
        itemsToInsert = [];

        for (i = 1; i < arguments.length; i++) {
            itemsToInsert.push(arguments[i]);
        }

        placeholderMatches = msg.match(/{\d+}/g);
        placeholderCount = placeholderMatches ? placeholderMatches.length : 0;

        if (itemsToInsert.length > 0 &&
                placeholderCount !== arguments.length - 1) {
            throw new Error('Placeholder count and input parameters count does not match');
        }

        for (i = 0; i < placeholderCount; i++) {
            if (itemsToInsert[i]) {
                currPhRegex = new RegExp('\\{' + i + '\\}', 'g');
                msg = msg.replace(currPhRegex, itemsToInsert[i].toString());
            }
        }

        return msg;
    }

    return {
        writeLine: specialConsoleWriteLine,
        writeError: specialConsoleWriteError,
        writeWarning: specialConsoleWriteWarning,
    };
})();

specialConsole.writeLine('Message: {0}', 'hello');
specialConsole.writeError('Error: {0}', 'Something happened');
specialConsole.writeError('Warning: {0}', 'A warning');