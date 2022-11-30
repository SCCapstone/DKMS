import FeedItem from "../feed/FeedItem";
import "../globals.css";

async function getData() {
    const res = await fetch('https://docs-examples.firebaseio.com/fireblog/posts.json');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
  
    console.log(res);
    return res.text();
  }

const Profile = async () => {
    const data = await getData();

    console.log(data);

    return <div>
        <h1 className="normal-case font-bold">Profile</h1>
        <div className="divider-vertical"></div>
        <FeedItem />
    </div>
}

export default Profile;