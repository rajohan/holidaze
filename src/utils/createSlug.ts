const createSlug = (value: string): string => {
    return value.replace(/\s/g, "-");
};

export { createSlug };
