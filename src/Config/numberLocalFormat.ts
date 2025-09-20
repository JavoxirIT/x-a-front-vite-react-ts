const numberLocalFormat = (param: number) => {
    if (!param) return '';
    return param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default numberLocalFormat;
