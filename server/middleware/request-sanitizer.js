import { body } from "express-validator";

function sanitize() {
    const arr = [
        body('*')
            .trim()
            .customSanitizer(value => {
                return value?.replaceAll(/[\r\n]+/g, '');
            })];

    return arr;
}
export default sanitize