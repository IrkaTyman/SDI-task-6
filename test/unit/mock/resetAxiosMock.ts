import {axiosMock} from './axiosMock';

/**
 * Сбрасывает параметры мока с axios
 */
export function resetAxiosMock() {
    axiosMock.reset();
}
