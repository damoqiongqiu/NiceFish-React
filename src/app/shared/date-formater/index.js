/**
 * 将时间格式化为类似 "1天前"、"1周前"、"1个月前" 等形式
 * @param {*} date 
 * @returns 
 */
function formatTimeAgo(timestamp) {
    if (!timestamp) {
        return "";
    }

    const now = new Date();
    const date = new Date(parseTimestamp(timestamp));

    const timeDiff = now - date;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4); // Assuming 4 weeks in a month
    const years = Math.floor(months / 12);

    if (years > 0) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    } else if (months > 0) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}月${day}日`;
    } else if (weeks > 0) {
        return `${weeks}周前`;
    } else if (days > 0) {
        return `${days}天前`;
    } else if (hours > 0) {
        return `${hours}小时前`;
    } else if (minutes > 0) {
        return `${minutes}分钟前`;
    } else {
        return `${seconds}秒前`;
    }
}

function parseTimestamp(timestamp) {
    // 判断是否包含时间部分，根据情况使用不同的日期格式
    if (timestamp.includes(":")) {
        return new Date(timestamp.replace(/-/g, "/")).getTime();
    } else {
        return new Date(`${timestamp} 00:00:00`.replace(/-/g, "/")).getTime();
    }
}

export default formatTimeAgo;
