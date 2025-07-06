export class UniformBuffer {
    /**
     * @param {WebGLRenderingContext} gl
     * @param {string} name
     * @param {WebGLProgram} program
     * @param {string} type
     */
    constructor(gl: WebGLRenderingContext, name: string, program: WebGLProgram, type: string);
    /**
     * @param {number[]} values
     */
    write(values: number[]): void;
    bind(): void;
    #private;
}
//# sourceMappingURL=UniformBuffer.d.ts.map