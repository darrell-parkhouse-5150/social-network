import {dir} from './config'

export const getFollowingShare = async post => {
    const sessionId = req.session.id;

    const sql = /*sql*/`
        select follower
        from follow_system
        where followered_by = ?
        order by time desc    
    `;

    const params = [sessionId];
    const result = await db.query(sql, params)

    const count = result.length

    if (count === 0) {
        return html `
            <div class="no-diplay">
                <img src="${dir}/img/needs/large.jpg" alt="">
            </div>
        `;
    } else {
        let html = html `
            <input type="hidden" class="share-post-id">
            <input type="hidden" class="share-user-id">
        `;

        for (const row of result) {
            const user_id = row.follower
        }
    }
}