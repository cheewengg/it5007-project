
// unpack imported csv data into array (date, price, and volume)
var ops = [];

db.historical.find({ "px_last": { "$type": 2} }).forEach(doc => {
  var px_last = doc.px_last.split(', ').map( e => e.replace(/"|\[|\]|\\/gm,''));
  var px_volume = doc.px_volume.split(', ').map( e => e.replace(/"|\[|\]|\\/gm,''));
  var date = doc.date.split(', ');

  ops.push({
    "updateOne": {
      "filter": { "_id": doc._id },
      "update": { 
        "$set": { 
          "px_last": px_last,
          "px_volume": px_volume,
          "date": date,
        }
      }
    }
  });

  if ( ops.length >= 1000 ) {
    db.historical.bulkWrite(ops);
    ops = [];
  }             
});

if ( ops.length > 0 ) {
  db.historical.bulkWrite(ops);
  ops = [];
}
