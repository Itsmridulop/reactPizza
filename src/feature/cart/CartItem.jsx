import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';
import { formatCurrency } from '../../utils/helpers'

import DeleteButton from '../../ui/DeleteButton';
import UpdateButton from '../../ui/UpdateButton';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const fetcher = useFetcher()

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu')
  }, [fetcher])


  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <div className='flex flex-col'>
        <p className='mb-1 sm:mb-0 font-bold'>
          {name}
        </p>
        <p className='text-sm text-stone-500 italic'>{(fetcher.data?.find(ele => ele.id === pizzaId).ingredients ?? []).join(', ')}</p>
      </div>
      <div className='flex justify-between items-center sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <UpdateButton pizzaId={pizzaId} />
        <DeleteButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
