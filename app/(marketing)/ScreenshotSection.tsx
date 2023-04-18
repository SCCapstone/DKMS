import Image from "next/image";

const ScreenshotSection = () => (
  <div className="bg-base-300 rounded-b-box rounded-tr-box relativeo">
    <div className="preview border-base-300 bg-base-200 rounded-b-box rounded-tr-box flex flex-wrap items-center justify-center gap-2 border bg-cover bg-top p-4 undefined">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-secondary pb-4">Preview</h1>
        <p className="pb-2">
          Scroll side to side to see examples from our application!
        </p>
      </div>

      <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        <div className="carousel-item">
          <Image
            src="/images/defaults/exampleProfile.png"
            className="rounded-box"
            width={960}
            height={480}
            alt="example profile"
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/images/defaults/exampleSearch.png"
            className="rounded-box"
            width={960}
            height={480}
            alt="example search"
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/images/defaults/exampleArtist.png"
            className="rounded-box"
            width={960}
            height={480}
            alt="example artist"
          />
        </div>

        <div className="carousel-item">
          <Image
            src="/images/defaults/exampleRecs.png"
            className="rounded-box"
            width={960}
            height={480}
            alt="example recommendations"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ScreenshotSection;
