import { useSelector } from 'react-redux';
import CreateUser from '../feature/user/CreateUser'
import Button from './Button';

function Home() {
  const userName = useSelector(store => store.user.user)

  return (

    <div className='my-10 text-center sm:my-16 px-4'>
      <h1 className="text-xl text-center font-semibold mb-8 md:3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
    {userName === '' ? <CreateUser/> : <Button to="/menu" type="primary">continue ordering, {userName}</Button>}
    </div>
  );
}

export default Home;
