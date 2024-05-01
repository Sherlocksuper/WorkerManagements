export const generateColumns = (keys: string[]) => {
    return keys.map(key => ({
        title: key,
        dataIndex: key,
    }));
};