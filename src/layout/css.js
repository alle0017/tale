/**
 * 
 * @param {TemplateStringsArray} strings 
 * @param  {...unknown} args 
 */
function combine(strings, ...args) {
      let props = '';
      
      for (let i = 0; i < strings.length; i++) {
            props += (strings[i] + (args[i] ?? ''));
      }
      return props;
}
/**
 * 
 * @param {TemplateStringsArray} strings 
 * @param  {...unknown} args 
 */
export default function css(strings, ...args) {
      const props = combine(strings, ...args);    
      const entries = props
            .replaceAll(' ', '')     
            .split(';')
            .map(prop => 
                  prop
                  .split(':', 2)
            );
      const map = {};

      for (let i = 0; i < entries.length; i++) {
            map[entries[i][0]] = entries[i][1];
      }
      return map;
}
