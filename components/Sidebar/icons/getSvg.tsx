import type { SidebarOptions } from "../types";

type IconOptions = {
  width: number;
  height: number;
  selected?: boolean;
};

const getSvg = (type: SidebarOptions, params: IconOptions) => {
  const { width, height, selected } = params;
  switch (type) {
    case "friends":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          className={`stroke-current${selected ? " fill-current" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 20C7 18.3431 9.23858 17 12 17C14.7614 17 17 18.3431 17 20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 14.2495C19.7659 14.7124 21 15.7697 21 16.9999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 14.2495C4.2341 14.7124 3 15.7697 3 16.9999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "notifications":
      return (
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
      );
    case "recommendations":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 64 64"
          fill="none"
          className={`stroke-black${selected ? "fill-current" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 0C114.615 0 0 114.619 0 256.004C0 397.389 114.615 512 256 512s256-114.611 256-255.996 C512 114.619 397.384 0 256 0z M256 351.674c-52.843 0-95.678-42.835-95.678-95.671c0-52.843 42.835-95.686 95.678-95.686 c52.844 0 95.678 42.843 95.678 95.686C351.678 308.839 308.844 351.674 256 351.674z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M256 224.109c-17.614 0-31.891 14.273-31.891 31.895c0 17.607 14.277 31.888 31.891 31.888 s31.892-14.281 31.892-31.888C287.892 238.382 273.614 224.109 256 224.109z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "playback":
      return (
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
      );
    default:
      return null;
  }
};

export default getSvg;
