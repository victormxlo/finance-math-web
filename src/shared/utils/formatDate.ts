export function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}