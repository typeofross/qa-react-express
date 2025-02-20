import { body } from "express-validator";

function sanitize() {
    const arr = [
        body('*')
            .trim()
            .escape()
            .customSanitizer(value => {
                return value?.replaceAll(/[\r\n]+/g, '');
            })];

    return arr;
}
export default sanitize