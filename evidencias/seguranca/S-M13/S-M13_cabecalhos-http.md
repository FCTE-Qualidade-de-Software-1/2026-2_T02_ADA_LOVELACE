# Evidência S-M13 : Nota dos cabeçalhos de segurança HTTP

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M13 : Nota dos cabeçalhos de segurança HTTP |
| Questão (S-Q) | S-Q6 : Resistência |
| Tarefa do plano | T2.9 (ver `tarefas-seguranca-excalidraw.md`) |
| Responsável | João Pedro Lopes da Cruz |
| Data(s) da coleta | 2026-11-04 |
| Revisado por | <nome da outra pessoa> em <AAAA-MM-DD> |

## 2. O que foi medido

Presença dos seis cabeçalhos avaliados pelo securityheaders.com (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy) em dois lugares: na configuração versionada no repositório e na resposta real de `https://excalidraw.com`. A nota final é a do securityheaders.com.

## 3. Procedimento

1. Ler os arquivos de hospedagem do repositório: `vercel.json`, `public/_headers`, `Dockerfile` e `excalidraw-app/index.html`.
2. Procurar no repositório inteiro qualquer definição dos cabeçalhos que faltam, inclusive `<meta http-equiv>` e `add_header` do nginx.
3. Fazer **uma** requisição passiva `HEAD` a `https://excalidraw.com` e salvar a saída.
4. Consultar a nota no securityheaders.com. Por `curl`, o site devolveu um desafio do Cloudflare (403), então a nota precisa ser tirada no navegador (ver 4.2, E3).
5. Montar a tabela cabeçalho × repositório × resposta.

### 3.1 Comandos executados

```bash
# 2026-11-04 13:19:46 UTC, curl 8.8.0
curl -sI https://excalidraw.com
```

```text
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://excalidraw.com
Feature-Policy: *
Referrer-Policy: origin
Server: Vercel
Strict-Transport-Security: max-age=63072000
X-Content-Type-Options: nosniff
X-Vercel-Cache: HIT
```

```bash
# 2026-11-04 13:19:52 UTC
curl -sI "https://securityheaders.com/?q=https%3A%2F%2Fexcalidraw.com&hide=on&followRedirects=on"
```

```text
HTTP/1.1 403 Forbidden
Cf-Mitigated: challenge
Server: cloudflare
```

```bash
# 2026-11-04 10:20, pasta aplicacao/
git grep -n -I -i '<cabeçalho>' -- ':!*.snap' ':!*test*' ':!*.md'
# cabeçalhos: Content-Security-Policy, Strict-Transport-Security, X-Frame-Options,
#             Permissions-Policy, frame-ancestors, http-equiv, add_header
```

```text
nenhuma ocorrência para todos os termos
```

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/vercel.json:3-23` | Os únicos cabeçalhos globais: ACAO, `nosniff`, `Feature-Policy: *` e `Referrer-Policy: origin` |
| C2 | `aplicacao/public/_headers:1-2` | Só `Access-Control-Allow-Origin: *` |
| C3 | `aplicacao/Dockerfile:16-20` | Imagem nginx padrão, sem configuração própria e sem `add_header` |
| C4 | `aplicacao/excalidraw-app/index.html` | Sem `<meta http-equiv="Content-Security-Policy">` |

```json
// C1: aplicacao/vercel.json:3-23
{
  "source": "/(.*)",
  "headers": [
    { "key": "Access-Control-Allow-Origin", "value": "https://excalidraw.com" },
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "Feature-Policy", "value": "*" },
    { "key": "Referrer-Policy", "value": "origin" }
  ]
}
```

```text
// C2: aplicacao/public/_headers:1-2
/*
  Access-Control-Allow-Origin: *
```

```dockerfile
# C3: aplicacao/Dockerfile:16-20
FROM nginx:stable-alpine-slim@sha256:2c605d...
COPY --from=build /opt/node_app/excalidraw-app/build /usr/share/nginx/html
HEALTHCHECK CMD wget -q -O /dev/null http://localhost || exit 1
```

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `S-M13_curl-headers-excalidraw_2026-11-04.txt` | saída de comando | Resposta completa de `https://excalidraw.com` |
| E2 | `S-M13_buscas-cabecalhos-repo_2026-11-04.txt` | saída de comando | Buscas no repositório sem nenhuma ocorrência |
| E3 | `S-M13_securityheaders-grade_2026-11-04.txt` | saída de comando | Tentativa por `curl`, bloqueada pelo Cloudflare (403) |
| E4 | `S-M13_securityheaders_2026-11-04.png` | print | **Pendente:** abrir `https://securityheaders.com/?q=excalidraw.com&followRedirects=on` no navegador e printar a nota |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| CSP no repositório | `git grep -n -I -i 'Content-Security-Policy'` e `'http-equiv'` em `aplicacao/` | Nenhuma ocorrência |
| HSTS no repositório | `git grep -n -I -i 'Strict-Transport-Security'` | Nenhuma ocorrência. Na resposta, o cabeçalho vem da Vercel |
| X-Frame-Options ou `frame-ancestors` | `git grep -n -I -i 'X-Frame-Options'` e `'frame-ancestors'` | Nenhuma ocorrência |
| Permissions-Policy | `git grep -n -I -i 'Permissions-Policy'` | Nenhuma ocorrência. Só existe o `Feature-Policy: *`, que está obsoleto |
| Configuração de nginx | `git grep -n -I -i 'add_header'` e `git ls-files \| grep -i nginx` | Nenhuma ocorrência |

## 5. Resultado

### 5.1 Dados brutos

| Cabeçalho | No repositório? | Na resposta de excalidraw.com? | Valor |
| --- | --- | --- | --- |
| Content-Security-Policy | Não | **Não** | — |
| Strict-Transport-Security | Não | Sim (vem da Vercel) | `max-age=63072000` |
| X-Frame-Options | Não | **Não** | — |
| X-Content-Type-Options | Sim (`vercel.json:11-12`) | Sim | `nosniff` |
| Referrer-Policy | Sim (`vercel.json:19-20`) | Sim | `origin` |
| Permissions-Policy | Não (só `Feature-Policy: *`, `vercel.json:15-16`) | **Não** | — |

### 5.2 Cálculo

3 dos 6 cabeçalhos estão presentes na resposta (HSTS, X-Content-Type-Options e Referrer-Policy). Faltam CSP, X-Frame-Options e Permissions-Policy. Só 2 dos 6 estão no repositório.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 3 de 6 cabeçalhos. Nota esperada **D**, que precisa ser confirmada pelo print E4 | 2 = A ou A+; 1 = B ou C; 0 = D, E ou F | **0** (provisória) |

**Justificativa:** faltam três dos seis cabeçalhos, incluindo CSP e proteção contra framing. Com esse conjunto o securityheaders.com costuma dar D, o que corresponde a 0. Se o print mostrar B ou C, a nota sobe para 1.

## 6. Observações e limitações

- A nota do securityheaders.com não pôde ser coletada por linha de comando por causa do desafio do Cloudflare. Só o print E4 fecha a métrica.
- O HSTS só aparece porque a Vercel o adiciona. Quem hospedar pelo `Dockerfile` (nginx) não recebe nenhum dos cabeçalhos do `vercel.json`, nem HSTS. Não subi a imagem Docker para medir, porque o build completo é demorado. Fica como possível verificação extra.
- `Feature-Policy: *` está obsoleto e é permissivo. O securityheaders.com não o aceita no lugar de Permissions-Policy.
- `public/_headers` libera `Access-Control-Allow-Origin: *`, mas na resposta da Vercel vale o valor restrito do `vercel.json`.
- Foi feita uma única requisição ao excalidraw.com (`HEAD`, 2026-11-04 13:19:46 UTC), com resposta do cache (`X-Vercel-Cache: HIT`).

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-__ | S-M13 | E1 (`curl -sI https://excalidraw.com`), C1 a C4 e tabela 5.1: faltam CSP, X-Frame-Options e Permissions-Policy | 0 (provisória) | Médio | Adicionar ao `vercel.json` uma CSP (pelo menos `default-src 'self'`, `frame-ancestors 'self'` e `object-src 'none'`, liberando os domínios de Firebase, socket e IA), `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` restritiva no lugar de `Feature-Policy: *`, e replicar os cabeçalhos numa configuração de nginx para a imagem Docker |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q6 | confirmada (na parte de hospedagem) | A configuração não define CSP, como a hipótese previa. As partes de dependências e advisories ficam com S-M11 e S-M12. |
