import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RichText } from '../../src/components/common/RichText';

describe('RichText', () => {
  it('renders paragraphs, inline code, bold and fenced code blocks', () => {
    const { container } = render(
      <RichText text={'Run `kubectl get pods` to **list** pods.\n\nSecond line.\n\n```yaml\nkind: Pod\n```'} />,
    );
    expect(container.querySelectorAll('p')).toHaveLength(2);
    expect(screen.getByText('kubectl get pods').tagName).toBe('CODE');
    expect(screen.getByText('list').tagName).toBe('STRONG');
    expect(container.querySelector('pre')).toHaveTextContent('kind: Pod');
  });
});
