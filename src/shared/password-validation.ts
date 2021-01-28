export const validatePassword = (password: string): boolean => {
    const re = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[a-z]).*$/;
    return re.test(String(password));
};

