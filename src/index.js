module.exports = function check(str, bracketsConfig) {
    let bracketsMap = bracketsConfig.reduce(
        (map, currentItem) => {
            map[currentItem[1]] = currentItem[0];
            return map;
        }
        , {});

    let brackets = str.split('');
    let openBrackets = [];
    while (brackets.length > 0) {
        let bracket = brackets.shift();
        let isOpenBracket = Object.values(bracketsMap).indexOf(bracket) >= 0;
        let isCloseBracket = Object.keys(bracketsMap).indexOf(bracket) >= 0;
        if (isOpenBracket && isCloseBracket) {
            isOpenBracket = openBrackets.indexOf(bracket) < 0;
        }
        if (isOpenBracket) {
            openBrackets.push(bracket);
        } else {
            if (isCloseBracket) {
                let lastOpenBracket = openBrackets.pop();
                if (lastOpenBracket !== bracketsMap[bracket]) {
                    return false;
                    break;
                }
            } else {
                break;
            }
        }
    }
    return brackets.length === 0 && openBrackets.length === 0;
}
