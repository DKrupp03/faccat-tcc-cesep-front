export const formatDate = (value?: string) => {
  if (!value) return "";

  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateTime = (value?: string) => {
  if (!value) return "";

  return new Date(value)
    .toLocaleString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).replace(",", " -");
};

export const formatMonthYear = (value?: string | Date) => {
  if (!value) return "";

  const formatted = new Date(value).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const phoneMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export const cpfMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

export const rgMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}-${digits.slice(8)}`;
};

export const crpMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 7);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export const integerMask = (value: string) => {
  return value.replace(/\D/g, "");
};

export const decimalMask = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  const number = parseInt(digits, 10);
  const intPart = Math.floor(number / 100);
  const decPart = number % 100;
  return `${intPart},${String(decPart).padStart(2, "0")}`;
};

export const apgarMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length === 0) return "";

  // first slot: "10" consumes 2 digits, anything else consumes 1
  const firstIsTen = digits.slice(0, 2) === "10";
  const firstEnd = firstIsTen ? 2 : 1;
  const first = digits.slice(0, firstEnd);

  if (digits.length <= firstEnd) return `(${first}`;

  const remaining = digits.slice(firstEnd);
  const secondIsTen = remaining.slice(0, 2) === "10";
  const secondEnd = secondIsTen ? 2 : 1;
  const second = remaining.slice(0, secondEnd);
  const secondComplete = second.length === secondEnd;

  return secondComplete
    ? `(${first}) → (${second})`
    : `(${first}) → (${second}`;
};