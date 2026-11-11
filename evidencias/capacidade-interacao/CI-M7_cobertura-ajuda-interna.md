# Evidência CI-M7 : Cobertura da ajuda interna

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M7 : Cobertura da ajuda interna |
| Questão | CI-Q3 : Apreensibilidade (apoio ao aprendizado contínuo) |
| Versão | Excalidraw, commit `e7b5346` (pasta `aplicacao/`) |
| Responsável | Zayra Moraes |
| Data da coleta | 2026-11-11 |
| Ambiente | Inspeção de código-fonte (sem execução) |
| Revisado por | _pendente_ |

## 2. O que foi medido

Funções documentadas no diálogo de ajuda (`HelpDialog.tsx`, aberto por `?`) ÷ total de funções disponíveis. **Denominador adotado** (decisão de escopo): as mesmas **17 funções frequentes** da CI-M10. Não se usou o total de ações do programa (101 em `ActionName`, muitas delas ajustes internos de propriedade), porque a classificação de todas ficaria fora do escopo desta etapa.

## 3. Procedimento

1. Usar a lista das 17 funções da evidência CI-M10.
2. Para cada uma, procurar uma entrada `<Shortcut label=...>` correspondente em `packages/excalidraw/components/HelpDialog.tsx`.
3. Calcular documentadas ÷ 17.

### 3.1 Comandos executados

```bash
# 2026-11-11
grep -n "<Shortcut" aplicacao/packages/excalidraw/components/HelpDialog.tsx | wc -l
grep -n -i "save\|export\|loadScene" aplicacao/packages/excalidraw/components/HelpDialog.tsx
```

```text
85 entradas <Shortcut>
(a segunda busca só encontrou "noopener" e KEYS.O da elipse: nenhuma entrada de salvar, abrir ou exportar)
```

## 4. Evidências

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `HelpDialog.tsx:149-190` | Ferramentas: retângulo (155), seta (167), texto (179) |
| C2 | `HelpDialog.tsx:363-383` | Excluir (363), copiar (371), colar (375), selecionar tudo (383) |
| C3 | `HelpDialog.tsx:455,466,470,481` | Duplicar, desfazer, refazer e agrupar |
| C4 | `HelpDialog.tsx:267` | Zoom |
| C5 | `HelpDialog.tsx:500-507` | Seletor de cor do traço (`S`) e de fundo (`G`) |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Entrada de **exportar imagem**, **salvar** e **abrir arquivo** | `grep -n -i "save\|export\|loadScene" HelpDialog.tsx` | Nenhuma ocorrência |

## 5. Resultado

### 5.1 Dados brutos

| # | Função frequente | Documentada na ajuda? | Evidência |
| --: | --- | :-: | --- |
| 1 | Criar forma (retângulo) | Sim | C1 |
| 2 | Seta | Sim | C1 |
| 3 | Texto | Sim | C1 |
| 4 | Cor do traço | Sim | C5 |
| 5 | Cor de fundo | Sim | C5 |
| 6 | Agrupar | Sim | C3 |
| 7 | Exportar PNG | **Não** | 4.3 |
| 8 | Desfazer | Sim | C3 |
| 9 | Refazer | Sim | C3 |
| 10 | Copiar | Sim | C2 |
| 11 | Colar | Sim | C2 |
| 12 | Excluir | Sim | C2 |
| 13 | Duplicar | Sim | C3 |
| 14 | Selecionar tudo | Sim | C2 |
| 15 | Zoom | Sim | C4 |
| 16 | Salvar | **Não** | 4.3 |
| 17 | Abrir | **Não** | 4.3 |

### 5.2 Cálculo

14 documentadas ÷ 17 funções = **82,4%**.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 82,4% | 2 = ≥ 80%; 1 = 50% a 79%; 0 = < 50% | **2** |

**Justificativa:** a ajuda cobre as funções de edição e de ferramentas, mas não as de arquivo (salvar, abrir e exportar).

## 6. Observações e limitações

- O resultado depende do denominador. Com todas as ações do programa a cobertura seria menor; a equipe usou as funções frequentes por escopo.
- Só se verificou o diálogo de ajuda (`?`). Dicas na tela (`HintViewer`), tooltips e a documentação externa não entram.
- A CI-M7 também observa a autodescritividade (ver roteiro).
- A nota 2 fica a **2 pontos percentuais** de cair para 1: se uma só das 14 mudar de classe (14 → 13 = 76,5%), a pontuação cai.
- Oportunidade (nota não é 0, registro opcional): acrescentar salvar, abrir e exportar ao diálogo de ajuda.

## 7. Achado (só se a pontuação for 0)

Não se aplica.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q3 | parcial | A hipótese previa ajuda com os atalhos; ela existe e cobre 82%, mas não tem tutorial guiado (a ser confirmado por outras métricas) e omite as funções de arquivo |
