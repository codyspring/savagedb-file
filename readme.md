# SavageDB Local File Persistence
[![Build Status](https://travis-ci.org/playsavage/savagedb-persist-file-local.svg?branch=master)](https://travis-ci.org/playsavage/savagedb-persist-file-local)
[![Coverage Status](https://coveralls.io/repos/github/playsavage/savagedb-persist-file-local/badge.svg?branch=master)](https://coveralls.io/github/playsavage/savagedb-persist-file-local?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/playsavage/projects/5a453489-4846-4926-b50f-df15021fabc3/badge)](https://nodesecurity.io/orgs/playsavage/projects/5a453489-4846-4926-b50f-df15021fabc3)

Plugin module to persist files locally with SavageDB.

## Usage
```JavaScript
const SavageDB = require('@playsavage/savagedb');
const localPersist = require('@playsavage/savagedb-persist-file-local');
const db = SavageDB('myDb', {
  persist: localPersist({
    location: './data',
    fileType: 'json'
  })
});
```

## In-Depth
- ``location`` is the path to a directory on this machine.
- ``fileType`` is the desired filetype for documents. json and yaml are supported.

Otherwise, it works as expected to persist files in the background. Persistence is asynchronous and
runs off of events fired by SavageDB.

## NOTES
Currently, errors are not thrown if something goes wrong with some save/delete. This is intentional
as persisting the SavageDB database is a background task and never interacts directly with the
primary operations of the database. As an example: ``collection.insert(data)`` never assumes
anything to be in the way of it's in-memory processing; therefore it isn't a promise.

## License
MIT
