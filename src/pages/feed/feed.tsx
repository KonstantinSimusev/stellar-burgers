import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import { useSelector, useDispatch } from '../../services/store';
import { selectFeed, selectIsloading } from '../../services/slices/feeds/slice';
import { fetchFeeds } from '../../services/slices/feeds/actions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const feed = useSelector(selectFeed);
  const isLoading = useSelector(selectIsloading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={feed.orders} handleGetFeeds={handleGetFeeds} />
      )}
    </>
  );
};
