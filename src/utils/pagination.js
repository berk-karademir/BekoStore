export const validateFetchedCategories = (fetchedCategories) => {
    return Array.isArray(fetchedCategories) && fetchedCategories.every(category => typeof category === 'object' && category !== null);
};

export const getCurrentItems = (categories, currentPage, itemsPerPage) => {
    return Array.isArray(categories) ? categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];
};

export const calculatePagination = (currentPage, itemsPerPage, totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return { totalPages };
};

export const handleNext = (currentPage, totalPages) => {
    return currentPage < totalPages ? currentPage + 1 : currentPage;
};

export const handlePrevious = (currentPage) => {
    return currentPage > 1 ? currentPage - 1 : currentPage;
};
