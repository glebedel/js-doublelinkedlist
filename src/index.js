/**
 * Node element of our double linked list
 * Contains a left pointer & right pointer as well as data property
 * TODO: have a more consistent API (eg consistent return values & consitent names depending on return values being nodes or data)
 * @classdesc Node
 */
class Node {
  /**
   * Creates an instance of Node.
   * @class Node
   * @constructs Node
   * @param {any} data data stored in the node that can be retrieved through linked list method
   * @param {Object} [pointers={}] pointers object containing reference to left and right nodes
   * @param {Node} [pointers.left=null] left node reference
   * @param {Node} [pointers.left=null] right node reference
   * @memberof Node
   */
  constructor(data, { left = null, right = null } = {}) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

/**
 * DoubleLinkedList class
 * adding node(radd, ladd): O(1)
 * list length retrieval: O(1) - (unless lists' nodes modified outside of class)
 * getting/removing nodes or nodes' data apart from head/tail (getAt, getDataAt, removeAt, find, findData...): O(n)
 * @classdesc DoubleLinkedList
 */
class DoubleLinkedList {
  /**
   * Creates an instance of DoubleLinkedList
   * @class DoubleLinkedList
   * @constructs Node
   * @param {Node|Array<Node>} [head=null] optional reference to head node
   * @param {Object} [param={}] optional parameter object
   * @param {Class} [param.NodeClass=Node] optional Node Class (Node class' constructor needs to be the same as ${link Node~constructor})
   * @memberof DoubleLinkedList
   */
  constructor(head = null, { NodeClass = Node } = {}) {
    this.tail = null;
    this.head = null;
    this.Node = NodeClass;
    // if head is set then list already has 1 element. Otherwise its empty (0) elements
    this.length = 0;
    // sets the head if node was passed
    if (head instanceof this.Node) {
      this.head = head;
      this.tail = head;
      this.length += 1;
      // if an iteratable object was passed for head then consider each array element as new data to be added (in order) to the list
    } else if (head && typeof head[Symbol.iterator] === 'function') {
      this.add(...head);
      // if any head is set to any other value, then consider it as data to be added in list
    } else if (head) {
      this.add(head);
    }
  }
  /**
   * Sets passed data(s) into a new node and adds node to the right of the list
   * alias to {link DoubleLinkedList~radd}
   * @param {any} data(s) to be stored into the new node
   * @returns {Node}
   * @memberof DoubleLinkedList
   */
  add(...datas) {
    return this.radd(...datas);
  }
  /**
   * pop last member in the list
   * alias to {link DoubleLinkedList~rpop}
   * @returns {Node} poped node
   * @memberof DoubleLinkedList
   */
  pop() {
    return this.rpop();
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
   * @param {...any} optional further datas to add. ladd will be called for each further data passed.
   * @returns {Node} new head (most left member) of the list
   * @memberof DoubleLinkedList
   */
  ladd(data, ...otherDatas) {
    const currentHead = this.head;
    // move current head to right of new node
    this.head = new this.Node(data, { right: currentHead });
    // previous head left reference must be new head node
    if (currentHead) {
      currentHead.left = this.head;
    } else {
      // also set tail to new node if list was previously empty
      this.tail = this.head;
    }
    this.length += 1;
    // if multiple datas were passed as argument, radd the rest of the datas
    if (otherDatas.length) {
      this.ladd(...otherDatas);
    }
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
   * Add data to the right of the list
   * Passed data is added into a new node which becomes the tail of the list
   * @param {any} data
   * @param {...any} optional further datas to add. radd will be called for each further data passed.
   * @returns {Node} new tail (most right) node of the list
   * @memberof DoubleLinkedList
   */
  radd(data, ...otherDatas) {
    const currentTail = this.tail;
    this.tail = new this.Node(data, { left: currentTail });
    // previous tail right reference must be new head node
    if (currentTail) {
      currentTail.right = this.tail;
    } else {
      // also set head to new node (tail) if list was previously empty
      this.head = this.tail;
    }
    // increase length counter since node was added to list
    this.length += 1;
    // if multiple datas were passed as argument, ladd the rest of the datas
    if (otherDatas.length) {
      this.radd(...otherDatas);
    }
    return this.tail;
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
   * Remove first member (head) of the list
   * alias to {link DoubleLinkedList~lpop}
   * @returns {Node} removed node
   * @memberof DoubleLinkedList
   */
  removeFirst() {
    return this.lpop();
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
    if (node instanceof this.Node) {
      // reassign head member property if node being removed is the head
      if (node === this.head) {
        this.head = node.right;
      }
      // reassign tail member property if node being removed is the tail
      if (node === this.tail) {
        this.tail = node.left;
      }
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
  find(comparator) {
    return this.lfind(comparator);
  }
  lfind(comparator) {
    return [...this.literator()].find(comparator);
  }
  rfind(comparator) {
    return [...this.riterator()].find(comparator);
  }
  findData(comparator) {
    return this.lfindData(comparator);
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
   * Check if list contains a specific node
   * @param {any} data
   * @returns {Boolean} true or false
   * @memberof DoubleLinkedList
   */
  hasNode(node) {
    // retrieves an array of all Nodes' data presents in the list
    return [...this.literator()].includes(node);
  }
  /**
   * Check if list contains specific data
   * @param {any} data
   * @returns {Boolean} true or false
   * @memberof DoubleLinkedList
   */
  has(data) {
    // retrieves an array of all Nodes' data presents in the list
    return [...this.literator()].some(node => node.data === data);
  }
  /**
   * Empties the list (resets the `head` & `tail` to `null` and `length` to `0`)
   * @memberof DoubleLinkedList
   */
  empty() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  /**
   * recalculate the length of the linked list and re-set the tail (loops from the left to do this therefore)
   * this normaly isn't necessary unless list's nodes left/right pointers were modified without using the DoubleLinkedList available methods
   * @returns {Number} difference between old length and recalculated length (negative number means new length > old length)
   * @memberof DoubleLinkedList
   */
  reset() {
    const oldLength = this.length;
    const nodes = [...this.literator()];
    this.tail = nodes[nodes.length - 1] || null;
    this.length = nodes.length;
    return this.length - oldLength;
  }
  /**
   * swap nodes' data at indices indexa & indexb
   * @param {number} indexa
   * @param {number} indexb
   * @memberof DoubleLinkedList
   */
  swapDataAt(indexa, indexb) {
    const nodea = this.getAt(indexa);
    const nodeb = this.getAt(indexb);
    this.constructor.swapData(nodea, nodeb);
  }
  /**
   * swap nodes at indices indexa & indexb
   * @param {number} indexa
   * @param {number} indexb
   * @memberof DoubleLinkedList
   */
  swapAt(indexa, indexb) {
    const nodea = this.getAt(indexa);
    const nodeb = this.getAt(indexb);
    this.swap(nodea, nodeb);
  }
  /**
   * Swap two nodes' data within the list
   * assigns each nodes' data property to the other one's
   * @static
   * @param {Node} a node to swap
   * @param {Node} b node to swap
   * @memberof DoubleLinkedList
   */
  swapData(a, b) {
    return this.constructor.swapData(a, b);
  }
  /**
   * Swap two nodes' data
   * assigns each nodes' data property to the other one's
   * @static
   * @param {Node} a node to swap
   * @param {Node} b node to swap
   * @memberof DoubleLinkedList
   */
  static swapData(a, b) {
    if (this.isNode(a) && this.isNode(b)) {
      const tempData = a.data;
      a.data = b.data;
      b.data = tempData;
    }
  }
  /**
   * Swap two nodes' within the list
   * basically swaps their respective left & right reference
   * @static
   * @param {Node} a node to swap
   * @param {Node} b node to swap
   * @memberof DoubleLinkedList
   */
  swap(a, b) {
    this.constructor.swapNodes(a, b);
    if (a instanceof this.Node && b instanceof this.Node) {
      // if one of the node is the tail then the other one becomes the tail
      if (a === this.tail) {
        this.tail = b;
      } else if (b === this.tail) {
        this.tail = a;
      }
      // if one of the node is the head then the other becomes the head
      if (a === this.head) {
        this.head = b;
      } else if (b === this.head) {
        this.head = a;
      }
    }
  }
  /**
   * Swap two nodes
   * basically swaps their respective left & right reference
   * @param {Node} a node to swap
   * @param {Node} b node to swap
   * @static
   * @memberof DoubleLinkedList
   */
  static swapNodes(a, b) {
    if (this.isNode(a) && this.isNode(b) && a !== b) {
      // keep temp variables of nodea left/right references
      const lefta = a.left;
      const righta = a.right;
      // set nodea right/left refereces to nodeb's (unless we have circular reference meaning nodes are beside each other)
      a.left = b.left === a ? b : b.left;
      a.right = b.right === a ? b : b.right;
      // set nodeb right/left references to nodea's temp vars (unless we have circular reference meaning nodes are beside each other)
      b.left = lefta === b ? a : lefta;
      b.right = righta === b ? a : righta;
      // make sure right/left references of swaped nodes also have their own references to the swap nodes updated
      if (this.isNode(b.right)) {
        b.right.left = b;
      }
      if (this.isNode(b.left)) {
        b.left.right = b;
      }
      if (this.isNode(a.right)) {
        a.right.left = a;
      }
      if (this.isNode(a.left)) {
        a.left.right = a;
      }
    }
  }
  /**
   * Returns whether or not the passed object can be considered a Node (has a right and left property)
   * @static
   * @param {Object} obj Node object to be checked
   * @returns {Boolean} true or false
   * @memberof DoubleLinkedList
   */
  static isNode(obj) {
    return (
      obj &&
      typeof obj === 'object' &&
      typeof obj.left !== 'undefined' &&
      typeof obj.right !== 'undefined'
    );
  }
  /**
   * Returns the default Node class used when adding new data into the list
   * @static
   * @returns {Node} default node class
   * @memberof DoubleLinkedList
   */
  static getDefaultNodeClass() {
    return Node;
  }
  /**
   * Gets the Node class used in this DoubleLinkedList instance (defaulted to ${link Node~constructor} in the constructor)
   * @returns {Class} node class used in this instance
   * @memberof DoubleLinkedList
   */
  getNodeClass() {
    return this.Node;
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
