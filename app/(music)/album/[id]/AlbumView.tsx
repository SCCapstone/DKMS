import AlbumImage from "@/components/music/AlbumImage";
import OpenSpotifyButton from "@/components/music/OpenSpotifyButton";
import joinArtists from "@/lib/joinArtists";

const AlbumView = ({ album }: { album: SpotifyApi.AlbumObjectFull }) => (
  <>
    <header className="grid md:grid-flow-col md:auto-cols-max gap-4 md:pb-4 text-center md:text-left">
      <a href={album.uri} className="w-56 mx-auto">
        {/* @ts-expect-error TODO: fix this */}
        <AlbumImage src={album.images[0].url} />
      </a>
      <div className="md:pl-2 flex flex-col justify-between">
        <div>
          <h1 className="normal-case font-black text-2xl">{`${
            album.name
          } by ${joinArtists(album.artists)}`}</h1>
          <h2 className="normal-case font-extralight">{`Released ${album.release_date}`}</h2>
        </div>
        <OpenSpotifyButton uri={album.uri} />
      </div>
    </header>
    <div className="divider" />
    <details>
      <pre>{JSON.stringify(album, null, 2)}</pre>
    </details>
  </>
);

export default AlbumView;
