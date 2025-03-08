import { fetchDetails } from '../../utils/fetchDetails';
import DetailsPageClient from '../../components/DetailsPageClient/DetailsPageClient';
import styles from '../../components/DetailsPageClient/DetailsPageClient.module.css';

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
    <div className={styles.container}>
      <DetailsPageClient
        details={details}
        search={query as string}
        currentPage={Number(page)}
      />
    </div>
  );
};

export default DetailsPage;
