import Skeleton from './Skeleton';

/**
 * @param header - name of the column header
 * @param data - array of data to display. Make sure the object key matches the header
 */
interface IProps {
  header: string[];
  data: any[];
  loading: boolean;
}

export default function Table({ header, data, loading }: IProps) {
  return (
    <>
      <div className='overflow-x-auto'>
        <div className='w-full inline-block align-middle'>
          <div className='overflow-x-auto border rounded-sm'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-800'>
                <tr>
                  {header.map((value) => (
                    <th
                      key={value}
                      scope='col'
                      className='px-6 py-3 text-xs font-bold text-left text-white uppercase'
                    >
                      {value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {/* If no result display no records found message */}
                {data.length === 0 && (
                  <tr>
                    <td className='text-center p-4' colSpan={header.length}>
                      <h2 className='text-lg text-blue-500 font-semibold'>No records found.</h2>
                    </td>
                  </tr>
                )}

                {/* If loading show skeleton component on all fields */}
                {loading
                  ? Array.from(Array(10)).map(() => {
                      return (
                        <tr>
                          {header.map((value) => (
                            <td
                              key={value}
                              className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'
                            >
                              <Skeleton />
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  : data.map((val) => {
                      return (
                        <tr key={val.id}>
                          {header.map((head) => {
                            return (
                              <td
                                key={`${val.id}-${head}`}
                                className='px-6 py-4 text-sm text-black whitespace-nowrap'
                              >
                                {val[head]}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
