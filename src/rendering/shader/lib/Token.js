/**
 * 
 * @param {string} name 
 * @param {string} keyword
 * @param {string} source
 */
const extractTypeToken = (name, keyword, source) => {
      const match = new RegExp(`${keyword} [a-z1-4]+ ${name}`).exec(source);

      if (!match) {
            throw new Error(`token not found ${name}`);
      }

      return match[0].replace(keyword, '').replace(name, '').replaceAll(' ', '');
}
/**
 * 
 * @param {string} name 
 * @param {string} source
 */
export const extractUniformType = (name, source) => extractTypeToken(name, 'uniform', source);

/**
 * 
 * @param {string} name 
 * @param {string} source
 */
export const extractAttributeType = (name, source) => extractTypeToken(name, 'attribute', source);