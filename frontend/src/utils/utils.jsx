// 日にちをフォーマット
export function formatDate(getdate) {
    const date = new Date(getdate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year.toString()}年${month.toString()}月${day.toString()}日`;
}