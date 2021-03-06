
// export function modalHandler() {
//     // Get the modal
// var modal = document.getElementById("aboutModal");

// // Get the button that opens the modal
// var btn = document.getElementById("openModal");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("closeAboutModal")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
// }

export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
      // open connection to the database 'shop-shop' with the version of 1
      const request = window.indexedDB.open('pen-name',1);
      // create variables to hold refrence to db, and transaction (tx), and object store
      let db,tx,store;
      //if version changed (or if this is the first time using the db), run to create three object stores
      request.onupgradeneeded = function(e) {
        const db = request.result;
        // create object store for each type of data and set "primary" key index to be the `_id` of the data
        db.createObjectStore('user', {keyPath: '_id'});
        db.createObjectStore('posts', {keyPath:'_id'});
        
      };
  
      //handle errors
      request.onerror = function(e) {
        console.log('there was an error');
      };
  
      //on db open success
      request.onsuccess = function(e) {
        // save a ref of db to variable
        db = request.result;
        //open a transaction do whatever we pass into storename (must match one of the object store names) and permissions
        tx = db.transaction(storeName, 'readwrite');
        // save ref to that object store
        store=tx.objectStore(storeName);
  
        //if any errors
        db.onerror = function(e) {
          console.log('error', e);
        };
        //switch statement for method to perform
        switch (method) {
          case 'put' :
            store.put(object);
            resolve(object);
            break;
          case 'get' :
            const all = store.getAll();
            all.onsuccess = function() {
              resolve(all.result);
            };
            break;
          case 'delete':
            store.delete(object._id);
            break;
          default:
            console.log('No valid method');
            break;
        }
        // when transaction is complete close connection
        tx.oncomplete = function() {
          db.close();
        };
      };
  
    });
  }