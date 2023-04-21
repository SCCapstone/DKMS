import Image from "next/image";

const ScreenshotSection = () => (
  <section className="bg-base-200 flex flex-wrap items-center justify-center py-10">
    <div className="container mx-auto">
      <header className="flex flex-col items-center">
        <h2 className="text-5xl font-bold text-secondary pb-4">Preview</h2>
        <p className="pb-10">
          Scroll side to side to see examples from our application!
        </p>
      </header>
      <main className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box shadow-inner">
        <Image
          src="/images/defaults/exampleProfile.png"
          className="rounded-box carousel-item"
          width={960}
          height={480}
          alt="example profile"
        />
        <Image
          src="/images/defaults/exampleSearch.png"
          className="rounded-box carousel-item"
          width={960}
          height={480}
          alt="example search"
        />
        <Image
          src="/images/defaults/exampleArtist.png"
          className="rounded-box carousel-item"
          width={960}
          height={480}
          alt="example artist"
        />
        <Image
          src="/images/defaults/exampleAlbum.png"
          className="rounded-box carousel-item"
          width={960}
          height={480}
          alt="example album"
        />
        <Image
          src="/images/defaults/exampleRecs.png"
          className="rounded-box carousel-item"
          width={960}
          height={480}
          alt="example recommendations"
        />
        <Image
          src="/images/defaults/exampleSettings.png"
          className="rounded-box"
          width={960}
          height={480}
          alt="example settings"
        />
      </main>
    </div>
  </section>
);

export default ScreenshotSection;
