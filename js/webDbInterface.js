onError = function(tx, e) {
    alert("There has been an error: " + e.message);
}

function setUpDatabase() {
    var db = openDatabase('WordBank', '1.0', 'Database for the WordBank app', 5 * 1024 * 1024);
    db.transaction(function(tx) { 
	    tx.executeSql('CREATE TABLE IF NOT EXISTS ' + 
			  'category(id INTEGER PRIMARY KEY ASC, name TEXT NOT NULL, description TEXT)', 
			  [], null, onError);
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
	    if(description === undefined) {
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
    if(groupid === undefined)
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

function removeWord(wordid) {
    db = wordbank;
    db.transaction(function(tx) {
	    tx.executeSql('DELETE FROM wordsincategory WHERE wordid=?',
			  [wordid], null, onError);
	    tx.executeSql('DELETE FROM word WHERE id=?', [wordid], null, onError);
	});
}

function removeGroup(groupid) {
    db = wordbank;
    db.transaction(function(tx) {
	    tx.executeSql('DELETE FROM wordsincategory WHERE categoryid=?',
			  [groupid], null, onError);
	    tx.executeSql('DELETE FROM category WHERE id=?',
			  [groupid], null, onError);
	});
}

var wordbank = setUpDatabase();


			      