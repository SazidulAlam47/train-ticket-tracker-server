import { monthNames } from '../constants/month.constant';

const formatDateError = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    return `${day} ${month}`;
};

export default formatDateError;
