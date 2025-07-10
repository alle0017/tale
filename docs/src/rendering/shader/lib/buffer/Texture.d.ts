export class Texture {
    /**
     * @param {WebGLRenderingContext} gl
     * @param {string} name
     * @param {WebGLProgram} program
     */
    constructor(gl: WebGLRenderingContext, name: string, program: WebGLProgram);
    image: string;
    /**
     *
     * @param {string} value
     */
    write(value: string): void;
    bind(): void;
    #private;
}
//# sourceMappingURL=Texture.d.ts.map