# Changelog

## v2.0.3 2024-07-02

### 🏡 Chores

- Use tsup & make arethetypeswrong happy - by **magicdawn** [<samp>(15539)</samp>](https://github.com/magicdawn/promise.retry/commit/15539f7)
- Add scripts.typeswrong - by **magicdawn** [<samp>(e26cb)</samp>](https://github.com/magicdawn/promise.retry/commit/e26cb22)

## v2.0.2 2024-04-07

- add back `export default`

## v2.0.1 2024-04-06

- when error empty, it's a success. should not check result empty or not.

## v2.0.0 2024-04-06

- move source to TypeScript, and type with `TrimLastAbortSignal<T>`
- `pretry` named export only

## v1.2.0 2024-01-24

- update promise.timeout@1.2.0
- vitest

## v1.1.1 2022-11-18

- update promise.timeout

## v1.1.0 2022-11-11

- use `export =` for dts file, no required `esModuleInterop` & can work in TypeScript ESM environment

## v1.0.0 2022-07-20

- move to `AbortController` & `AbortSignal`, use promise.timeout@1.0.0

## v0.3.1 2020-01-21

- fix index.d.ts `RetryError` def

## v0.3.0 2020-01-21

- add types/index.d.ts
- update eslint/prettier/...

## v0.2.0 2018-08-26

- use prettier
- use async/await, require node >= 7.6.0

## v0.1.0 2016-06-02

- use `promise.timeout@0.1.0`

## v0.0.2 2016-06-01

- use `promise.timeout@0.0.3`, add `onCancel` support
- use esformatter, rm jsbeautify

## v0.0.1 2016-05-16

- first release
