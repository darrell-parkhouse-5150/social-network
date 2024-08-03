const time_ago = time_ago => {
    let time_ago = time_ago.toISODatetime() ? time_ago.toISODatetime() : time_ago;
    let time = time() - time_ago;
    time = (time + 4 * 60 * 60) + 30 * 60;

    switch (time) {
        case time <= 60:
            return (time == 1) ? "just now" : time +" secs ago";
        case time >= 60 && time < 3600:
            return (Math.round(time / 60) === 1) ? '1 min ' : Math.round(time / 60) + ' mins ago';
        case time >= 3600 && time < 86400:
            return (Math.round(time / 3600) === 1) ? '1 hour ' : Math.round(time/3600) + ' hours ago'
        case time >= 86400 && time < 604800:
            return (Math.round(time / 3600) === 1) ? '1 hour ' : Math.round(time/3600) + ' hours ago'
    }
}