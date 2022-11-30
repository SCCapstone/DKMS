import FeedItem from "../feed/FeedItem";
import "../globals.css";

const Profile = async () => {
    return <div>
        <h1 className="normal-case font-bold">Profile</h1>
        <div className="divider-vertical"></div>
        <FeedItem />
    </div>
}

export default Profile;