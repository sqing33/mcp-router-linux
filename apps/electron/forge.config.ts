import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";
import { MakerDMG } from "@electron-forge/maker-dmg";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const parseBool = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value == null) return defaultValue;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
  return defaultValue;
};

const isMac = process.platform === "darwin";
const hasSignIdentity = !!process.env.PUBLIC_IDENTIFIER;
const hasNotarizeCreds = !!(
  process.env.APPLE_API_KEY &&
  process.env.APPLE_API_KEY_ID &&
  process.env.APPLE_API_ISSUER
);
const disableChecksumValidation = parseBool(
  process.env.FORGE_DISABLE_CHECKSUMS,
  false,
);

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: "./public/images/icon/icon",
    // Support both Intel and Apple Silicon architectures - use target arch from env
    arch: (process.env.npm_config_target_arch as any) || process.arch,
    download: disableChecksumValidation
      ? {
          unsafelyDisableChecksums: true,
        }
      : undefined,
    // Only sign/notarize on macOS when credentials are available (CI-safe)
    osxSign: isMac && hasSignIdentity
      ? {
          identity: process.env.PUBLIC_IDENTIFIER,
        }
      : undefined,
    osxNotarize: isMac && hasNotarizeCreds
      ? {
          appleApiKey: process.env.APPLE_API_KEY || "",
          appleApiKeyId: process.env.APPLE_API_KEY_ID || "",
          appleApiIssuer: process.env.APPLE_API_ISSUER || "",
        }
      : undefined,
  },
  rebuildConfig: {
    // Force rebuild native modules for the target architecture
    arch: (process.env.npm_config_target_arch as any) || process.arch,
  },
  makers: [
    new MakerSquirrel({
      name: "MCP-Router",
      authors: "fjm2u",
      description:
        "Effortlessly manage your MCP servers with the MCP Router. MCP Router provides a user-friendly interface for managing MCP servers, making it easier than ever to work with the MCP.",
      setupIcon: "./public/images/icon/icon.ico",
    }),
    new MakerDMG(
      {
        name: "MCP-Router",
        format: "ULFO",
        icon: "./public/images/icon/icon.icns",
      },
      ["darwin"],
    ),
    new MakerDeb(
      {
        options: {
          name: "mcp-router",
          productName: "MCP Router",
          maintainer: "fjm2u <fm.job@icloud.com>",
          homepage: "https://github.com/mcp-router/mcp-router",
          description: "A Unified MCP Server Management App",
          bin: "MCP Router",
          icon: "./public/images/icon/icon.png",
          categories: ["Utility", "Development"],
        },
      },
      ["linux"],
    ),
    new MakerZIP(),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.tsx",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        authToken: process.env.GITHUB_TOKEN,
        repository: {
          owner: "mcp-router",
          name: "mcp-router",
        },
        prerelease: parseBool(process.env.FORGE_PRERELEASE, true),
        draft: parseBool(process.env.FORGE_DRAFT, true),
      },
    },
  ],
};

export default config;
