const ErrorPage = ({
  error,
  reset,
  title,
  body,
}: {
  error: Error;
  reset: () => void;
  title?: string;
  body?: string;
}) => (
  <>
    <h2 className="text-xl font-bold p-1">
      {title ?? "Something went wrong!"}
      <div className="dropdown dropdown-right">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className="btn btn-circle btn-ghost btn-xs text-info"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </label>
        <div className="card compact dropdown-content shadow bg-base-100 rounded-box w-96 overflow-x-scroll">
          <div className="card-body">
            <h2 className="card-title">{error.name}</h2>
            <p>{error.message}</p>
            <pre>
              <code>{error.stack}</code>
            </pre>
          </div>
        </div>
      </div>
    </h2>
    {body && <p>{body}</p>}
    <button type="button" onClick={() => reset()} className="btn btn-error">
      Try again
    </button>
  </>
);
export default ErrorPage;
