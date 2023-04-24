const DemoVideoSection = () => (
  <section className="bg-base-100 py-10">
    <div className="container mx-auto">
      <h2 className="text-5xl font-bold text-center text-primary pb-10">
        Final Demo Video
      </h2>
      <div className="card bg-accent text-accent-content shadow-xl">
        <div className="card-body text-center">
          <p>
            Watch our final demo video, where one of our developers walks
            through our application by explaining and using each of the
            features.
          </p>
        </div>
      </div>
      <div className="mt-10 p-4 bg-neutral rounded-box shadow-inner w-fit mx-auto">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/QhuB8HYGNHQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  </section>
);

export default DemoVideoSection;
