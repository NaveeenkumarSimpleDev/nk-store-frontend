const Heading = ({ title, desc }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl 2xl:text-4xl font-bold">{title}</h1>
      {desc && <span className="font-medium text-lg 2xl:xl text-muted-foreground">
        {desc}
      </span>}
    </div>
  );
};

export default Heading;
