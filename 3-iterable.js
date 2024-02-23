/* 
Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.

It is okay if your iterator behaves strangely when the group is modified during iteration.
*/

class Group {
  constructor() {
    this.list = [];
  }
  
  static from(array) {
    let group = new Group;
    for (let item of array) {
      group.add(item);
    }
    return group;
  }

  add(value) {
    if (!this.has(value)) {
      this.list.push(value);
    }
  }

  delete(value) {
    this.list = this.list.filter(v => v !== value);
  }

  has(value) {
    return this.list.includes(value);
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }

}



class GroupIterator {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }

  next() {
    if (this.position >= this.group.list.length) {
      return {done: true};
    } else {
      let result = {value: this.group.list[this.position],
                    done: false};
      this.position++;
      return result;
    }
  }
}



// Tests:
for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // → a
  // → b
  // → c