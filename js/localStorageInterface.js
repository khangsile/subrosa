function addWordToBank(word, group, definition) {
    if(group === undefined)
	group = 'GENERAL';
    var groupName = 'subrosa.groups.' + group;
    localStorage.setItem(groupName, 
			 localStorage.getItem(groupName) + word + ' ');
    var wordName = 'subrosa.word.' + word;
    localStorage.setItem(wordName, definition);
}

function addGroupToBank(group) {
    localStorage.setItem('subrosa.groups',
			 localStorage.getItem('subrosa.groups') + group + ' ');
    localStorage.setItem('subrosa.groups.' + group, '');
}

function getWordsByGroupFromBank(group) {
    var groupId = 'subrosa.groups.' + group;
    var words = localStorage.getItem(groupId);
    return words.replace(/^\s+|\s+$/g,'').split(' ');
}

function getGroupsInBank() {
    var groups = localStorage.getItem('subrosa.groups');
    return groups.replace(/^\s+|\s+$/g,'').split(' ');
}

function getWordDefinition(word) {
    return localStorage.getItem('subrosa.word.' + word);
}

//localStorage.removeItem('subrosa.groups.myGroup');
localStorage.removeItem('subrosa.groups');
localStorage.setItem('subrosa.groups', '');