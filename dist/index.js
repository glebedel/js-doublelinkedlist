'use strict';

/**
 * Node element of our double linked list
 * Contains a left pointer & right pointer as well as data property
 * @class Node
 */
class Node {
  /**
   * Creates an instance of Node.
   * @param {any} data data stored in the node that can be retrieved through linked list method
   * @param {Object} pointers object containing reference to left and right nodes
   * @param {Node} [pointers.left=null] left node reference
   * @param {Node} [pointers.left=null] right node reference
   * @memberof Node
   */
  constructor(data, { left = null, right = null }) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

/**
 * DoubleLinkedList class
 *
 * @class DoubleLinkedList
 */
class DoubleLinkedList {
  /**
   * Creates an instance of DoubleLinkedList
   * @param {Node} [head=null] optional reference to head node
   * @memberof DoubleLinkedList
   */
  constructor(head = null) {
    this.head = head;
    this.tail = null;
    // if head is set then list already has 1 element. Otherwise its empty (0) elements
    this.length = head === null ? 0 : 1;
  }
  /**
   * Gets the head of the list
   * @returns {Node} head (most left node) of the list
   * @memberof DoubleLinkedList
   */
  first() {
    return this.head;
  }
  /**
   * Gets the tail of the list
   * @returns {Node} tail (most right node) of the list
   * @memberof DoubleLinkedList
   */
  last() {
    return this.tail;
  }
  /**
   * Add data to the left of the list
   * Passed data is added into a new node which becomes the head of the list
   * @param {any} data
   * @returns {Node} new head (most left member) of the list
   * @memberof DoubleLinkedList
   */
  ladd(data) {
    const currentHead = this.head;
    // move current head to right of new node
    this.head = new Node(data, { right: currentHead });
    // previous head left reference must be new head node
    if (currentHead) {
      currentHead.left = this.head;
    } else {
      // also set tail to new node if list was previously empty
      this.tail = this.head;
    }
    this.length += 1;
    return this.head;
  }
  /**
   * pops head (most left member) of the list
   * The list's 2nd element (if exists) becomes the new head of the list since returned most left node is removed from list
   * @returns {Node} poped node
   * @memberof DoubleLinkedList
   */
  lpop() {
    const currentHead = this.head;
    if (currentHead) {
      // set head to the 2nd list element effectively discarding current head node
      this.head = currentHead.right;
      // decrease length counter since we removed an element
      this.length -= 1;
    }
    return currentHead;
  }
  /**
   * Remove first member (head) of the list
   * alias to {link DoubleLinkedList~lpop}
   * @returns {Node} removed node
   * @memberof DoubleLinkedList
   */
  removeFirst() {
    return this.lpop();
  }
  /**
   * Add data to the right of the list
   * Passed data is added into a new node which becomes the tail of the list
   * @param {any} data
   * @returns {Node} new tail (most right) node of the list
   * @memberof DoubleLinkedList
   */
  radd(data) {
    const currentTail = this.tail;
    this.tail = new Node(data, { left: currentTail });
    // previous tail right reference must be new head node
    if (currentTail) {
      currentTail.right = this.tail;
    } else {
      // also set head to new node (tail) if list was previously empty
      this.head = this.tail;
    }
    // increase length counter since node was added to list
    this.length += 1;
    return this.tail;
  }
  /**
   * Sets passed data into a new node and adds node to the right of the list
   * alias to {link DoubleLinkedList~radd}
   * @param {any} data to be stored into the new node
   * @returns {Node}
   * @memberof DoubleLinkedList
   */
  add(data) {
    return this.radd(data);
  }
  /**
   * pops head (most right member) of the list
   * The list's next to last node (if exists) becomes the new tail of the list since returned most right node is removed from list
   * @returns {Node} poped tail node
   * @memberof DoubleLinkedList
   */
  rpop() {
    const currentTail = this.tail;
    if (currentTail) {
      // reassign tail to before last node
      this.tail = currentTail.left;
      // decrease length counter since a node was removed from list
      this.length -= 1;
    }
    return currentTail;
  }
  /**
   * Remove last member (tail) of the list
   * alias to {link DoubleLinkedList~rpop}
   * @returns {Node} removed node
   * @memberof DoubleLinkedList
   */
  removeLast() {
    return this.rpop();
  }
  /**
   * Retrieves the Node placed at specified index in the List
   * Considering the list as an array with the head as the first element and tail its last, index `0` would return the head and index `length - 1` would return the tail node
   * @param {any} index index within the list at which node should be retrieved
   * @returns {Node} node located at specified index. null if index is invalid
   * @memberof DoubleLinkedList
   */
  getAt(index) {
    // return null if index is invalid (not a number or out of bounds)
    if (typeof index !== 'number' || index < 0 || index >= this.length) {
      return null;
    }
    let node = this.head;
    // loop through list until we reached index
    for (let i = 0; i < index && node; i += 1) {
      node = node.right;
    }
    return node;
  }
  /**
   * Retrieves the data of the node placed at specified index in the List
   * see {link DoubleLinkedList~getAt} for retrieval of the node itself and not just its data
   * @param {any} index index within the list at which node data should be retrieved
   * @returns  {any} data stored in the node placed at specified index
   * @memberof DoubleLinkedList
   */
  getDataAt(index) {
    const node = this.getAt(index);
    return node && node.data;
  }
  /**
   * Removes any node in the list that contains the specified data
   * Only removes in case of strict equality with specified data. See {link DoubleLinkedList~filterData}
   * @param {any} data
   * @returns {Array<Node>} array of the nodes removed from the list because their data matched method's data parameter
   * @memberof DoubleLinkedList
   */
  removeData(data) {
    // retrieves nodes that strictly match passed data
    const matchingNodes = this.filterData(data);
    // loop through returned result and remove each nodes
    matchingNodes.forEach(this.remove);
    return matchingNodes;
  }
  /**
   * Remove specified node within the list (if that node is indeed in the list)
   * @param {Node} node node to remove
   * @memberof DoubleLinkedList
   */
  remove(node) {
    // don't do anything if passed parameter is not an instance of Node
    if (!(Node instanceof Node)) {
      // check if node to remove got a left reference
      if (node.left) {
        // link its left node to its right
        node.left.right = node.right;
      }
      // check if node to remove got a right reference
      if (node.right) {
        // link its right node to its left
        node.right.left = node.left;
      }
      // now that node is removed from list, decrease length counter
      this.length -= 1;
    }
  }
  /**
   * Remove the node at specified index in the list
   *
   * @param {Number} index of the node to remove
   * @memberof DoubleLinkedList
   */
  removeAt(index) {
    const node = this.getAt(index);
    this.remove(node);
  }
  /**
   * execute fn callback on each node
   * (same behaviour as Array.prototype.forEach)
   * @param {function} fn function that will be called for each node in the list
   * @memberof DoubleLinkedList
   */
  forEach(fn) {
    [...this.literator()].forEach(fn);
  }
  map(fn) {
    return [...this.literator()].map(fn);
  }
  lfind(comparator) {
    return [...this.literator()].find(comparator);
  }
  rfind(comparator) {
    return [...this.riterator()].find(comparator);
  }
  lfindData(data) {
    return [...this.literator()].find(node => node.data === data);
  }
  rfindData(data) {
    return [...this.riterator()].find(node => node.data === data);
  }
  filter(comparator) {
    return [...this.literator()].filter(comparator);
  }
  filterData(data) {
    return [...this.literator()].filter(node => node.data === data);
  }
  /**
   * Check if list contains specific data
   *
   * @param {any} data
   * @returns {Boolean} whether or not list has a node that contains specified data
   * @memberof DoubleLinkedList
   */
  has(data) {
    // retrieves an array of all Nodes' data presents in the list
    const values = this.map(node => node.data);
    return values.includes(data);
  }
  /**
   * swap nodes at indices indexa & indexb
   *
   * @param {number} indexa
   * @param {number} indexb
   * @memberof DoubleLinkedList
   */
  swapAt(indexa, indexb) {
    const nodea = this.getAt(indexa);
    const nodeb = this.getAt(indexb);
    this.constructor.swap(nodea, nodeb);
  }
  /**
   * see {DoubleLinkedList.swap}
   *
   * @param {any} a
   * @param {any} b
   * @memberof DoubleLinkedList
   */
  swap(a, b) {
    this.constructor.swap(a, b);
  }
  /**
   * recalculate the length of the linked list
   * this normaly isn't necessary unless list's nodes left/right pointers were modified without using the DoubleLinkedList available methods
   * @returns {Number} difference between old length and recalculated length (negative number means new length > old length)
   * @memberof DoubleLinkedList
   */
  resetLength() {
    const oldLength = this.length;
    this.length = [...this.literator()].length;
    return this.length - oldLength;
  }
  /**
   * Swap two nodes within the list
   * basically swaps their respective left & right reference
   * @static
   * @param {Node} nodea node to swap
   * @param {Node} nodeb node to swap
   * @memberof DoubleLinkedList
   */
  static swap(nodea, nodeb) {
    if (nodea && nodeb) {
      const lefta = nodea.left;
      const righta = nodea.right;
      nodea.left = nodeb.left;
      nodea.right = nodeb.right;
      nodeb.left = lefta;
      nodeb.right = righta;
    }
  }
}

DoubleLinkedList.prototype[Symbol.iterator] = function iterator() {
  return this.literator();
};

DoubleLinkedList.prototype.literator = function* literator() {
  let node = this.head;
  while (node) {
    yield node;
    node = node.right;
  }
};
DoubleLinkedList.prototype.riterator = function* riterator() {
  let node = this.tail;
  while (node) {
    yield node;
    node = node.left;
  }
};

module.exports = DoubleLinkedList;