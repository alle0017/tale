//@ts-ignore
import { exists } from "jsr:@std/fs/exists";
/**
 * 
 * @param {string} file 
 * @param {string} text 
 */
export const writeFile = async (file, text) => {
      //@ts-ignore
      await Deno.writeTextFile(file, text)
      console.log(`\x1b[32mfile written: ${file}\x1b[0m`);
}

/**
 * 
 * @param {string} file 
 * @returns {Promise<boolean>}
 */
export const fileExists = async file => await exists(file);

/**
 * 
 * @param {string} dir 
 */
export const createDir = async dir => {
      try {
            //@ts-ignore
            await Deno.mkdir(dir, { recursive: true });
            console.log(`\x1b[32m+ created directory ${dir}\x1b[0m`);
      } catch {
            return;
      }
}