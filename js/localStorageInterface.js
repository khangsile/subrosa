function addWordToBank(word, group, definition) {
    localStorage = window.localStorage;
    if(group === undefined)
	group = 'GENERAL';
    var groupName = 'subrosa.groups.' + group;
    localStorage.setItem(groupName, 
			 localStorage.getItem(groupName) + word + ' ');
    var wordName = 'subrosa.word.' + word;
    localStorage.setItem(wordName, definition);
}

function addGroupToBank(group) {
    localStorage = window.localStorage;
    localStorage.setItem('subrosa.groups',
			 localStorage.getItem('subrosa.groups') + group + ' ');
}

function getWordsByGroupFromBank(group) {
    localStorage = window.localStorage;
    var words = localStorage.getItem('subrosa.groups.' + group);
    return words.split(' ');
}

function getGroupsInBank() {
    localStorage = window.localStorage;
    var groups = localStorage.getItem('subrosa.groups');
    return groups.split(' ');
}

function getWordDefinition(word) {
    localStorage = window.localStorage;
    return localStorage.getItem('subrosa.word.' + word);
}