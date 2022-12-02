const DEFAULT_SIZE = 28;

const PlaybackIcon = ({
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
        d="M17.7519 12.8322C18.3457 12.4363 18.3457 11.5639 17.7519 11.1681L8.5547 5.03657C7.89014 4.59354 7 5.06993 7 5.86863V18.1316C7 18.9303 7.89015 19.4067 8.5547 18.9636L17.7519 12.8322Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default PlaybackIcon;
