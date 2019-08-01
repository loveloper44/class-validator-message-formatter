# Class-validator-message-formatter

If you failed validation using class-validator, you'll be received messages.
But it is very difficult to read. This library modifies the message to make it easier to handle.


### Installation

```sh
$ npm install --save class-validator-message-formatter
```

### Hot to use

```ts
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

```

Without class-validator-message-formatter

```ts
import { validateSync } from 'class-validator';
  
const user:User = new User();
const errors = validateSync(user);
console.log(errors);

```
```sh
 [ ValidationError {
        target: User { name: null, address: null },
        value: null,
        property: 'name',
        children: [],
        constraints: { isString: 'name must be a string' } },
    ValidationError {
        target: User { name: null, address: null },
        value: null,
        property: 'address',
        children: [],
        constraints: { isString: 'address must be a string' } } ]
```

with class-validator-message-formatter
```ts
import {MessageFormatter} from 'class-validator-message-formatter';
import { validateSync } from 'class-validator';

const user:User = new User();
const errors = validateSync(user);
console.log(MessageFormatter.format(errors));

```

```sh
[ { field: 'name', message: 'name must be a string' },
  { field: 'address', message: 'address must be a string' } ]
```