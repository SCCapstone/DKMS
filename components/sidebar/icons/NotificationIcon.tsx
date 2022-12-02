const DEFAULT_SIZE = 28;

const NotificationIcon = ({
  selected,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  onClick,
}: {
  width?: number;
  height?: number;
  selected?: boolean;
  onClick: () => void;
}) => (
  <button type="button" onClick={onClick}>
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={`stroke-current${selected ? " fill-current" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3333 8.2C17.3333 6.82087 16.7714 5.49823 15.7712 4.52304C14.771 3.54786 13.4145 3 12 3C10.5855 3 9.22896 3.54786 8.22876 4.52304C7.22857 5.49823 6.66667 6.82087 6.66667 8.2C6.66667 14.2667 4 17 4 17H20C20 17 17.3333 14.2667 17.3333 8.2Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 20C13.7968 20.3042 13.505 20.5566 13.154 20.7321C12.803 20.9076 12.4051 21 12 21C11.5949 21 11.197 20.9076 10.846 20.7321C10.495 20.5566 10.2032 20.3042 10 20" />
      <path
        d="M14 20C13.7968 20.3042 13.505 20.5566 13.154 20.7321C12.803 20.9076 12.4051 21 12 21C11.5949 21 11.197 20.9076 10.846 20.7321C10.495 20.5566 10.2032 20.3042 10 20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default NotificationIcon;
