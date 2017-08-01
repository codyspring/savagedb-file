# SavageDB File
Plugin module to persist files locally with SavageDB.

## Usage
```JavaScript
const SavageDB = require('savagedb');
const localPersist = require('savagedb-file');
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
