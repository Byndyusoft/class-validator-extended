# class-validator-extended

[![npm@latest](https://img.shields.io/npm/v/@byndyusoft/class-validator-extended/latest.svg)](https://www.npmjs.com/package/@byndyusoft/class-validator-extended)
[![test workflow](https://github.com/Byndyusoft/class-validator-extended/actions/workflows/test.yaml/badge.svg?branch=master)](https://github.com/Byndyusoft/class-validator-extended/actions/workflows/test.yaml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Additional decorators for class-validator and class-transformer

## Requirements

- Node.js v12 LTS or later
- npm or yarn

## Install

```bash
npm install @byndyusoft/class-validator-extended class-validator class-transformer reflect-metadata
```

or

```bash
yarn add @byndyusoft/class-validator-extended class-validator class-transformer reflect-metadata
```

## Usage

### Decorators

#### class-validator

- [AtLeastOneDefined](./src/decorators/validators/atLeastOneDefined.ts)
- [IsNullable](./src/decorators/validators/isNullable.ts)

#### class-transformer

- [TransformToArray](./src/decorators/transformers/transformToArray.ts)
- [TransformToBoolean](./src/decorators/transformers/transformToBoolean.ts)
- [TransformToDate](./src/decorators/transformers/transformToDate.ts)
- [TransformToNumber](./src/decorators/transformers/transformToNumber.ts)

## Maintainers

- [@Byndyusoft/owners](https://github.com/orgs/Byndyusoft/teams/owners) <<github.maintain@byndyusoft.com>>
- [@Byndyusoft/team](https://github.com/orgs/Byndyusoft/teams/team)

## License

This repository is released under version 2.0 of the
[Apache License](https://www.apache.org/licenses/LICENSE-2.0).
