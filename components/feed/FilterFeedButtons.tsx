import Link from "next/link";

const FilterFeedButtons = ({ filterActive }: { filterActive?: boolean }) => (
  <div className="flex flex-row">
    <h2 className="font-semibold mr-4">Filters: </h2>
    <Link href={`${filterActive ? "/" : "/saved"}`} passHref>
      <button
        className={`btn btn-sm ${
          filterActive ? "" : "btn-outline"
        } btn-primary rounded-full mb-5`}
        type="button"
      >
        Saved Posts
      </button>
    </Link>
  </div>
);

export default FilterFeedButtons;
