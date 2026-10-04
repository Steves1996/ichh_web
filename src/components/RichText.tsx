import React from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

// Textes saisis dans l'admin en markdown : gras, italique, souligné (<u>), listes.
// Le HTML brut est interprété puis nettoyé ; seul <u> est ajouté au schéma par défaut.
const schema = { ...defaultSchema, tagNames: [...(defaultSchema.tagNames ?? []), 'u'] };

interface RichTextProps {
  children?: string;
  className?: string;
}

export function RichText({ children, className }: RichTextProps) {
  if (!children) return null;
  return (
    <div className={`[&>*+*]:mt-3 ${className ?? ''}`}>
      <Markdown
        rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
        components={{
          strong: (props) => <strong className="font-semibold" {...props} />,
          ul: (props) => <ul className="list-disc space-y-1 pl-5" {...props} />,
          ol: (props) => <ol className="list-decimal space-y-1 pl-5" {...props} />,
          a: (props) => <a className="underline hover:text-ember" target="_blank" rel="noreferrer" {...props} />
        }}>
        {children}
      </Markdown>
    </div>);

}
