import { Alert } from 'react-bootstrap';
import { RichText } from '../common/RichText';

interface Props {
  explanationEn: string;
  explanationPt: string;
}

/** Always shows both explanations: technical English and simple Portuguese. */
export function ExplanationPanel({ explanationEn, explanationPt }: Props) {
  return (
    <div className="explanation-panel mt-3" data-testid="explanation-panel">
      <Alert variant="info" className="mb-2">
        <Alert.Heading as="h6">Explanation</Alert.Heading>
        <RichText text={explanationEn} />
      </Alert>
      <Alert variant="success" className="mb-0">
        <Alert.Heading as="h6">Explicação para criança</Alert.Heading>
        <RichText text={explanationPt} />
      </Alert>
    </div>
  );
}
