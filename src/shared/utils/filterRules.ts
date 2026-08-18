import type { Rule, RuleRender } from "antd/es/form";
import type { TFunction } from "i18next";

/**
 * Faixa numérica espelhando o limite do model correspondente, para o usuário
 * ver o erro no campo em vez de descobrir o teto na resposta do servidor.
 */
export const rangeRule = (t: TFunction, min: number, max: number): Rule => ({
  validator(_rule: unknown, value?: string | number) {
    if (value === undefined || value === null || value === "") return Promise.resolve();

    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= min && parsed <= max) return Promise.resolve();

    return Promise.reject(new Error(t("common.errors.outOfRange", { min, max })));
  },
});

/**
 * Impede intervalo invertido (fim anterior ao início) nas modais de filtro.
 * Sem isso o painel aceitava a faixa e devolvia lista vazia, sem explicar
 * por quê. As datas ficam no form como "YYYY-MM-DD", então a comparação
 * de strings já respeita a ordem cronológica.
 */
export const dateRangeRule = (
  t: TFunction,
  startField: string,
): RuleRender => ({ getFieldValue }) => ({
  validator(_rule: unknown, value?: string) {
    const start = getFieldValue(startField);

    if (!value || !start || value >= start) return Promise.resolve();

    return Promise.reject(new Error(t("common.errors.dateRangeInverted")));
  },
});
