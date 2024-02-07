const Heading = ({ title, desc }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="capitalize text-2xl lg:text-3xl  2xl:text-4xl font-bold">
        {title}
      </h1>
      {desc && (
        <span className="font-medium w-[60vw] text-lg 2xl:xl text-muted-foreground">
          {desc}
        </span>
      )}
    </div>
  );
};

export default Heading;
