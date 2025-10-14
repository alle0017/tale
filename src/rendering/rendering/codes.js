export const PREFIX = '\x1b['
/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 */
const FROM_TC = (r, g, b, a) => 16 + 36*Math.trunc(r*5/255) + 6*Math.trunc(g*5/255) + Math.trunc(b*5/255);
export default {
      Home: `${PREFIX}H`,
      Clear: `${PREFIX}J`,
      Reset: `${PREFIX}0m`,
      /**
       * @param {number} r
       * @param {number} g
       * @param {number} b
       * @param {number} a
       */
      Foreground: (r, g, b, a) => `${PREFIX}38;5;${FROM_TC(r, g, b, a)}m`,
      /**
       * @param {number} r
       * @param {number} g
       * @param {number} b
       * @param {number} a
       */
      Background: (r, g, b, a) => `${PREFIX}48;5;${FROM_TC(r, g, b, a)}m`,
      /**
       * @param {number} r
       * @param {number} g
       * @param {number} b
       * @param {number} a
       */
      ForegroundTC: (r, g, b, a) => `${PREFIX}38;2;${r};${g};${b};m`,
      /**
       * @param {number} r
       * @param {number} g
       * @param {number} b
       * @param {number} a
       */
      BackgroundTC: (r, g, b, a) => `${PREFIX}48;2;${r};${g};${b};m`,
}