---
title: Fundação Maria Luisa e Oscar Americano
date: 2018-08-22T14:42:00.000Z
image: /assets/images/oscar-americano-wide.png
description: >-
   Conceito de redesign para o site da Fundação Maria Luisa e Oscar Americano.
keywords:
  - otimização
  - usabilidade
  - mobile
  - Solução
  - site
  - mapa
  - fundação
  - oscar
  - americano
  - web
  - website
categories:
  - UI/UX
  - Desenvolvimento
roles:
  - Desenvolvedor front-end
  - UI Designer
  - UX Designer
showproject: true
project:
  - name: Veja o site
    link: https://github.com/adilsonfsantos/Oscar-Americano
  - name: Github
    link: https://adilsonfsantos.github.io/Oscar-Americano
showteam: true
team:
  - name: Alan Erik
    portfolio: false
    role: UI Designer
  - name: Bruno Rodrigues
    portfolio: false
    role: UX Designer
  - name: Jefferson Ribeiro
    portfolio: false
    role: UX Designer
---
## Desafio

Com uma extensa mata de 75.000 m² e um grande acervo de obras a Fundação Maria Luisa e Oscar Americano é um dos principais pontos de cultura e lazer de São Paulo. E para refletir a importância da Fundação foi feito este conceito de redesign do site para as aulas de arquitetura da informação e programação web.

## Solução

Fazer um redesign do site que fosse otimizado e de fácil navegação.

A primeira etapa foi identificar os problemas principais e diretamente no primeiro uso percebemos que a otimização do site era algo a ser trabalhado.

{% picture "/assets/images/fundacao-analise-lighthouse.png", "Resultados da auditoria inicial do site.", "post__photo", "post__photo--image" %}

Os testes com a ferramenta de auditoria [Lighthouse](https://developers.google.com/web/tools/lighthouse/?hl=pt-br) da Google identificamos quais eram os problemas principais do site atual e utilizamos essas informações para poder guiar o desenvolvimento do novo site.

Outro problema era a usabilidade, pois ao mapear a jornada do usuário percebemos que o site se dividia em dois criando uma complexidade desnecessária para o usuário.

{% picture "/assets/images/fundacao-jornada-usuario-original.png", "Mapa da jornada do usuário original.", "post__photo", "post__photo--image" %}

Então decidimos simplificar a distribuição das páginas e ordenar o conteúdo de forma lógica, dando destaque as informações mais importantes.

Primeiramente decidimos simplificar a distribuição das páginas e ordenar o conteúdo de forma lógica, dando destaque as informações mais importantes.

{% picture "/assets/images/fundacao-jornada-usuario-final.png", "Mapa da jornada do usuário final.", "post__photo", "post__photo--image" %}

Para o desenvolvimento foi utilizado apenas HTML5 e CSS3, utilizando o conceito de mobile-first junto com técnicas de CSS como flexbox e grid para trazer responsividade para a interface.
