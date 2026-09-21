import { isCategoryId } from './categories';
import type { Difficulty, Question, QuestionOption } from './types';

export class QuestionParseError extends Error {
  readonly filePath: string;
  readonly detail: string;

  constructor(filePath: string, detail: string) {
    super(`${filePath}: ${detail}`);
    this.name = 'QuestionParseError';
    this.filePath = filePath;
    this.detail = detail;
  }
}

const HEADING_QUESTION = 'question';
const HEADING_OPTIONS = 'options';
const HEADING_EXPLANATION = 'explanation';
const HEADING_EXPLANATION_PT = 'explicacao para crianca';

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];
const SLUG = /^[a-z0-9][a-z0-9-]*$/;
const MIN_OPTIONS = 3;
const MAX_OPTIONS = 5;

/** Lower-case, accent-stripped, whitespace-collapsed heading text. */
export function normalizeHeading(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

interface Section {
  heading: string;
  content: string;
}

function fail(filePath: string, detail: string): never {
  throw new QuestionParseError(filePath, detail);
}

function parseFrontmatter(
  text: string,
  filePath: string,
): { fields: Record<string, string>; body: string } {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') {
    fail(filePath, 'missing or unterminated frontmatter');
  }
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (end === -1) {
    fail(filePath, 'missing or unterminated frontmatter');
  }
  const fields: Record<string, string> = {};
  for (const line of lines.slice(1, end)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const separator = line.indexOf(':');
    if (separator === -1) {
      fail(filePath, `invalid frontmatter line "${line.trim()}"`);
    }
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    // Strip trailing "# comment" on a value line.
    value = value.replace(/\s+#.*$/, '').trim();
    fields[key] = value;
  }
  return { fields, body: lines.slice(end + 1).join('\n') };
}

function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .replace(/^\[/, '')
    .replace(/\]$/, '')
    .split(',')
    .map((tag) => tag.trim().replace(/^["']|["']$/g, ''))
    .filter((tag) => tag.length > 0);
}

function splitSections(body: string): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;
  let inFence = false;
  for (const line of body.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
    }
    const match = !inFence ? /^(#{1,2})\s+(.+?)\s*$/.exec(line) : null;
    if (match) {
      current = { heading: normalizeHeading(match[2]), content: '' };
      sections.push(current);
    } else if (current) {
      current.content += `${line}\n`;
    }
  }
  return sections.map((section) => ({ ...section, content: section.content.trim() }));
}

function requireSection(sections: Section[], heading: string, label: string, filePath: string): string {
  const section = sections.find((s) => s.heading === heading);
  if (!section) {
    fail(filePath, `missing section "${label}"`);
  }
  if (!section.content) {
    fail(filePath, `section "${label}" is empty`);
  }
  return section.content;
}

function parseOptions(content: string, filePath: string): QuestionOption[] {
  const options: QuestionOption[] = [];
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;
    const match = /^[-*]\s+\[( |x|X)\]\s+(.+)$/.exec(line);
    if (!match) {
      fail(filePath, `invalid option line "${line}"`);
    }
    options.push({ text: match[2].trim(), correct: match[1].toLowerCase() === 'x' });
  }
  if (options.length < MIN_OPTIONS || options.length > MAX_OPTIONS) {
    fail(filePath, `expected ${MIN_OPTIONS}-${MAX_OPTIONS} options, found ${options.length}`);
  }
  const correctCount = options.filter((o) => o.correct).length;
  if (correctCount !== 1) {
    fail(filePath, `expected exactly 1 correct option, found ${correctCount}`);
  }
  return options;
}

/** Extract `<category>/<topic>` folders from a bank file path, if it has that shape. */
export function folderPartsOf(filePath: string): { category: string; topic: string } | null {
  const match = /questions\/([^/]+)\/([^/]+)\/[^/]+\.md$/.exec(filePath.replace(/\\/g, '/'));
  return match ? { category: match[1], topic: match[2] } : null;
}

/**
 * Parse one question Markdown file. Throws QuestionParseError with a
 * contributor-friendly message on the first violation found.
 */
export function parseQuestion(markdown: string, filePath: string): Question {
  const { fields, body } = parseFrontmatter(markdown, filePath);

  for (const key of ['id', 'category', 'topic'] as const) {
    if (!fields[key]) {
      fail(filePath, `frontmatter field "${key}" is required`);
    }
  }
  const id = fields.id;
  if (!SLUG.test(id)) {
    fail(filePath, `frontmatter field "id" has invalid value "${id}"`);
  }
  const category = fields.category;
  if (!isCategoryId(category)) {
    fail(filePath, `category "${category}" is not declared in src/domain/categories.ts`);
  }
  const topic = fields.topic;
  if (!SLUG.test(topic)) {
    fail(filePath, `frontmatter field "topic" has invalid value "${topic}"`);
  }
  const difficultyRaw = fields.difficulty || 'medium';
  if (!DIFFICULTIES.includes(difficultyRaw as Difficulty)) {
    fail(filePath, `frontmatter field "difficulty" has invalid value "${difficultyRaw}"`);
  }

  const sections = splitSections(body);
  const prompt = requireSection(sections, HEADING_QUESTION, 'Question', filePath);
  const optionsContent = requireSection(sections, HEADING_OPTIONS, 'Options', filePath);
  const explanationEn = requireSection(sections, HEADING_EXPLANATION, 'Explanation', filePath);
  const explanationPt = requireSection(
    sections,
    HEADING_EXPLANATION_PT,
    'Explicação para criança',
    filePath,
  );
  const options = parseOptions(optionsContent, filePath);

  const folders = folderPartsOf(filePath);
  if (folders) {
    if (folders.category !== category) {
      fail(filePath, `category "${category}" does not match folder "${folders.category}"`);
    }
    if (folders.topic !== topic) {
      fail(filePath, `topic "${topic}" does not match folder "${folders.topic}"`);
    }
  }

  return {
    id,
    category,
    topic,
    difficulty: difficultyRaw as Difficulty,
    tags: parseTags(fields.tags),
    source: fields.source || undefined,
    prompt,
    options,
    explanationEn,
    explanationPt,
    filePath,
  };
}
