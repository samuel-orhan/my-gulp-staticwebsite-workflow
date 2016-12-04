# But du WorkFlow Gulp

Ce Workflow Gulp se destine à la produire tout site HTML / CSS / Javascript et les Assets.
Il n'accompagne pas l'utilisation de process serveur. Les tâches dédiés concernent :

* La partie HTML
  - Le contrôle des règle avec le linting HTML
  - L'injection et la réécriture des URL pour eviter tout effet dûe à une structure de document par dossiers
  - L'utilisation des facilités apportés par les moteurs de templates de type mustache
  - La minification des sources HTML

* La partie CSS
  - Le contrôle des règles CSS avec un linting Sass
  - L'utilisation du pré-processeur Sass
  - L'optimisation CSS avec une compilation PostCss ciblant le meilleur panel de navigateurs
  - L'assemblage et la minification des fichiers CSS
  
* La partie Javascript
  - Le contrôle des règles avec le linting Js
  - L'assemblage et la mninification au sein d'un fichier unique JS 

* La partie Assets :
  - Optimisation de la compression des images (Gif, Png, Jpeg et SVG)
  - Génération des différents formats 'responsive' sur la base d'un redimenssionnement homothétique

* La partie optimisation globales
  - Génération des fichiers de sitemap, robots et manifest
  - Création des favicons
  - Gzippage optimisé
  - Copie de tous les fichiers non gérés par le Workflow

* En dernier lieu, l'envoi par ftp du résultat sur le serveur cible (prod où dev)

# Initialisation du Workflow

Après avoir récupéreé la dernière version, utilisez la commande suivante pour installer l'ensemble des modules
nécessaires au fonctionnement du Workflow de production

```
D:\PHPSTORM\avocats-mba.fr > npm install
```

# Utilisation su Workflow

Ce Workflow, pour fonctionner correctement, respecte les règles suivantes.

## Structure des dossiers ?

Le dossier du projet doit être, à minima, composé de la structure de dossier suivante :

```
/                       Dossier de votre projet
/nodes_modules/         Module installé par node (utilie au fonctionnement de Gulp et de ses modules)
/src/                   Dossier contenant tous les fichiers composant votre site
/gulpfile.js            Fichier Gulp obligatoire (il décrit le workflow gulp, à modifier avec précaution)
/.gitignore             Fichier git de controle du versinning
```

# Listes des modules utilisable pour ce workflow Gulp

## Modules d'aide

Depuis la source du dépots [gulp-plugin](http://gulpjs.com/plugins/).

* [gulp-foreach](https://www.npmjs.com/package/gulp-foreach/) : Compiler un flux au sein d'un second flux
* [gilp-if](https://www.npmjs.com/package/gulp-if/) : Un connecteur au sein des flux
* [gulp-prompt](https://www.npmjs.com/package/gulp-prompt/) : Affiche des sortie console
* [gulp-clone](https://www.npmjs.com/package/gulp-clone/) : Clone un flux en mémoire pour une utilisation 
sur des traitements successifs
* [gulp-convert](https://www.npmjs.com/package/gulp-convert/) : Convertis des fichiers d'un format 
à un autre (json, csv, yaml, etc.)

## Modules d'injection

* [gulp-inject](https://www.npmjs.com/package/gulp-inject/) : Injection de code dans les flux
* [gulp-regex-replace](https://www.npmjs.com/package/gulp-regex-replace/) : Recherche remplacer par 
expressions régulières dans un flux

## Modules de templating

* Nunjunk :git 
  - [gulp-nunjucks-render](https://www.npmjs.com/package/gulp-nunjucks-render/) : Système de templating complet
  - [gulp-data](https://www.npmjs.com/package/gulp-data/) : Aide pour créer es data à utiliser dans nunjunk
  - [nunjunk](http://mozilla.github.io/nunjucks/templating.html) : Documentation pour NunJunk

## Modules pour la production des CSS

* [gulp-postcss](https://www.npmjs.com/package/gulp-postcss/) : Prefix navigateurs, minification, mapping, etc.
  - [post-scss](https://www.npmjs.com/package/postcss-scss) : Pour la compilation de sources Sass
  - [autoprefixer](https://www.npmjs.com/package/autoprefixer) : Ajoute les prefix navigateurs
  - [cssnano](https://www.npmjs.com/package/cssnano) : Minification dans PostCss
  - [browserify](https://www.npmjs.com/package/browserify-postcss) : Compatibilité des CSS

## Modules pour la production des JS

* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify/) : Minification des fichiers js

## Modules de contrôle et de linting

* HTML
  - [gulp-htmllint](https://www.npmjs.com/package/gulp-htmllint/)
* CSS
  - [gulp-scss-lint](https://www.npmjs.com/package/gulp-scss-lint/) : Linter Sass
  - [gulp-csslint](https://www.npmjs.com/package/gulp-csslint/) : Linter CSS en dehors de Sass
  
* JS
  - [gulp-jslint](https://www.npmjs.com/package/gulp-jslint/) : Linter JS

## Modules d'optimisation

* Gzip des fichiers
  - [gulp-zopfli](https://www.npmjs.com/package/gulp-zopfli/) : Compression gzip des fichiers
  - [gulp-gzip](https://www.npmjs.com/package/gulp-gzip/) : Module de compression gzip alternatif
* Fichiers médias
  - [gulp-responsive](https://www.npmjs.com/package/gulp-responsive/) : Génération d'images responsives
  - [gulp-css-url-extract](https://www.npmjs.com/package/gulp-css-url-extract/) : Récupération des images utilisés
dans la CSS
  - [gulp-svgmin](https://www.npmjs.com/package/gulp-svgmin/) : Optimisation des fichiers SVG

## Modules de génération

* [gulp-manifest](https://www.npmjs.com/package/gulp-manifest/) : Création de manifest HTML5
* [gulp-favicons](https://www.npmjs.com/package/gulp-favicons/) : Permet de créer l'ensemble des favicons optimisés
selon chaque browser à partir d'une images de base
* [gulp-newer](https://www.npmjs.com/package/gulp-newer/) : Filtre les process sur les nouveaux fichier uniquement
* [gulp-sitemap](https://www.npmjs.com/package/gulp-sitemap/) : Générer des sitemap à partir des flux
* [gulp-sitemap-file](https://www.npmjs.com/package/gulp-sitemap-files/) : Lire des sitemap
(pour créer des redirections 301 par exemple)
* [robots-generator](https://www.npmjs.com/package/robots-generator/) : Créer des fichiers robots.txt facilement

## Modules pour le déploiement

* Publication des nouveaux contenus
  - [gulp-ftp](https://www.npmjs.com/package/gulp-ftp/) : Envoi des fichiers vers un serveur ftp
  - [gulp-sftp](https://www.npmjs.com/package/gulp-sftp/) : Alternative pour serveur sftp
  - [gulp-docker-dest](https://www.npmjs.com/package/gulp-docker-dest/) : Alternative pour déployer dans un container Docker
  