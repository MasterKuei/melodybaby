結合 [classnames](https://www.npmjs.com/package/classnames) 與 [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) 的工具函數。使用方法與 [classnames](https://www.npmjs.com/package/classnames) 一致，加上了 tailwind-merge 過濾同性質的 css 屬性。
 
```ts
import { classNames } from "@melodybaby"

// 基本功能
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// 過濾 tailwindcss 同性質屬性
classNames("px-2", "py-1", "p-3", "bg-red", "bg-blue") // => "p-3 bg-blue"
```
