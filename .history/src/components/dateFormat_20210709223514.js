export default {
    getTimer(timeInfo){
        const dt = new Date(timeInfo);
        const y = dt.getFullYear();
        const m = dt.getMonth();
        const d = dt.getDate();
        const hh = dt.getHours();
        const mm = dt.getMinutes();
        const ss = dt.getSeconds();
        return y + '-' + m +'-' + d + hh +':' + mm +':' + ss
    }
}