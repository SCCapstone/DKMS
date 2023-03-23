import AlbumImage from "@/components/music/AlbumImage";
import TrackList from "@/components/music/lists/TrackList";
import OpenSpotifyButton from "@/components/music/OpenSpotifyButton";
import { capitalize } from "@/lib/formatters";
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
          <h2 className="normal-case font-black text-2xl">{`${
            album.name
          } by ${joinArtists(album.artists)}`}</h2>
          <h3 className="normal-case font-extralight">{`Released ${
            album.release_date
          } | ${capitalize(album.album_type)}`}</h3>
        </div>
        <OpenSpotifyButton uri={album.uri} />
      </div>
    </header>
    <div className="divider" />
    <TrackList tracks={album.tracks.items} />
    <div className="divider" />

    <details>
      <pre>{JSON.stringify(album, null, 2)}</pre>
    </details>
  </>
);

export default AlbumView;
