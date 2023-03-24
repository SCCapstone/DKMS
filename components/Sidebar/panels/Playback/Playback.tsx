import BasePanel from "../BasePanel";

const Playback = () => (
  <BasePanel title="Playback" sidebarId="playback">
    <div className="flex justify-center items-center">
      <div className="flex space-x-4">
        <button type="button" className="focus:outline-none">
          <svg
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 6L4 12L11 18V6Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button type="button" className="focus:outline-none">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M10 8l6 4-6 4V8z" />
          </svg>
        </button>
        <button type="button" className="focus:outline-none">
          <svg
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 6L20 12L13 18V6Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </BasePanel>
);

export default Playback;
