import { ReactElement } from 'react';

interface IProps {
  metricCards: ReactElement[];
}

export default function MetricContainer({ metricCards }: IProps) {
  const cardsLength = metricCards.length.toString();
  const containerClassName = `py-3 w-full overflow-hidden lg:my-2 lg:px-2 lg:w-1/${cardsLength} xl:w-1/${cardsLength}`;

  return (
    <div className='flex -mx-2 overflow-hidden'>
      {metricCards.map((card, idx) => {
        return (
          <div key={idx.toString()} className={containerClassName}>
            {card}
          </div>
        );
      })}
    </div>
  );
}
