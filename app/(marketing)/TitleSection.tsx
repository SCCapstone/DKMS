import Link from "next/link";

const TitleSection = () => (
  <div className="hero min-h-screen bg-base-100">
    <div className="hero-content">
      <div className="card max-w-md bg-base-300">
        <div className="card-body text-center">
          <h1 className="card-title text-5xl font-bold text-primary">
            Do more with your Spotify
          </h1>
          <p className="py-6">
            Connect with others and discover more about your music circle than
            ever.
          </p>
          <Link className="btn btn-secondary normal-case" href="/auth/signin">
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default TitleSection;
