
export const truncate = (str, n = 110) => {
    return (str?.length > n) ? str?.substr(0, n-1) + '...' : str;
}

