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

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-void
  void restoreOptions();
});

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
(document.querySelector('#settings') as HTMLFormElement).addEventListener('submit', e => {
  // eslint-disable-next-line no-void
  void saveOptions(e);
});

// eslint-disable-next-line import/prefer-default-export
export type { CodeViewerOptions };
