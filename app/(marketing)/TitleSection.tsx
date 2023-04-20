import Link from "next/link";

const TitleSection = () => (
  <div className="hero h-full bg-gradient-to-bl via-primary from-25% from-secondary shadow-inner">
    <div className="hero-content">
      <div className="card glass max-w-md shadow-xl hover:shadow-xl">
        <div className="card-body text-center text-primary-content">
          <h1 className="card-title text-5xl font-bold">
            Dance more with DKMS.
          </h1>
          <p className="py-6">
            Connect with others and discover more about your music circle than
            ever.
          </p>
          <Link className="btn btn-secondary" href="/auth/signin">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default TitleSection;
