import { Table } from 'react-bootstrap';
import { orderedCategories } from '../../domain/categories';
import { percentage } from '../../domain/scoring';
import type { Attempt } from '../../domain/types';
import { topicLabel } from '../../utils/format';

interface Props {
  attempt: Attempt;
}

export function BreakdownTable({ attempt }: Props) {
  const rows = orderedCategories().filter((category) => attempt.perCategory[category.id]);
  return (
    <Table size="sm" responsive className="align-middle" data-testid="breakdown-table">
      <thead>
        <tr>
          <th>Domain / topic</th>
          <th className="text-end">Correct</th>
          <th className="text-end">Accuracy</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((category) => {
          const tally = attempt.perCategory[category.id]!;
          const topics = Object.entries(attempt.perTopic)
            .filter(([key]) => key.startsWith(`${category.id}/`))
            .sort(([a], [b]) => a.localeCompare(b));
          return [
            <tr key={category.id} className="table-light">
              <th>{category.name}</th>
              <td className="text-end">
                {tally.correct} / {tally.total}
              </td>
              <td className="text-end">{percentage(tally.correct, tally.total)}%</td>
            </tr>,
            ...topics.map(([key, topicTally]) => (
              <tr key={key}>
                <td className="ps-4 text-muted">{topicLabel(key.split('/')[1])}</td>
                <td className="text-end">
                  {topicTally.correct} / {topicTally.total}
                </td>
                <td className="text-end">{percentage(topicTally.correct, topicTally.total)}%</td>
              </tr>
            )),
          ];
        })}
      </tbody>
    </Table>
  );
}
