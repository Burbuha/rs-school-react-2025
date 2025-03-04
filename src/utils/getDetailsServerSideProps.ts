import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.params?.name || '';
  const data = await fetch(`https://swapi.dev/api/people/?search=${name}`);
  const result = await data.json();

  return {
    props: {
      details: result.results?.[0] || null,
      error: result.error || null,
    },
  };
};
