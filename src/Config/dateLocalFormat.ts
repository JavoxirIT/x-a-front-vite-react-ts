const dateLocalFormat = (param: string): string => {
    if (!param) return '';

    return new Date(param).toLocaleDateString();
};

export default dateLocalFormat;
