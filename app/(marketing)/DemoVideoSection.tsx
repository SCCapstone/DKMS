import Image from "next/image";

const DemoVideoSection = () => (
  <div className="bg-base-100 pb-10">
    <h2 className="text-5xl font-bold text-right py-10 pr-10 text-primary">
      Final Demo Video
    </h2>
    <div className="grid grid-cols-2">
      <div className="pl-20">
        <Image
          width="750"
          height="250"
          src="/images/defaults/videoPlaceholder.png"
          alt="video placeholder"
        />
      </div>
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body">
          <p>
            Watch our final demo video, where one of our developers walks
            through our application by explaining and using each of the
            features.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default DemoVideoSection;
