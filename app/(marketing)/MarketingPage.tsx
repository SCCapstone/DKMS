import Image from "next/image";

import SignInButton from "./auth/signin/SignInButton";

const MarketingPage = () => (
  <div className="flex flex-col">
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-primary">
            Do more with your Spotify
          </h1>
          <p className="py-6">
            Connect with others and discover more about your music circle than
            ever.
          </p>
          <SignInButton />
        </div>
      </div>
    </div>
    <div className="hero min-h-screen bg-base-300">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <div className="card bg-base-100 shadow-xl w-6/12 object-cover">
            <div className="card-body">
              <h2 className="card-title">Final Demo Video</h2>
              <p>
                Watch our final demo video, where one of our developers walks
                through our application, explaining and using each of the
                features.
              </p>
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  </div>
);

export default MarketingPage;
