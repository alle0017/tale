export function useInput(): {
    /**
     * set an event handler attached
     * to an abstract event.
     * @param {string} event
     * @param {() => void} handler
     */
    on: (event: string, handler: () => void) => () => boolean;
    /**
     * map an abstract event onto a key.
     * @param {string} ev
     * @param {string} key
     */
    addMapping: (ev: string, key: string) => void;
    /**
     * remove previously set mapping
     * @param {string} key
     */
    removeMapping: (key: string) => void;
};
//# sourceMappingURL=input.d.ts.map