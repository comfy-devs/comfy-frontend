export function humanFileSize(size: number) {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return `${Number((size / Math.pow(1024, i)).toFixed(2)) * 1} ${["B", "KB", "MB", "GB", "TB"][i]}`;
}

export function secondsToString(time: number) {
    if (time < 0) {
        return "??";
    }
    let timeString = "";

    const hrs = Math.floor(time / 3600);
    time %= 3600;
    const mins = Math.floor(time / 60);
    const secs = time % 60;

    if (hrs >= 1) timeString += `${hrs}:`;
    timeString += `${mins >= 10 ? mins : (hrs >= 1 ? "0" : "") + mins.toString()}:`;
    timeString += `${secs >= 10 ? secs : `0${secs.toString()}`}`;
    return timeString;
}
export function secondsToStringHuman(seconds: number, limit = 6): string {
    const units = ["y", "mo", "d", "h", "m", "s"];
    const values = [
        Math.floor(seconds / 31536000),
        Math.floor(seconds / 2592000) % 12,
        Math.floor(seconds / 86400) % 30,
        Math.floor(seconds / 3600) % 24,
        Math.floor(seconds / 60) % 60,
        Math.floor(seconds) % 60,
    ];
    
    let result = "";
    for (let i = 0; i < limit; i++) {
        if (values[i] !== 0) {
            result += `${values[i]}${units[i]} `;
        }
    }
    
    return result.trim();
}

export function splitArray(array: any[], chunk_size: number) {
    return array.reduce((acc, curr, i) => {
        const ch = Math.floor(i / chunk_size);
        acc[ch] = [].concat(acc[ch] || [], curr);
        return acc;
    }, []);
}
