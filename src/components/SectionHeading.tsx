import React from 'react';

interface SectionHeadingProps {
  title: string;
  lead?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  action?: React.ReactNode;
}

export function SectionHeading({
  title,
  lead,
  tone = 'dark',
  align = 'left',
  as: Tag = 'h2',
  action
}: SectionHeadingProps) {
  const titleColor = tone === 'light' ? 'text-white' : 'text-ink';
  const leadColor = tone === 'light' ? 'text-white/70' : 'text-ink-muted';

  return (
    <div
      className={`flex flex-col gap-5 ${
      action ? 'md:flex-row md:items-end md:justify-between' : ''} ${
      align === 'center' ? 'items-center text-center' : ''}`}>
      
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        <Tag className={`font-display text-3xl sm:text-4xl leading-[1.1] ${titleColor}`}>{title}</Tag>
        {lead && <p className={`mt-3 text-base leading-relaxed ${leadColor}`}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>);

}