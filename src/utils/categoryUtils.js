// Utility functions for category operations

/**
 * Filters categories based on selected gender.
 * @param {Array} categories - The array of categories to filter.
 * @param {string} selectedGender - The selected gender to filter by.
 * @returns {Array} - The filtered categories.
 */
export const filterCategories = (categories, selectedGender) => {
    return categories.filter((category) => {
        if (selectedGender === 'k') {
            return category.gender === 'k'; // Kadın seçili ise 'k' olanları göster
        } else if (selectedGender === 'e') {
            return category.gender === 'e'; // Erkek seçili ise 'e' olanları göster
        }
        return true; // Hiçbir filtre yoksa tüm kategorileri göster
    });
};

/**
 * Sorts items based on the sort order.
 * @param {Array} currentItems - The array of items to sort.
 * @param {string} sortOrder - The order to sort by ('asc' or 'desc').
 * @returns {Array} - The sorted items.
 */
export const sortItems = (currentItems, sortOrder) => {
    return currentItems.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.rating - b.rating; // Ascending order
        } else if (sortOrder === 'desc') {
            return b.rating - a.rating; // Descending order
        }
        return 0; // No sorting applied
    });
};
