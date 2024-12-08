import { Gutter } from 'payload/components/elements'
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import payload from 'payload';
import { Expense } from 'payload/generated-types';

function ExpensesList() {
  // const params = useSearchParams();

  // const [search, setSearch] = useState(typeof params?.search === 'string' ? params?.search : '')
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Expense[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/expenses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result)
        setData(result.docs); // Payload CMS returns data under `docs`
        setIsLoading(false);
      } catch (error) {
        
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Gutter>
        <h1>Expenses</h1>
        <div className="relative ">
          <input
            // className={`${}__input`}
            // onChange={(e) => setSearch(e.target.value)}
            placeholder={"placeholder.current"}
            type="text"
            // value={search || ''}
          />
          <Search className='absolute top-1/2 -translate-y-1/2 left-2'/>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            {data?.map((expense) => (
              <li key={expense.id}>
                <p>{expense.amount}</p>
              </li>
            ))}
          </table>
        )}

      </Gutter>
    </>
  )
}

export default ExpensesList