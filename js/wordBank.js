function addWord(word, group, definition) {
    addWordToBank(word, group, definition);
}

function addGroup(group) {
    addGroupToBank(group);
}

function getWordsByGroup(group) {
    return getWordsByGroupFromBank(group);
}

function getGroups() {
    return getGroupsInBank();
}

function getDefinition(word) {
    return getWordDefinition(word);
}