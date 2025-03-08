import { fetchDetails } from '../../utils/fetchDetails';
import DetailsPageClient from '../../components/DetailsPageClient/DetailsPageClient';

const DetailsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [_: string]: string | string[] | undefined }>;
}) => {
  const { name } = await params;
  const { page = '1', query = '' } = await searchParams;
  const { details, error } = await fetchDetails(name);

  if (!details) {
    return <div>Error: {error}</div>;
  }

  return (
    <DetailsPageClient
      details={details}
      search={query as string}
      currentPage={Number(page)}
    />
  );
};

export default DetailsPage;
