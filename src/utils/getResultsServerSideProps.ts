import { GetServerSideProps } from 'next';

const itemsPerPage = 10;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchTerm = context.query.query || '';
  const currentPage = parseInt(context.query.page as string, 10) || 1;
  const params = searchTerm
    ? `/?search=${searchTerm}&page=${currentPage}`
    : `/?page=${currentPage}`;
  const data = await fetch(`https://swapi.dev/api/people${params}`);
  const result = await data.json();

  return {
    props: {
      peoples: result.results || [],
      error: result.error || null,
      totalPages: Math.ceil(result.count / itemsPerPage),
    },
  };
};
