import Image from "next/image";

const HowSection = () => (
  <section className="bg-base-300 pb-10">
    <div className="container mx-auto">
      <h2 className="text-5xl font-bold text-left py-10 pl-10 text-primary">
        How to use
      </h2>
      <main className="space-y-10">
        <div className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition">
          <div className="card-body">
            <h3 className="card-title font-bold text-accent">Create a post</h3>
            <p>
              Use the post box at the top of the feed to create a post, or use
              the arrow button for any artist, album, or song to share it to
              your feed!
            </p>
          </div>
          <figure>
            <Image
              src="/images/defaults/exampleFeed.png"
              width={480}
              height={240}
              alt="example feed"
            />
          </figure>
        </div>
        <div className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition">
          <figure>
            <Image
              src="/images/defaults/exampleSearch.png"
              width={480}
              height={240}
              alt="example search"
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title font-bold text-accent">
              Search for music
            </h3>
            <p>
              Using the left navigation bar, click on the search button, then
              search whatever you please!
            </p>
          </div>
        </div>
        <div className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition">
          <div className="card-body">
            <h3 className="card-title font-bold text-accent">Use playback</h3>
            <p>
              Open a spotify on a device on the same network as the device using
              the application and change your device to &ldquo;DKMS&rdquo;. Now
              play music to your heart&apos;s content!
            </p>
          </div>
          <figure>
            <Image
              src="/images/defaults/examplePlayback.png"
              width={480}
              height={240}
              alt="example feed"
            />
          </figure>
        </div>
      </main>
    </div>
  </section>
);

export default HowSection;
