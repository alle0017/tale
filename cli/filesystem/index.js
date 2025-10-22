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

/**
 * 
 * @param {string} file 
 * @returns {Promise<string>}
 */
export const readFile = async file => {
      
      try {
            //@ts-ignore
            const content = await Deno.readTextFile(file);
            return content;
      } catch (e) {
            console.error(e);
      }
}

/**
 * @template {{}} T
 * @param {string} file 
 * @returns {Promise<T>}
 */
export const readJsonFile = async file => {
      
      try {
            //@ts-ignore
            const content = await Deno.readTextFile(file);
            return JSON.parse(content);
      } catch (e) {
            console.error(e);
      }
}
/**
 * @template {{}} T
 * @param {string} file
 * @param {T} obj
 */
export const writeJsonFile = async (file, obj) => {
      await writeFile(file, JSON.stringify(obj));
}