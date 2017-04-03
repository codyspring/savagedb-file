const Database = require('./database');
const Collection = require('./collection');
const Document = require('./document');

module.exports = options => (database) => {
  // Once SavageDB tells us to persist a database, create it with the name we get.
  Database.create(database.name, options.location);

  // When SavageDB emits a collection, create it and subscribe to document events.
  database.subject('collection-created').subscribe((name) => {
    let location = `${options.location}/${database.name}`;
    Collection.create(name, location);

    location = `${location}/${name}`;
    database.collections[name].subject('document-inserted').subscribe((doc) => {
      Document.save(doc, location, options.fileType);
    });

    database.collections[name].subject('document-updated').subscribe((doc) => {
      Document.save(doc, location, options.fileType);
    });

    database.collections[name].subject('document-deleted').subscribe((id) => {
      Document.delete(id, location);
    });
  });
};
