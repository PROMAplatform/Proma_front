export const setLocalPromptMethod = (type) => {
    localStorage.setItem("LocalPromptMehthod", type);
};

export const getLocalPromptMethod = () => {
    const localPromptMethod = localStorage.getItem("LocalPromptMehthod");
    return localPromptMethod;
};
