import styles from "./page.module.css";
const Feed = () => (
    <div className={styles.main}>
        <div className={styles.title}>Feed</div>
        <div className={styles.border}></div>
        <div className={styles.feedItem}>
            <div className={styles.vertical}>
                <div className={styles.userName}>Username</div>
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.commentButton}>
                    <path d="M13 11.5C13 12.0523 12.5523 12.5 12 12.5C11.4477 12.5 11 12.0523 11 11.5C11 10.9477 11.4477 10.5 12 10.5C12.5523 10.5 13 10.9477 13 11.5Z" stroke="#090909"/>
                    <path d="M17.5 11.5C17.5 12.0523 17.0523 12.5 16.5 12.5C15.9477 12.5 15.5 12.0523 15.5 11.5C15.5 10.9477 15.9477 10.5 16.5 10.5C17.0523 10.5 17.5 10.9477 17.5 11.5Z" stroke="#090909"/>
                    <path d="M8.5 11.5C8.5 12.0523 8.05228 12.5 7.5 12.5C6.94772 12.5 6.5 12.0523 6.5 11.5C6.5 10.9477 6.94772 10.5 7.5 10.5C8.05228 10.5 8.5 10.9477 8.5 11.5Z" stroke="#090909"/>
                    <path d="M21 16C21 16.5304 20.7893 17.0391 20.4142 17.4142C20.0391 17.7893 19.5304 18 19 18H7L3 21V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V16Z" stroke="#090909" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className={styles.content}>
                Content
            </div>
        </div>
        <div className={styles.border}></div>
    </div>
)

export default Feed;