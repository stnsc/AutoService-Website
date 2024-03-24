interface Props {
  title: string;
  description: string;
}

export default function HeroTitle({ title, description }: Props) {
  return (
    <>
      <div
        className="py-5 my-0 text-body-emphasis text-center"
        id="hero-section"
      >
        <h1 className="display-5 fw-bold text-body-emphasis">{title}</h1>
        <p className="lead">{description}</p>
      </div>
    </>
  );
}
