# **log-sanitizer**

### Description
Module that allows users to sanitize JSON data based on inputted fields, i.e. password, email, credit card information, etc.

### Requirements

### Installation
```
npm install log-sanitizer
```

### Usage
1. Import module

```
const Sanitize = require('log-sanitizer');
```

2. Initialize object with array of fields to be sanitized

```
const logSanitizer = new Sanitize(['password'])
```

3. Sanitize JSON object: Function takes in a JSON object and creates a deep copy that is sanitized based on the fields the user inputted during initialization and returned.

```
logSanitizer.sanitize({ "password": "helloWorld" })
```