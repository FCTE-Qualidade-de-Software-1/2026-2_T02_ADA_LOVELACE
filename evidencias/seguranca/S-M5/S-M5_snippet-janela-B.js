// S-M5 (issue #58): script de console da JANELA B (quem recebe).
// Uso só na instância local.
//
// Conta os alertas de falha de decifragem (Collab.tsx:482, "Couldn't decrypt data.").
// O primeiro alerta aparece de verdade, para o print; os seguintes só são contados,
// para não travar a janela. __sm5b.cena() resume a cena (id:version de cada elemento)
// para comparar antes e depois.
(() => {
  const alertOriginal = window.alert.bind(window);
  const sm5b = (window.__sm5b = { alertas: [], fotos: {} });

  window.alert = (mensagem) => {
    sm5b.alertas.push({ n: sm5b.alertas.length + 1, hora: new Date().toISOString(), mensagem });
    console.log(`alerta ${sm5b.alertas.length}: ${mensagem}`);
    if (sm5b.alertas.length === 1) alertOriginal(mensagem);
  };

  sm5b.cena = () =>
    window.collab.excalidrawAPI
      .getSceneElements()
      .map((e) => `${e.id}:${e.version}:${Math.round(e.x)},${Math.round(e.y)}`)
      .sort()
      .join(" | ");

  sm5b.foto = (nome) => {
    sm5b.fotos[nome] = { hora: new Date().toISOString(), cena: sm5b.cena() };
    console.log(`${nome}: ${sm5b.fotos[nome].cena}`);
  };

  sm5b.relatorio = () =>
    JSON.stringify({ janela: "B", alertas: sm5b.alertas.length, registro: sm5b.alertas, fotos: sm5b.fotos }, null, 2);

  console.log("S-M5 janela B pronta.");
})();
