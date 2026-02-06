# Relatório de Auditoria de UX (CEP PRO)

Este documento detalha os pontos de fricção identificados no fluxo de usuário atual, com base na análise do código fonte.

## 1. Fluxo de Entrada de Dados (Data Entry)

### Fricção 1: Validação e Carregamento Manual (Paste)
- **Problema:** O usuário deve colar os dados no textarea e, explicitamente, clicar em "Carregar".
- **Impacto:** Aumenta o tempo de interação. Se o usuário colar e esquecer de clicar, o gráfico não atualiza.
- **Sugestão:** Implementar detecção automática (debounce) ou validação visual imediata no textarea.

### Fricção 2: Feedback de Erro Intrusivo
- **Problema:** Uso de `alert()` para erros (ex: "Insira pelo menos 2 valores").
- **Impacto:** Interrompe o fluxo, bloqueia a UI e parece "quebrado".
- **Sugestão:** Usar notificações "Toast" ou mensagens de erro inline abaixo do input.

### Fricção 3: Persistência
- **Problema:** Ao recarregar a página, todos os dados são perdidos.
- **Impacto:** Frustração se o usuário atualizar por engano.

## 2. Fluxo de Configuração (Settings)

### Fricção 4: Ausência de Recálculo Reativo
- **Problema:** Alterar `Tipo de Gráfico`, `Tamanho de Subgrupo`, ou Limites (`LSL`/`USL`) não atualiza os gráficos automaticamente. O usuário deve clicar novamente em "Calcular CEP".
- **Impacto:** O ciclo "Ajustar -> Clicar -> Ver" é lento. Usuários modernos esperam "Ajustar -> Ver".
- **Sugestão:** Adicionar listeners `change` ou `input` (com debounce) para disparar `App.calculate()` automaticamente se já houver dados.

### Fricção 5: Opções Irrelevantes Visíveis
- **Problema:** O input `Tamanho Subgrupo (n)` permanece visível e editável mesmo para gráficos que não usam subgrupos (ex: I-MR, CUSUM).
- **Impacto:** Confusão cognitiva. O usuário pode achar que precisa configurar algo que não afeta o resultado.
- **Sugestão:** Ocultar ou desabilitar inputs irrelevantes com base no `chart-type`.

## 3. Visualização e Interação

### Fricção 6: Layout Shift em Modais
- **Problema:** Gráficos em modais (Histograma, Boxplot) usam `setTimeout` fixo para renderização.
- **Impacto:** Pode causar "flicker" ou renderizar incorretamente em dispositivos lentos.

### Fricção 7: Navegação Mobile
- **Problema:** Em telas pequenas (<1024px), clicar em "Calcular CEP" na sidebar não fecha a sidebar automaticamente.
- **Impacto:** O gráfico é gerado "atrás" do menu, e o usuário precisa fechar o menu manualmente para ver o resultado.
- **Sugestão:** Chamar `toggleSidebar()` automaticamente ao calcular em mobile.

### Fricção 8: Reset de Dados
- **Problema:** Não há botão explícito para "Limpar Tudo".
- **Sugestão:** Adicionar botão de Reset.

## Plano de Ação Recomendado

1. **Tornar a UI Reativa:** Automatizar o recálculo ao alterar configurações.
2. **Contextualizar Inputs:** Mostrar apenas campos relevantes para o gráfico selecionado.
3. **Melhorar Mobile:** Auto-fechar menus após ações.
4. **Modernizar Feedback:** Substituir `alert()` por mensagens na UI.
