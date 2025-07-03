this module is used to create classes that can communicate directly across workers, abstracting the event handling

## basic usage

in a Controller.js file

```javascript
import { useRemote } from "../ipmi/index.js";

export default class Controller {
      #count = 0;

      async add( i ){
            this.#count += i;
      }

      async get(){
            return this.#count;
      }
}

useRemote( RenderingController );
```

while in Model.js

```javascript
import { useLocal } from "../ipmi/index.js";

class Stub {
      /**
       * @type {Worker}
       */
      thread;

      /**
       * @param {number} i 
       */
      async add( i ){}
      /**
       * @returns {Promise<number>}
       */
      async get(){ return 0; }
}

const main = async () => {

      //@ts-ignore
      const controller = useLocal( import.meta.resolve("./Controller.js"), new Stub() );

      await controller.add( 10 );

      console.assert( await controller.get() == 10 );
      console.assert( controller.thread != null );

}

main();
```

the stub method could be substituted with the Controller itself, excluding the need for a stub class