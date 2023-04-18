import Image from "next/image";

const HowSection = () => (
  <div className="bg-base-300 pb-10">
    <h1 className="text-5xl font-bold text-left py-10 pl-10">How to use</h1>
    <div className="grid grid-cols-2 gap-20">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create a post</h2>
          <p>
            Use the post box at the top of the feed to create a post, or use the
            arrow button for any artist, album, or song to share it to your
            feed!
          </p>
        </div>
      </div>
      <div>
        <Image
          src="/images/defaults/exampleProfile.png"
          width={480}
          height={240}
          alt="example feed"
        />
      </div>
      <div>
        <Image
          src="/images/defaults/exampleSearch.png"
          width={480}
          height={240}
          alt="example search"
        />
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Search for music</h2>
          <p>
            Using the left navigation bar, click on the search button, then
            search whatever you please!
          </p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Use playback</h2>
          <p>
            First, click play on any song within the application. Then open
            spotify on a device on the same network and change your device to
            &ldquo;DKMS&rdquo;. Now play music to your heart&apos;s content!
          </p>
        </div>
      </div>
      <div>
        <Image
          src="/images/defaults/exampleProfile.png"
          width={480}
          height={240}
          alt="example feed"
        />
      </div>
    </div>
  </div>
);

export default HowSection;
