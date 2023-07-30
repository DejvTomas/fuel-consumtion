import dayjs from 'dayjs';

export function dateFormate(date: Date): string {
    return dayjs(date).format('DD/MM/YYYY')
}