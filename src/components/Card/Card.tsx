interface Props {
  name: string;
  description: string;
}

export const Card = ({ name, description }: Props) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};
