const getTokenFromTokenBearer = (tokenBearer: string | undefined) => {
    if (!tokenBearer) return '';
    const token = tokenBearer.split(' ')[1];
    return token || '';
};

export default getTokenFromTokenBearer;
