import { Fragment, type ReactNode } from 'react';

interface Block {
  type: 'code' | 'paragraph';
  text: string;
}

function toBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  const lines = text.split('\n');
  let paragraph: string[] = [];
  let code: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
      paragraph = [];
    }
  };

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      if (code === null) {
        flushParagraph();
        code = [];
      } else {
        blocks.push({ type: 'code', text: code.join('\n') });
        code = null;
      }
      continue;
    }
    if (code !== null) {
      code.push(line);
    } else if (line.trim() === '') {
      flushParagraph();
    } else {
      paragraph.push(line.trim());
    }
  }
  if (code !== null) blocks.push({ type: 'code', text: code.join('\n') });
  flushParagraph();
  return blocks;
}

function renderInline(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 3) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

interface Props {
  text: string;
  className?: string;
}

/** Minimal renderer for the subset of Markdown used in question files. */
export function RichText({ text, className }: Props) {
  const blocks = toBlocks(text);
  return (
    <div className={className}>
      {blocks.map((block, index) =>
        block.type === 'code' ? (
          <pre key={index} className="bg-light border rounded p-2 small mb-2">
            <code>{block.text}</code>
          </pre>
        ) : (
          <p key={index} className="mb-2">
            {renderInline(block.text)}
          </p>
        ),
      )}
    </div>
  );
}
