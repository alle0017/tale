import { createEntity, createComponent } from "../src/index.js";

const entities = []
const comp = []
const NUM = 10000;
/*
intial load

test on creation of entities: 5.82ms – timer terminato buckets.js:11:9
test on creation of compoenents: 9.84ms – timer terminato buckets.js:17:9
test on instance and attach of compoenents: 6.74ms – timer terminato buckets.js:23:9
test on get of compoenents: 4.4ms – timer terminato buckets.js:29:9
test on remove of compoenents: 355.14ms – timer terminato
*/

/**
convergence 

test on creation of entities: 0.88ms – timer terminato buckets.js:17:9
test on creation of compoenents: 0.86ms – timer terminato buckets.js:23:9
test on instance and attach of compoenents: 1.24ms – timer terminato buckets.js:29:9
test on get of compoenents: 0.84ms – timer terminato buckets.js:35:9
test on remove of compoenents: 57.92ms – timer terminato
 */

console.time('test on creation of entities')
for (let i = 0; i < NUM; i++) {
      entities.push(createEntity());
}
console.timeEnd('test on creation of entities')

console.time('test on creation of compoenents')
for (let i = 0; i < NUM; i++) {
      comp.push(createComponent(() => ({ x: 0 })));
}
console.timeEnd('test on creation of compoenents')

console.time('test on instance and attach of compoenents')
for (let i = 0; i < NUM; i++) {
      entities[0].add(comp[i].create());
}
console.timeEnd('test on instance and attach of compoenents')

console.time('test on get of compoenents')
for (let i = 0; i < NUM; i++) {
      entities[0].get(comp[i]);
}
console.timeEnd('test on get of compoenents')

console.time('test on remove of compoenents')
for (let i = 0; i < NUM; i++) {
      entities[0].remove(comp[i]);
}
console.timeEnd('test on remove of compoenents')
