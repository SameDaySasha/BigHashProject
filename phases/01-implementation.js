class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
   this.count = 0
   this.capacity = numBuckets
   this.data = new Array(this.capacity).fill(null);
   this.cache = {}

  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    if (this.count / this.capacity >= 0.7) {
      this.resize();
    }


    let hashModKey = this.hashMod(key)
    let newNode = new KeyValuePair(key, value)
    let currentNode = this.data[hashModKey]
   if(this.data[hashModKey] === null){
    this.data[hashModKey] = newNode
    this.count++;
   } else { //we can get rid of this whole if statement.
     while(currentNode){
      if(currentNode.key === key){
        // this.cache[key] = value
        currentNode.value = value

        return currentNode
      }
      currentNode = currentNode.next
     }
     newNode.next = this.data[hashModKey]
     this.data[hashModKey] = newNode
     this.count++
   }



  }

  read(key) {
  let hashModKey = this.hashMod(key)
  let currentNode = this.data[hashModKey]
    while(currentNode){
      if(currentNode.key === key){
        return currentNode.value
      } currentNode = currentNode.next
    }
   return undefined
  }


  resize() {
    //change the capacity
    this.count = 0;
    this.capacity *= 2;
    //store our values
    let oldData = this.data.slice();
    //new instance of data
    this.data = new Array(this.capacity).fill(null);
    //add values into new data
    //iterate over buckets
    for (let i = 0; i < oldData.length; i++){
      //if a bucket has something...
      let position = oldData[i];
      //traverse over linked list
      while (position) {
        //insert nodes in new Data
        this.insert(position.key, position.value);
        position = position.next;

      }

    }



  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
