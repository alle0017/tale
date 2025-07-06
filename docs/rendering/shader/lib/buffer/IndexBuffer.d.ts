export class IndexBuffer {
    /**
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl: WebGLRenderingContext);
    /**
     * @param {number[]} values
     * @param {number} dynamic
     */
    write(values: number[], dynamic?: number): void;
    bind(): void;
    #private;
}
//# sourceMappingURL=IndexBuffer.d.ts.map