/* eslint-disable jsx-a11y/label-has-associated-control */
const FeedCommentBox = ({ docId }: { docId: string }) => (
  <div>
    <form>
      <label htmlFor="chat" className="sr-only">
        Your response
      </label>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        <textarea
          id="chat"
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your response"
        />
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          Comment
        </button>
      </div>
    </form>
  </div>
);

export default FeedCommentBox;
