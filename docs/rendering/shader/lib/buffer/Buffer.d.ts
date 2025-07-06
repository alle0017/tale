export class Buffer {
    /**
     * @param {WebGLRenderingContext} gl
     * @param {string} name
     * @param {string} type
     * @param {WebGLProgram} program
     */
    constructor(gl: WebGLRenderingContext, name: string, type: string, program: WebGLProgram);
    /**
     * @param {number[]} values
     * @param {number} dynamic
     */
    write(values: number[], dynamic?: number): void;
    /**
     * @param {number} [offset]
     * @param {number} [stride]
     */
    bind(normalized?: boolean, offset?: number, stride?: number): void;
    #private;
}
//# sourceMappingURL=Buffer.d.ts.map