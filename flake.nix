{
  description = "A project with a devshell.";

  inputs = {
    nixpkgs.url = "https://flakehub.com/f/DeterminateSystems/nixpkgs-weekly/*.tar.gz";
    devshell.url = "github:numtide/devshell";
    devshell.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        inputs.devshell.flakeModule
        # To import a flake module
        # 1. Add foo to inputs
        # 2. Add foo as a parameter to the outputs function
        # 3. Add here: foo.flakeModule

      ];
      systems = [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" "x86_64-darwin" ];
      perSystem = { config, self', inputs', pkgs, system, ... }: {
        # Per-system attributes can be defined here. The self' and inputs'
        # module parameters provide easy access to attributes of the same
        # system.

        # Equivalent to  inputs'.nixpkgs.legacyPackages.hello;
        apps.default = {
          type = "app";
          program = "${pkgs.lib.getExe self'.packages.rps}";
        };
        packages = {
          rps = pkgs.writeShellScriptBin "rps" ''
            ${pkgs.racket}/bin/raco pkg install --auto --skip-installed pollen string-interpolation && ${pkgs.racket}/bin/raco pollen start
          '';
          default = pkgs.stdenv.mkDerivation {
            name = "tu-lambda.github.io";
            src = ./.;

            nativeBuildInputs = [ pkgs.cacert ];
            buildInputs = [ pkgs.racket ];
            buildPhase = ''
              export HOME=$(pwd)
              raco pkg install --auto --skip-installed pollen string-interpolation
              raco pollen render
            '';
            installPhase = ''
              mkdir $out
              cp -r assets *.html *.css *.js $out
            '';
            outputHashAlgo = "sha256";
            outputHashMode = "recursive";
            outputHash = "sha256-u5VXC0agH7TKL73DR7RX3+ukq1dTBt7EaJuqXtx43Ek="; # pkgs.lib.fakeHash;
          };
        };
        devshells.default = {
          packages = [
            pkgs.racket
          ];
          devshell.startup = {
            install-langserver.text = ''raco pkg install --auto --skip-installed racket-langserver'';
            install-web.text = ''raco pkg install --auto --skip-installed pollen string-interpolation'';
          };
        };
      };
      flake = {
        # The usual flake attributes can be defined here, including system-
        # agnostic ones like nixosModule and system-enumerating ones, although
        # those are more easily expressed in perSystem.
      };
    };
}
