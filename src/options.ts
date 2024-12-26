interface CodeViewerOptions {
  readonly syntaxTheme?: string;
}

const syntaxThemeSelect = document.querySelector('#syntax-theme') as HTMLSelectElement;

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const saveOptions = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const syntaxTheme = syntaxThemeSelect.value;
  await browser.storage.sync.set({ syntaxTheme } satisfies CodeViewerOptions);
};

const restoreOptions = async (): Promise<void> => {
  const { syntaxTheme = 'default' } = await browser.storage.sync.get('syntaxTheme') as CodeViewerOptions;
  syntaxThemeSelect.value = syntaxTheme;
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
  await restoreOptions();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  (document.querySelector('#settings') as HTMLFormElement).addEventListener('submit', saveOptions);
});

// eslint-disable-next-line import/prefer-default-export
export type { CodeViewerOptions };
