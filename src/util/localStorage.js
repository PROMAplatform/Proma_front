export const setLocalPromptMethod = (type) => {
    localStorage.setItem("LocalPromptMehthod", type);
};

export const getLocalPromptMethod = () => {
    const localPromptMethod = localStorage.getItem("LocalPromptMehthod");
    return localPromptMethod;
};

export const getIsFirstVisited = () => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
        return false;
    } else {
        localStorage.setItem("hasVisited", 'true');
        return true;
    }
};
