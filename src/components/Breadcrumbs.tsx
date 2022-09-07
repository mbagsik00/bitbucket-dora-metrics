interface IProps {
  history: {
    name: string;
    href?: string;
  }[];
}

export default function Breadcrumbs({ history }: IProps) {
  return (
    <nav className='w-full mb-2 text-sm'>
      <ol className='list-reset flex'>
        {history.map((data, idx) => {
          if (idx === history.length - 1) {
            return (
              <li key={idx.toString()} className='text-gray-500'>
                {data.name}
              </li>
            );
          }

          return (
            <li key={idx.toString()}>
              <a href={data.href} className='text-blue-500 hover:text-blue-700'>
                {data.name}
              </a>

              <span className='text-gray-500 mx-2'>/</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
