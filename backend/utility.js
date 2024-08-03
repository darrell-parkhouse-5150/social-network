export const isLoggedIn = () => {
    if (sessionStorage.getItem('user_id')) {
        if (getDetails(sessionStorage.getItem('id'), 'email_activated') === "yes") { return true; }
    }
}

//! this is just a test
//? this is looking great
//
export const MeOrNot = (get) => {
    const session = sessionStorage.getItem('user_id');
    if (isLoggedIn()) {
        if (session !== get) {
            return true;
        } else {
            return false;
        }
    }
}

export const getDetails = async (get_id, what) => {
    try {
        const sql = /*sql*/`
            select ${what}
            from users
            where user_id = ?
        `;

        const result = await db.query(sql, [get_id])
        return result.what;

    } catch (error) {
        
    }
}

//! original function
// export const is_online = async (user) => {
//     if (req.session.id) {
//         const sessionId = req.session.id

//         if (user !== sessionId) {
//             const sql = /*sql*/`
//                 select max(login_id) as get
//                 from login_id
//                 where user_id = ?
//                 limit 1    
//             `;

//             const params = [user]

//             const result = await db.query(query, params)

//             if (result.length > 0) {
//                 const row = result[0]
//                 const login = row.get

//                 const logout_sql = /*sql*/`
//                     select logout from login where
//                     login_id = ?
//                     limit 1    
//                 `;

//                 const _param = [login]

//                 const _result = await db.query(logout_sql, _param)

//                 if (_result.length > 0) {
//                     const _row = _result[0];
//                     const logout = _row.logout;

//                     if (logout.startsWith('0000')) {
//                         return true;
//                     } else {
//                         return false
//                     }
//                 }
//             }
//         }
//     }
// }

//! my code
//? total runtime is O(db_query_time + 3)
//! original runtime O(2 * db_query_time + 3)
export const is_online = async user => {
    if (req.session.id && user !== req.session.id) {
        const query = /*sql*/`
            select logout
            from login
            where login_id = (
                select max(login_id) from login where user_id = ?
            )
        `;

        const params = [user]

        const result = await db.query(query, params);
        return result.length > 0 && result[0].logout.startsWith('0000')
    }
}