
/**
 * Asynchronously extracts mentions from the given text and performs notification 
 * actions if the mentioned user exists.
 * 
 * @param {string} text - The text to search for mentions.
 * @param {string} post - The ID of the post where mentions are being searched.
 */const getMentions = async (text, post) => {
	const session = sessionStorage.getItem('user_id');
	const util = new Utility();
	const notify = new Notifications();
	const arr = text.trim().split(/\s+|\r\n|\r|\n/);

	for (const key of arr) {
		const trimmedKey = key.trim();
		if (trimmedKey.startsWith('@') && !trimmedKey.startsWith('#')) {
			const user = trimmedKey.slice(1);
			const query = `select username from users where username = ?`;
			const results = await db.query(query, [user]); // corrected variable name from result to results

			if (results.length === 1) {
				const to = util.getIdFromUrl(user);

				const n_query = /*sql*/`
					select n.notify_id 
					from notifications n
					where 
						post_id=? and
						notify_by=? and
						notify_to=? and
						type=?
				`;

				const m_result = await db.query(n_query, [
					post,
					session,
					to,
					'post-mentioned'
				]);

				if (m_result.length !== 0) {
					await notify.actionNotify(to, post, 'post-mention');
				}
			}
			
		}
	}
}

/**
 * Creates a notification object for a mentioned user in a post.
 * 
 * @param {string} username - The username of the mentioned user.
 * @param {object} post - The post object where the mention occurred.
 */
const notifyUserMentioned = (username, post) => {
    const notification = {
        type: 'mention',
        message: `you have been mentioned in a post by ${post.author}`,
        post: post,
        username: username
    }
}