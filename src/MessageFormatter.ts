import { ValidationError } from 'class-validator';

function dfs(src: ValidationError[], dest: Constraint[], msg: string = null) {
    const cur = msg ? `${msg}` : '';
    for (const validationError of src) {
        if (validationError.constraints) {
            for (const key in validationError.constraints) {
                if (validationError.constraints[key]) {
                    const formatProperty = cur ? `.${validationError.property}` : `${validationError.property}`;
                    const field = isNaN(parseInt(validationError.property, 10))
                        ? formatProperty
                        : `[${validationError.property}]`;
                    dest.push({
                        field: `${cur}${field}`,
                        message: `${validationError.constraints[key]}`,
                    });
                }
            }
        }

        if (validationError.children && validationError.children.length) {
            const formatProperty = cur ? `.${validationError.property}` : `${validationError.property}`;
            const field = isNaN(parseInt(validationError.property, 10))
                ? formatProperty
                : `[${validationError.property}]`;
            this.format(validationError.children, dest, `${cur}${field}`);
        }
    }
}

interface Constraint {
    field: string;
    message: string;
}

export class MessageFormatter {
    public static format(validationErrors: ValidationError[]) {
        const dest: Constraint[] = [];
        dfs(validationErrors, dest);
        return dest;
    }
}
