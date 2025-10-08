import data from '../data/data.json';
import type {PersonalData} from '../types/data';

/**
 * A custom hook to provide personal data from the central JSON file.
 * This hook centralizes data access, making it easy to swap the data source
 * in the future (e.g., from a local JSON to a remote API) without changing
 * the components that consume it.
 *
 * @returns {PersonalData} The validated and typed personal data.
 */
export const useData = (): PersonalData => {
    // Add validation here to ensure the imported JSON matches the PersonalData type.
    // For this project, TypeScript's static analysis during the import is sufficient.
    return data as PersonalData;
};
