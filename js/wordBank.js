function addWord(word, group) {
    addWordToBank(word, group);
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