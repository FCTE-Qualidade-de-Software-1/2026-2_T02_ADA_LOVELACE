// Avaliação de qualidade (equipe Ada Lovelace), issue #58.
// PRNG com semente (mulberry32) para que S-M5 e S-M6 sejam reproduzíveis.
export const criarPrng = (semente: number): (() => number) => {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
