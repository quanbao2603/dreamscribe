# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.openssl
    # Giữ lại prisma-engines vì Prisma Client cần nó để chạy
    pkgs.prisma-engines 
  ];
  
  # Sets environment variables in the workspace
  env = {
    PRISMA_CLI_QUERY_ENGINE_TYPE = "binary";
    PRISMA_CLIENT_ENGINE_TYPE = "binary";
    # KHÔNG NÊN đặt DATABASE_URL ở đây.
    # Hãy để DATABASE_URL trong file .env của bạn để bảo mật.
  };
  
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
    ];
    
    # Enable previews (Giữ nguyên cấu hình Port bạn đã làm trước đó)
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "--prefix" "frontend" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
        backend = {
          command = ["npm" "--prefix" "backend" "run" "dev" "--" "--port" "8080" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
    
    # Workspace lifecycle hooks
    workspace = {
      onCreate = {
        default.openFiles = [ ".idx/dev.nix" "README.md" ];
      };
      onStart = {
      };
    };
  };
}