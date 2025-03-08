import { fetchDetails } from '../utils/fetchDetails.ts';
import styles from '../styles/DetailsPage.module.css';
import DetailsPageClient from '../components/DetailsPageClient/DetailsPageClient.tsx';

const DetailsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [_: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const { page = '1', query = '' } = await searchParams;
  const { details, error } = await fetchDetails(slug);

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
