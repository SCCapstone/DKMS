import "../../globals.css";

const Friend = () => (
    <div>
    <div className="h-fit">
      <div className="flex flex-row justify-between items-center">
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 16C21 16.5304 20.7893 17.0391 20.4142 17.4142C20.0391 17.7893 19.5304 18 19 18H7L3 21V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V16Z"
            />
          </svg>
        </div>
        <div><h1 className="normal-case font-bold">Dalton</h1></div>
        <div><h1 className="normal-case">1 hr</h1></div>
      </div>
      <div>Les autres on verra - Madam Monsieur</div>
    </div>
    <div className="divider" />
  </div>
);

export default Friend;