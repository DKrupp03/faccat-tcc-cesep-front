// Tags de ênfase usadas pelas mensagens do i18n.
const ALLOWED_TAGS = ["b", "strong", "i", "em", "br"];

const ALLOWED_TAGS_PATTERN = new RegExp(
  `&lt;(/?)(${ALLOWED_TAGS.join("|")})\\s*/?&gt;`,
  "gi",
);

/**
 * Escapa o texto inteiro e reabre só as tags acima. As descrições vêm do i18n,
 * mas basta uma ser montada com dado do usuário para virar injeção de markup.
 */
export const sanitizeRichText = (value: string) => {
  const escaped = value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    ALLOWED_TAGS_PATTERN,
    (_match, slash: string, tag: string) => `<${slash}${tag.toLowerCase()}>`,
  );
};
