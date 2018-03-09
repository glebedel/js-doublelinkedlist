import DoubleLinkedList from '../src';

describe('instanciate list', () => {
  it('instantiates without head', () => {
    const list = new DoubleLinkedList();
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
    expect(list.length).toBe(0);
  });
  it('instantiates with head node', () => {
    const NodeClass = DoubleLinkedList.getDefaultNodeClass();
    const list = new DoubleLinkedList(new NodeClass('test'));
    expect(list.first().data).toBe('test');
    expect(list.last().data).toBe('test');
    expect(list.length).toBe(1);
  });
  it('instantiates with an iterable object of data', () => {
    const dataArr = [1, 2, 3];
    const dataSet = new Set(dataArr);
    const list = new DoubleLinkedList(dataSet);
    const list2 = new DoubleLinkedList(dataArr);
    expect(list.length).toBe(3);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(3);
    expect(list2.length).toBe(3);
    expect(list2.first().data).toBe(1);
    expect(list2.last().data).toBe(3);
  });
});
describe('ladd/lpop - adds & pops a node on the left (beginning)', () => {
  const instance = new DoubleLinkedList();
  const ldatas = ['test1', 'test2', 'test3'];
  it('adds nodes', () => {
    instance.ladd(ldatas[0]);
    instance.ladd(ldatas[1]);
    instance.ladd(ldatas[2]);
    expect(instance.first().data).toBe(ldatas[2]);
    expect(instance.first().right.data).toBe(ldatas[1]);
    expect(instance.first().right.left.data).toBe(ldatas[2]);
    expect(instance.last().data).toBe(ldatas[0]);
  });
  it('knows the list length after adding', () => {
    expect(instance.length).toBe(3);
  });
  it('pops nodes from the left', () => {
    expect(instance.lpop().data).toBe(ldatas[2]);
    expect(instance.first().data).toBe(ldatas[1]);
  });
  it('knows the list length after 1 pop', () => {
    expect(instance.length).toBe(2);
  });
  it('can lpop until list is empty', () => {
    expect(instance.lpop().data).toBe(ldatas[1]);
    expect(instance.lpop().data).toBe(ldatas[0]);
    expect(instance.lpop()).toBe(null);
  });
  it('knows the list length list is emptied', () => {
    expect(instance.length).toBe(0);
  });
});
describe('radd/add - adds a node on the right (end)', () => {
  const instance = new DoubleLinkedList();
  const rdatas = ['test1', 'test2', 'test3'];
  it('adds nodes', () => {
    instance.radd(rdatas[0]);
    instance.add(rdatas[1]);
    instance.radd(rdatas[2]);
    expect(instance.last().data).toBe(rdatas[2]);
    expect(instance.last().left.data).toBe(rdatas[1]);
    expect(instance.last().left.right.data).toBe(rdatas[2]);
    expect(instance.first().data).toBe(rdatas[0]);
  });
  it('knows the list length after adding', () => {
    expect(instance.length).toBe(3);
  });
  it('pops nodes from the right', () => {
    expect(instance.rpop().data).toBe(rdatas[2]);
    expect(instance.last().data).toBe(rdatas[1]);
  });
  it('knows the list length after 1 pop', () => {
    expect(instance.length).toBe(2);
  });
  it('can rpop until list is empty', () => {
    expect(instance.rpop().data).toBe(rdatas[1]);
    expect(instance.rpop().data).toBe(rdatas[0]);
    expect(instance.rpop()).toBe(null);
  });
  it('knows the list length list is emptied', () => {
    expect(instance.length).toBe(0);
  });
});
describe('gets & removes nodes', () => {
  const instance = new DoubleLinkedList();
  const datas = ['test1', 'test2', 'test3'];
  it('gets null if list is empty', () => {
    expect(instance.getAt(0)).toBe(null);
  });
  it('gets null if index passed is invalid', () => {
    expect(instance.getAt(-1)).toBe(null);
    expect(instance.getAt('test')).toBe(null);
  });
  it('gets added nodes & hasNode returns true for added nodes', () => {
    const firstNode = instance.add(datas[0]);
    const secondNode = instance.add(datas[1]);
    instance.add(datas[2]);
    expect(instance.hasNode(firstNode)).toBe(true);
    expect(instance.hasNode(secondNode)).toBe(true);
    expect(instance.getAt(0)).toBe(firstNode);
    expect(instance.getAt(1)).toBe(secondNode);
    expect(instance.last()).toBe(instance.getAt(2));
  });
  it('has returns true if data in list', () => {
    expect(instance.has(datas[0])).toBe(true);
    expect(instance.has(datas[1])).toBe(true);
    expect(instance.has(datas[2])).toBe(true);
  });
  it('has returns false if data not in list', () => {
    expect(instance.has('notinlist')).toBe(false);
  });
  it('remove - remove a node', () => {
    instance.remove(instance.first());
    expect(instance.first().data).toBe(datas[1]);
  });
  it('removeAt - remove nodes based on index', () => {
    instance.removeAt(1);
    expect(instance.getAt(1)).toBe(null);
  });
  it("has returns false for removed node's data", () => {
    expect(instance.has(datas[0])).toBe(false);
  });
  it('updated length after node removals', () => {
    expect(instance.length).toBe(1);
  });
});

describe("swap nodes/nodes'data", () => {
  const instance = new DoubleLinkedList();
  it('can swap with a head or tail node', () => {
    const first = instance.add(1);
    instance.add(2);
    instance.add(3);
    const fourth = instance.add(4);
    instance.swap(first, fourth);
    expect(instance.first()).toBe(fourth);
    expect(instance.last()).toBe(first);
  });
  it('can swaps sibling nodes', () => {
    const second = instance.getAt(1);
    const third = instance.getAt(2);
    instance.swap(second, third);
    expect(instance.getAt(1)).toBe(third);
    expect(instance.getAt(2)).toBe(second);
  });
  it('can swaps non-sibling nodes', () => {
    const first = instance.getAt(0);
    const second = instance.getAt(1);
    const third = instance.getAt(2);
    const fourth = instance.getAt(3);
    instance.swap(first, third);
    expect(instance.getAt(0)).toBe(third);
    expect(instance.getAt(2)).toBe(first);
    expect(second.left).toBe(third);
    expect(second.right).toBe(first);
    expect(fourth.left).toBe(first);
  });
  it('can swap data', () => {
    const firstData = instance.first().data;
    const lastData = instance.last().data;
    instance.swapData(instance.first(), instance.last());
    expect(instance.first().data).toBe(lastData);
    expect(instance.last().data).toBe(firstData);
  });
  it('can swap nodes based on indices', () => {
    const first = instance.first();
    const second = instance.getAt(1);
    const third = instance.getAt(2);
    const fourth = instance.getAt(3);
    instance.swapAt(0, 2);
    expect(instance.first()).toBe(third);
    expect(instance.getAt(2)).toBe(first);
    expect(second.left).toBe(third);
    expect(second.right).toBe(first);
    expect(fourth.left).toBe(first);
  });
});

describe('list iterations', () => {
  const instance = new DoubleLinkedList();
  instance.ladd('head');
  instance.radd('tail');
  it('iterates from the right (tail to head) via generator', () => {
    const riterate = instance.riterator();
    expect(riterate.next().value.data).toBe('tail');
    expect(riterate.next().value.data).toBe('head');
    expect(riterate.next().done).toBe(true);
  });
  it('iterates from the left (head to tail) via generator', () => {
    const literate = instance.literator();
    expect(literate.next().value.data).toBe('head');
    expect(literate.next().value.data).toBe('tail');
    expect(literate.next().done).toBe(true);
  });
  it('uses list iterator to populate array', () => {
    const arr = [...instance];
    expect(arr.length).toBe(2);
    expect(arr[0].data).toBe('head');
    expect(arr[1].data).toBe('tail');
  });
});

// describe.skip('find node data data', () => {
//   it('finds a node based on specific comparator from the left', () => {

//   })
// })
describe('reset or empty the list', () => {
  const instance = new DoubleLinkedList();
  it('resets length if list modified outside of class methods', () => {
    instance.add(1);
    const second = instance.add(2);
    const third = instance.add(3);
    expect(instance.length).toBe(3);
    // corrupt the list by severing link to 3rd node
    second.right = null;
    // length is now wrong
    expect(instance.length).toBe(3);
    // tail is now also wrong (since unreachable)
    expect(instance.last()).toBe(third);
    // reset list to recalculate length and properly set head & tail
    instance.reset();
    // now length and tail are back to the right values
    expect(instance.length).toBe(2);
    expect(instance.last()).toBe(second);
  });
  it('can fully empty the list', () => {
    instance.empty();
    expect(instance.length).toBe(0);
    expect(instance.first()).toBe(null);
    expect(instance.last()).toBe(null);
  });
});
