import { createEntity, createComponent } from "../src/index.js";

const entities = []
const comp = []
const NUM = 10000;
/*
intial load

test on creation of entities: 28.6ms – timer terminato proxy.js:30:9
test on creation of compoenents: 2985.5ms – timer terminato proxy.js:36:9
test on instance and attach of compoenents: 5.92ms – timer terminato proxy.js:42:9
test on get of compoenents: 1.58ms – timer terminato proxy.js:48:9
test on remove of compoenents: 2.44ms – timer terminato
*/

/**
convergence 

test on creation of entities: 2.64ms – timer terminato proxy.js:30:9
test on creation of compoenents: 2931.08ms – timer terminato proxy.js:36:9
test on instance and attach of compoenents: 4.4ms – timer terminato proxy.js:42:9
test on get of compoenents: 1.48ms – timer terminato proxy.js:48:9
test on remove of compoenents: 2.36ms – timer terminato
 */

console.time('test on creation of entities')
for (let i = 0; i < NUM; i++) {
      entities.push(createEntity());
}
console.timeEnd('test on creation of entities')

console.time('test on creation of compoenents')
for (let i = 0; i < NUM; i++) {
      comp.push(createComponent(i + '', () => ({ x: 0 })));
}
console.timeEnd('test on creation of compoenents')

console.time('test on instance and attach of compoenents')
for (let i = 0; i < NUM; i++) {
      entities[0].add(comp[i][1]());
}
console.timeEnd('test on instance and attach of compoenents')

console.time('test on get of compoenents')
for (let i = 0; i < NUM; i++) {
      entities[0][i + '']
}
console.timeEnd('test on get of compoenents')

console.time('test on remove of compoenents')
for (let i = 0; i < NUM; i++) {
      entities[0].remove(i + '');
}
console.timeEnd('test on remove of compoenents')
