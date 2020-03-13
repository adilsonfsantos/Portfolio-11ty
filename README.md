# Portfolio-11ty

Esse é o código fonte do portfólio de Adilson Santos, feito com base no repositório criado por [Michael Rose](https://github.com/mmistakes/made-mistakes-jekyll/)

## Selos

![Netlify](https://img.shields.io/netlify/b25fb8b1-4bb4-4f49-ad1c-2358c7b0ca12)

![Dependências](https://img.shields.io/david/adilsonfsantos/Portfolio-11ty)

![Licença](https://img.shields.io/github/license/adilsonfsantos/Portfolio-11ty)

![Tamanho](https://img.shields.io/github/repo-size/adilsonfsantos/Portfolio-11ty)

![Headers de Segurança](https://img.shields.io/security-headers?url=https%3A%2F%2Fadilsonsantos.netlify.com)

![Pontuação do Mozilla HTTP Observatory](https://img.shields.io/mozilla-observatory/grade-score/adilsonsantos.netlify.com?publish)

![Atividade](https://img.shields.io/github/commit-activity/w/adilsonfsantos/Portfolio-11ty)

## Introdução

### 1. Requisitos

- Node: >12
- Gulp: >4.0

### 2. Instalação

Clone o repositório e use o comando ```npm install```

### 3. Estrutura

```bash
├── gulp               # => Tarefas do gulp
│   └── tasks
├── src                # => Arquivos fonte do 11ty
│   ├── assets
│   │   ├── fonts
│   │   ├── images
│   │   └── js
│   ├── _data
│   ├── _drafts
│   ├── icons
│   ├── _includes
│   │   ├── components # Códigos auxiliares de imagens para o 11ty
│   │   ├── filters    # Códigos auxiliares de filtros para o 11ty
│   │   └── layouts    # Contém arquivos Liquid para as páginas
│   ├── projetos
│   └── _sass          # Arquivos SCSS seguindo a arquitetura 7-1
│       ├── abstracts
│       ├── base
│       ├── components
│       ├── layout
│       └── pages
├── .eleventy.js
├── .eleventyignore
├── .gitattributes
├── .gitignore
├── .stylelintrc.json
├── gulpfile.js
├── LICENSE.md
├── package.json
├── README.md
├── ...
```

### 4. Utilização

#### ```gulp [--prod]```

Esse é o comando padrão, ele processa o CSS, JS, imagens e o site com as configurações de desenvolvimento, também abre o código atual no seu navegador com o [BrowserSync](https://github.com/shakyShane/browser-sync) que enquanto você modifica os arquivos ele vai atualizando o navegador automaticamente.

> --prod

Utilizando com o argumento ```--prod``` o seu CSS, JS e HTML serão minificados e gzipados.

#### ```gulp build [--prod]```

O comando é idêntico ao ```gulp [--prod]```, porém ele não irá abrir o navegador.

#### ```gulp styles|scripts [--prod]```

Seu CSS e JS vão possuir sourcemaps, porém apenas com o argumento ```--prod]``` eles serão minificados e gzipados.

#### ```gulp images```

Redimensiona imagens e as otimiza para que elas sejam servidas de forma responsiva.

#### ```gulp html --prod```

Redimensiona imagens e otimiza para que elas sejam servidas de forma responsiva.

#### ```gulp serve```

Serve apenas para acompanhar o seu site no navegador.

#### ```gulp clean```

Deleta os seus arquivos do assets no ```.tmp``` assim como no ```dist```, também deleta todos os arquivos gzipados. **Nota:** Não deleta as suas imagens do ```.tmp``` para que o tempo da build não aumente devido as otimizações de imagem.

#### ```gulp critical```

Extrai o CSS crítico dos layouts ```home```, ```page```, ```post``` e ```404```, para que ele seja incluído no layout via ```{% include %}``` **Nota:** Deve-se rodar o gulp build antes de rodar o critical, pois o critical utiliza os arquivos HTML gerados para criar o CSS.

## 5. Códigos auxiliares

### Picture

Recomendado para qualquer imagem.

```{% picture "url para imagem", "alt", "class para picture", "classe para img" %}```

### PictureCard

Recomendado para imagens dos cards da home.

```{% picture-card "url para imagem", "alt", "class para picture", "classe para img" %}```

### PictureHero

Recomendado para imagens de banner, ela **não** utiliza o lazysizes.

```{% picture-hero "url para imagem", "alt", "class para picture", "classe para img" %}```

**Nota:** A biblioteca [Lazysizes](https://github.com/aFarkas/lazysizes) é utilizada para carregamento lento das images, porém em caso do Javascript não estar disponível o navegador utilizará as imagens geradas para a tag noscript.

## Licença

### Código Fonte Subjacente

[GNU General Public License v3.0](https://github.com/adilsonfsantos/Portfolio-11ty/blob/master/LICENSE.md)

© Adilson Santos e adilsonsantos.netlify.com. O uso não autorizado e/ou duplicação e adaptação deste material (todos os formatos de imagem, texto e arquivos de mídia adicionais) sem permissão expressa e escrita do autor e/ou proprietário deste site é estritamente proibido. Trechos e links podem ser usados, desde que seja dado crédito completo e claro a Adilson Santos e adilsonsantos.netlify.com com a indicação apropriada e específica do conteúdo original.
