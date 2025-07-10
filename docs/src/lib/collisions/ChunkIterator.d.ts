/** @import { RigidBody } from ".." */
export default class ChunkIterator {
    /**
     * @param {RigidBody[]} bodies
     */
    constructor(bodies: RigidBody[]);
    getCurrent(): RigidBody;
    getChunk(): any[];
    hasNext(): boolean;
    next(): void;
    #private;
}
//# sourceMappingURL=ChunkIterator.d.ts.map