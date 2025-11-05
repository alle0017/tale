/**
 * @typedef {{
 *    lt: string,
 *    rt: string,
 *    lb: string,
 *    rb: string,
 *    horizontal: string,
 *    vertical: string
 * }} BorderType
 */
/**
 * @enum {BorderType}
 */
export const Border = {
      Double: {
            lt: "╔",
            rt: "╗",
            lb: "╚",
            rb: "╝",
            horizontal: "═",
            vertical: "║"
      },
      Solid: {
            lt: "┌",
            rt: "┐",
            lb: "└",
            rb: "┘",
            horizontal: "─",
            vertical: "│"
      },
      SolidHorizontal: {
            lt: "─",
            rt: "─",
            lb: "─",
            rb: "─",
            horizontal: "─",
            vertical: ""
      },
      SolidRound: {
            lt: "╭",
            rt: "╮",
            lb: "╰",
            rb: "╯",
            horizontal: "─",
            vertical: "│"
      },
      SolidBold: {
            lt: "┏",
            rt: "┓",
            lb: "┗",
            rb: "┛",
            horizontal: "━",
            vertical: "┃"
      },
      Pointed: {
            lt: "┌",
            rt: "┐",
            lb: "└",
            rb: "┘",
            horizontal: "┈",
            vertical: "┊"
      },
      PointedRound: {
            lt: "╭",
            rt: "╮",
            lb: "╰",
            rb: "╯",
            horizontal: "┈",
            vertical: "┊"
      },
      PointedBold: {
            lt: "┏",
            rt: "┓",
            lb: "┗",
            rb: "┛",
            horizontal: "┉",
            vertical: "┋"
      },
      Dashed: {
            lt: "┌",
            rt: "┐",
            lb: "└",
            rb: "┘",
            horizontal: "┄",
            vertical: "┆"
      },
      DashedRound: {
            lt: "╭",
            rt: "╮",
            lb: "╰",
            rb: "╯",
            horizontal: "┄",
            vertical: "┆"
      },
      DashedBold: {
            lt: "┏",
            rt: "┓",
            lb: "┗",
            rb: "┛",
            horizontal: "┅",
            vertical: "┇"
      },
      BigDash: {
            lt: "┌",
            rt: "┐",
            lb: "└",
            rb: "┘",
            horizontal: "╌",
            vertical: "╎"
      },
      BigDashBold: {
            lt: "┏",
            rt: "┓",
            lb: "┗",
            rb: "┛",
            horizontal: "╍",
            vertical: "╏"
      },
      Black: {
            lt: "▛",
            rt: "▜",
            lb: "▙",
            rb: "▟",
            horizontal: "▃",
            vertical: "▌"
      },
      Hashtag: {
            lt: "#",
            rt: "#",
            lb: "#",
            rb: "#",
            horizontal: "#",
            vertical: "#"
      },
      LightShade: {
            lt: "░",
            rt: "░",
            lb: "░",
            rb: "░",
            horizontal: "░",
            vertical: "░"
      },
      MediumShade: {
            lt: "▒",
            rt: "▒",
            lb: "▒",
            rb: "▒",
            horizontal: "▒",
            vertical: "▒"
      },
      BoldShade: {
            lt: "▓",
            rt: "▓",
            lb: "▓",
            rb: "▓",
            horizontal: "▓",
            vertical: "▓"
      },
      None: undefined,
}