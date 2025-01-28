
declare module '@next/eslint-plugin-next' {
  import type { ESLint, Linter } from 'eslint';
  
  type RuleLevel = Linter.RuleLevel;
  type RuleLevelAndOptions = Linter.RuleLevelAndOptions;
  type RuleEntry = RuleLevel | RuleLevelAndOptions;

  interface Rules {
    'google-font-display': Linter.RuleModule;
    'google-font-preconnect': Linter.RuleModule;
    'inline-script-id': Linter.RuleModule;
    'next-script-for-ga': Linter.RuleModule;
    'no-assign-module-variable': Linter.RuleModule;
    'no-async-client-component': Linter.RuleModule;
    'no-before-interactive-script-outside-document': Linter.RuleModule;
    'no-css-tags': Linter.RuleModule;
    'no-document-import-in-page': Linter.RuleModule;
    'no-duplicate-head': Linter.RuleModule;
    'no-head-element': Linter.RuleModule;
    'no-head-import-in-document': Linter.RuleModule;
    'no-html-link-for-pages': Linter.RuleModule;
    'no-img-element': Linter.RuleModule;
    'no-page-custom-font': Linter.RuleModule;
    'no-script-component-in-head': Linter.RuleModule;
    'no-styled-jsx-in-document': Linter.RuleModule;
    'no-sync-scripts': Linter.RuleModule;
    'no-title-in-document-head': Linter.RuleModule;
    'no-typos': Linter.RuleModule;
    'no-unwanted-polyfillio': Linter.RuleModule;
  }

  interface RecommendedConfig extends Linter.Config {
    plugins: ['@next/next'];
    rules: {
      '@next/next/google-font-display': RuleEntry;
      '@next/next/google-font-preconnect': RuleEntry;
      '@next/next/next-script-for-ga': RuleEntry;
      '@next/next/no-async-client-component': RuleEntry;
      '@next/next/no-before-interactive-script-outside-document': RuleEntry;
      '@next/next/no-css-tags': RuleEntry;
      '@next/next/no-head-element': RuleEntry;
      '@next/next/no-html-link-for-pages': RuleEntry;
      '@next/next/no-img-element': RuleEntry;
      '@next/next/no-page-custom-font': RuleEntry;
      '@next/next/no-styled-jsx-in-document': RuleEntry;
      '@next/next/no-sync-scripts': RuleEntry;
      '@next/next/no-title-in-document-head': RuleEntry;
      '@next/next/no-typos': RuleEntry;
      '@next/next/no-unwanted-polyfillio': RuleEntry;
      '@next/next/inline-script-id': RuleEntry;
      '@next/next/no-assign-module-variable': RuleEntry;
      '@next/next/no-document-import-in-page': RuleEntry;
      '@next/next/no-duplicate-head': RuleEntry;
      '@next/next/no-head-import-in-document': RuleEntry;
      '@next/next/no-script-component-in-head': RuleEntry;
    };
  }

  interface CoreWebVitalsConfig extends Linter.Config {
    plugins: ['@next/next'];
    extends: ['plugin:@next/next/recommended'];
    rules: {
      '@next/next/no-html-link-for-pages': RuleEntry;
      '@next/next/no-sync-scripts': RuleEntry;
    };
  }

  interface Configs {
    recommended: RecommendedConfig;
    'core-web-vitals': CoreWebVitalsConfig;
  }

  const plugin: ESLint.Plugin & {
    rules: Rules;
    configs: Configs;
  };

  export = plugin;
}
