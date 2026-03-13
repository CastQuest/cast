import { describe, it, expect } from 'vitest';
import { cn } from '../../lib/utils';

describe('cn() utility', () => {
  it('combines class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'active', false && 'inactive')).toBe('base active');
  });

  it('deduplicates Tailwind classes', () => {
    const result = cn('text-sm text-lg');
    expect(result).toBe('text-lg');
  });

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('handles object syntax', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });
});
