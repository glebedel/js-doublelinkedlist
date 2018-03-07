import DoubleLinkedList from '../src';

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
  it('gets the node', () => {
    const firstNode = instance.add(datas[0]);
    const secondNode = instance.add(datas[1]);
    expect(instance.getAt(0)).toBe(firstNode);
    expect(instance.getAt(1)).toBe(secondNode);
  });
  it('gets null if node was removed', ()=>{

  });
});
