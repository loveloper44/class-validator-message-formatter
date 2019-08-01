import { MessageFormatter } from '../src';
import { IsString, validateSync } from 'class-validator';

class User {
    @IsString()
    name: string;

    @IsString()
    address: string;

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }
}

function test() {
    const user: User = new User(null, null);
    const errors = validateSync(user);
    console.log(errors);
    console.log(MessageFormatter.format(errors));
}

test();
