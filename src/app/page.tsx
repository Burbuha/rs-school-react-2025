import HomePageClient from '../components/HomePageClient/HomePageClient';
import { fetchPeoples } from '../utils/fetchPeoples';

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [_: string]: string | string[] | undefined }>;
}) => {
  const { page = '1', query = '' } = await searchParams;
  const { peoples, error, count } = await fetchPeoples(
    query as string,
    Number(page)
  );

  return (
    <HomePageClient
      initialSearchTerm={query as string}
      initialPage={Number(page)}
      peoples={peoples}
      error={error}
      count={count}
    />
  );
};

export default HomePage;
