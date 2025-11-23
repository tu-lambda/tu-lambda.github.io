# [Tü.λ Functional Programming Night Tübingen](https://tu-lambda.github.io)

The main website of the Tü.λ meetup Tübingen.
Written in [Racket](https://racket-lang.org) and [Pollen](https://pollenpub.com), built with [Nix](https://nixos.org), hosted on GitHub Pages.

In case you're looking for a place to contribute a talk/lightning talk, take a look here: https://github.com/tu-lambda/planning/issues/new

## Development

### 1) Nix

The easiest way to get started with local development is to [use Nix](https://zero-to-nix.com/start/install):

1. Install Nix
```shell
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
```
2. Fork this repo, and then `git clone` your fork
3. Run the development server:
```shell
cd functional-coders.github.io
nix run
```
4. edit files, reload the browser window, see the changes

### 2) 'Normal' install

1. Download & Install [Racket](https://racket-lang.org): [download.racket-lang.org](https://download.racket-lang.org)
2. Install [Pollen](https://pollenpub.com):
```shell
raco pkg install --auto --skip-installed pollen racket-langserver string-interpolation
```
3. Fork this repo.
4. Start Pollens' project server from the project root:
```shell
raco pollen start
```
5. edit some file; reload your browser window; see the change.
