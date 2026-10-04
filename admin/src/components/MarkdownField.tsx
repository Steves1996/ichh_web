import MDEditor, { commands, executeCommand, selectWord, type ICommand } from '@uiw/react-md-editor/nohighlight';

// Le markdown n'a pas de syntaxe pour le souligné : on insère la balise HTML <u>,
// que le site vitrine autorise explicitement au rendu.
const underline: ICommand = {
  name: 'underline',
  keyCommand: 'underline',
  shortcuts: 'ctrlcmd+u',
  prefix: '<u>',
  suffix: '</u>',
  buttonProps: { 'aria-label': 'Souligner (Ctrl + U)', title: 'Souligner (Ctrl + U)' },
  icon: <span style={{ textDecoration: 'underline', fontWeight: 600, fontSize: 13, lineHeight: '12px' }}>U</span>,
  execute: (state, api) => {
    const range = selectWord({ text: state.text, selection: state.selection, prefix: '<u>', suffix: '</u>' });
    const state1 = api.setSelectionRange(range);
    executeCommand({ api, selectedText: state1.selectedText, selection: state.selection, prefix: '<u>', suffix: '</u>' });
  },
};

const withTitle = (cmd: ICommand, title: string): ICommand => ({
  ...cmd,
  buttonProps: { ...cmd.buttonProps, 'aria-label': title, title },
});

const TOOLBAR: ICommand[] = [
  withTitle(commands.bold, 'Gras (Ctrl + B)'),
  withTitle(commands.italic, 'Italique (Ctrl + I)'),
  underline,
  commands.divider,
  withTitle(commands.unorderedListCommand, 'Liste à puces'),
  withTitle(commands.orderedListCommand, 'Liste numérotée'),
];

const EXTRA: ICommand[] = [
  withTitle(commands.codeEdit, 'Édition seule'),
  withTitle(commands.codeLive, 'Édition + aperçu'),
  withTitle(commands.codePreview, 'Aperçu seul'),
];

interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownField({ id, value, onChange }: Props) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? '')}
        commands={TOOLBAR}
        extraCommands={EXTRA}
        preview="edit"
        height={220}
        textareaProps={{ id }}
      />
    </div>
  );
}
