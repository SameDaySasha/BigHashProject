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
    // Your code here
  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
