// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const saveOptions = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const syntaxTheme = (document.querySelector('#syntax-theme') as HTMLSelectElement).value;
  await browser.storage.sync.set({ syntaxTheme });
};

const restoreOptions = async (): Promise<void> => {
  const { syntaxTheme = 'default' } = await browser.storage.sync.get('syntaxTheme') as { readonly syntaxTheme?: string };
  (document.querySelector('#syntax-theme') as HTMLSelectElement).value = syntaxTheme;
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
  await restoreOptions();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  (document.querySelector('#settings') as HTMLFormElement).addEventListener('submit', saveOptions);
});
