import Image from "next/image";

const ScreenshotSection = () => (
  <div>
    <div className="carousel w-full p-4 space-x-4 bg-neutral rounded-box hero min-h-screen">
      <div id="item1" className="carousel-item ">
        <Image
          src="/images/defaults/exampleSearch.png"
          className="rounded-box"
          alt="search-screenshot"
          width={1920}
          height={966}
        />
      </div>
      <div id="item2" className="carousel-item ">
        <Image
          src="/images/defaults/exampleRecs.png"
          className="rounded-box"
          alt="search-screenshot"
          width={1920}
          height={966}
        />
      </div>
      <div id="item3" className="carousel-item ">
        <Image
          src="/images/defaults/exampleProfile.png"
          className="rounded-box"
          alt="search-screenshot"
          width={1920}
          height={966}
        />
      </div>
      <div id="item4" className="carousel-item ">
        <Image
          src="/images/defaults/exampleArtist.png"
          className="rounded-box"
          alt="search-screenshot"
          width={1920}
          height={966}
        />
      </div>
    </div>
    <div className="flex justify-center w-full py-2 gap-2">
      <a href="#item1" className="btn btn-xs">
        1
      </a>
      <a href="#item2" className="btn btn-xs">
        2
      </a>
      <a href="#item3" className="btn btn-xs">
        3
      </a>
      <a href="#item4" className="btn btn-xs">
        4
      </a>
    </div>
  </div>
);

export default ScreenshotSection;
