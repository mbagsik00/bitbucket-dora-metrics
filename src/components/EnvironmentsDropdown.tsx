import { Listbox } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

export default function EnvironmentsDropdown({
  environmentList,
  environment,
  setSelectedEnvironment
}: any) {
  return (
    environmentList &&
    environment && (
      <>
        <Listbox
          value={environment.name}
          onChange={(envName: string) => {
            const env = environmentList.find((e: any) => e.name === envName);
            setSelectedEnvironment(env);
          }}
        >
          <Listbox.Button className='hover:cursor-pointer min-w-lg relative w-full cursor-default rounded-sm border border-gray-300 bg-white py-1 pl-3 pr-10 text-left sm:text-sm hover:bg-gray-100'>
            {environment.name}
            <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
              <FaChevronDown className='h-3 w-3 text-black' aria-hidden='true' />
            </span>
          </Listbox.Button>
          <Listbox.Options className='absolute z-10 mt-1 max-h-56 max-w-f overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {environmentList?.map((e: any) => (
              <Listbox.Option
                key={e.uuid}
                value={e.name}
                className={
                  'text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100'
                }
                onClick={() => setSelectedEnvironment(e)}
              >
                {({ selected }) => (
                  <div className='flex items-center'>
                    <span className={`ml-3 block truncate ${selected && 'font-bold text-black'}`}>
                      {e.name}
                    </span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </>
    )
  );
}
