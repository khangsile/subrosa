var wordbank = setUpDatabase();

onError = function(tx, e) {
    alert("There has been an error: " + e.message);
}

/*
function addGroup(group, description, callback)
function addWord(word, definition, groupid) 
function getGroups(callback)
function getWordsByGroup(groupid, callback)
function removeWord(wordid, callback) 
function removeGroup(groupid, callback) 
function setGroupOfWord(wordid, oldgroupid, newgroupid, callback) 
function setNoteOfWord(wordid, note, callback) 
function setNameOfGroup(groupid, name, callback)
 */
var generalWords = 'GENERAL_WORDS';
var tableInitialized = 'subrosa.webdb.tableinit';

function setUpDatabase() {
    var db = openDatabase('WordBank', '1.0', 'Database for the WordBank app', 5 * 1024 * 1024);
    db.transaction(function(tx) { 
	    tx.executeSql('CREATE TABLE IF NOT EXISTS ' + 
			  'category(id INTEGER PRIMARY KEY ASC, name TEXT NOT NULL, description TEXT)', 
			  [], function(tx, results) {
			      if(localStorage.getItem(tableInitialized) != null) {
				  addGroup(generalWords, null, null);
				  localStorage.setItem(tableInitialized, 'true');
			      }
			  }, onError);
	});
    db.transaction(function(tx) {
	    tx.executeSql('CREATE TABLE IF NOT EXISTS ' +
			  'word(id INTEGER PRIMARY KEY ASC, name TEXT NOT NULL, ' +
			  'definition TEXT NOT NULL, note TEXT)', [], null, onError);
	});
    db.transaction(function(tx) {
	    tx.executeSql('CREATE TABLE IF NOT EXISTS ' +
			  'wordsincategory(wordid INTEGER NOT NULL, ' + 
			  'categoryid INTEGER NOT NULL, ' +
			  'FOREIGN KEY (wordid) REFERENCES word (id), ' +
			  'FOREIGN KEY (categoryid) REFERENCES category (id))',
			  [], null, onError);
	});
    return db;
}

function addGroup(group, description, callback) {
    db = wordbank;
    db.transaction(function(tx) {
	    if(description === null) {
		tx.executeSql('INSERT INTO category (name) VALUES (?)', [group], 
			      callback, onError);
	    } else {
		tx.executeSql('INSERT INTO category (name, description) VALUES (?,?)', 
			      [group, description], callback, onError);
	    }
	});
}

function addWord(word, definition, groupid) {
    db = wordbank;
    if(groupid === null)
	groupid = 'GENERAL';
    db.transaction(function(tx) {
	    tx.executeSql('INSERT INTO word (name, definition) VALUES (?,?)',
			  [word, definition], 
			  function(tx, results) {
			      tx.executeSql('INSERT INTO wordsincategory (wordid, categoryid) ' +
					    'VALUES (?,?) ', [results.insertId, groupid], null,
					    onError)},
			  onError);
	});    
}

function getGroups(callback) {
    db = wordbank;
    db.transaction(function(tx) {
	    tx.executeSql('SELECT * FROM category', [], callback, onError);
	});
}

function getWordsByGroup(groupid, callback) {
    db = wordbank;
    db.transaction(function(tx) {
	    tx.executeSql('SELECT wordid, categoryid, word.name, word.definition, word.note ' + 
			  'FROM category, word, wordsincategory ' +
			  'WHERE category.id = wordsincategory.categoryid AND ' +
			  'word.id = wordsincategory.wordid AND ' +
			  'category.id = ?', [groupid], callback, onError);
	});
}

function removeWord(wordid, callback) {
    db = wordbank;
    db.transaction(function(tx) {
	    tx.executeSql('DELETE FROM wordsincategory WHERE wordid=?',
			  [wordid], null, onError);
	    tx.executeSql('DELETE FROM word WHERE id=?', [wordid], callback, onError);
	});
}

function removeGroup(groupid, callback) {
    db = wordbank;
    db.transaction(function(tx) {
	    tx.executeSql('DELETE FROM wordsincategory WHERE categoryid=?',
			  [groupid], null, onError);
	    tx.executeSql('DELETE FROM category WHERE id=?',
			  [groupid], callback, onError);
	});
}

function setGroupOfWord(wordid, oldgroupid, newgroupid, callback) {
    db = wordbank;
    db.transaction(function(tx) {
	    tx.executeSql('UPDATE wordsincategory SET categoryid=? ' +
			  'WHERE wordid=? AND categoryid=?',
			  [newgroupid, wordid, oldgroupid], callback, onError);
	});
}

function setNoteOfWord(wordid, note, callback) {
    db = wordbank;
    db.transaction(function(tx) {
	    tx.executeSql('UPDATE word SET note=? ' +
			  'WHERE id=?', [note, wordid], callback, onError);
	});
}

function setNameOfGroup(groupid, name, callback) {
    db = wordbank;
    db.transaction(function(tx) {
	    tx.executeSql('UPDATE category SET name=? ' +
			  'WHERE id=?', [name, groupid], callback, onError);
	});
}

renderGroups = function(tx, results) {
    var txt = '';
    for(var i=0; i<results.rows.length; i++) {
	var row = results.rows.item(i);
	txt += '<li >' + 
	    '<div class=group><h1 id=g' + row.id + '>' + 
	    row.name +
	    '</h1></div><ul class=wordlist id=l' + row.id + '></ul></li>';
    }
    $('#grouplist').append(txt);
    for(var i=0; i<results.rows.length; i++) {
	getWordsByGroup(results.rows.item(i).id, renderWordsOfGroup);
    }
    $(".group").click(function() {
        $(this).next(".wordlist").slideToggle(100);
    });
}

renderGroup = function(tx1, results1) {
    var db = wordbank;
    db.transaction(function(tx2) {
	    tx2.executeSql('SELECT * FROM category WHERE id=?', [results1.insertId], function(tx3, results2) {
		    var txt = '';
		    var row = results2.rows.item(0);
		    txt += '<li>' + 
			'<div class=group><h1 id=g' + row.id + '>' + 
			row.name +
			'</h1></div><ul class=wordlist id=l' + row.id + '></ul></li>';
		    $('#grouplist').append(txt);
		}, onError);
	});
}
    

renderWordsOfGroup = function(tx, results) {
    var txt = '';
    var groupid = null;
    for(var i=0; i<results.rows.length; i++) {
	var row = results.rows.item(i);
	groupid = row.categoryid;
	var dl = '<dl>' +
	    '<dt>' + row.name + '</dt>' +
	    '<dd>' + row.definition + '</dd>';
	txt += '<li class = word id=w' + row.wordid + '>' + dl +
	    '</li>';
    }
    if(groupid != null)
	document.getElementById('l'+groupid).innerHTML = txt;
}
