---
title: 나만의 eslint-config
date: '2022-12-27T22:40:32.169Z'
description: 코드의 가독성을 높이고 일관성을 유지하기 위해 협업 시 airbnb 스타일 가이드 라인과 같은 룰을 사용한다.
thumbnail: './thumbnail.png'
tags: ['eslint']
category: 'DEV'
---
### 시작 배경

협업 시 일관된 코드 스타일을 유지하기 위해 다양한 eslint 설정, 규칙을 적용한다.
react, node, next 등 내가 사용하는 프로젝트 환경에 따라 관련 필요한 eslint-config 패키지들을 설치하고
룰을 작성하거나 복사 붙여 넣기를 했었다. 그런데 회사 프로젝트를 보니 **eslint 설정을 하나의 패키지**로 만들어 extends 필드에
추가하는 것을 알게 됐다.

오???? 굉장히 **깔끔하고 심플**하다.
개인 프로젝트의 eslintrc를 보며 나만의 `eslint-config 패키지` 를 만들어 보기로 했다.

### 파일 만들기
```
 ├── index.js
    ... 
 └── package.json
```
**index 와 package.json 파일**을 생성한다. 나의 경우 index 파일에는 리액트, 자바스크립트 / 타입스크립트 관련 config를 
정의했다. next, prettier, jest 등 추가하고 싶은 config가 있다면 파일을 추가하여 작성하고 나중에 이 패키지를 사용하는 곳에서 extends 필드에 `설정 이름/파일명` 으로 추가하여 사용하면 된다.

### 룰 작성하기
```javascript
module.exports = {
  env: { browser: true },
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: { ecmaVersion: 'latest' },
  rules: {
    // 룰 커스텀하기
  },
  overrides: [
    // 특정 파일에만 적용하고 싶은 경우 작성하기
  ]
};
```
간단한 예시 코드로 index 파일에 필요한 eslint-config 패키지와 rules를 작성하면 된다. rules 필드에는 eslint-config 패키지 룰의 기본값에서 변경이 필요한 룰을 커스텀한다. overrides 필드에는 타입스크립트와 같이 특정 파일에만 적용해야할 경우 사용한다.

### exports 필드
```JSON
"exports": {
  ".": "./index.js",
  "./prettier": "./prettier.js",
},
```
package.json 파일의 exports 필드를 통해 패키지 entry point를 지정할 수 있다. exports 필드을 사용하면 filesystem 상의 위치와 import path를 다르게 지정할 수 있다.

### 배포하기
```
npm publish
```
모든 작업이 끝났다면 패키지를 배포합니다.

### 사용하기
```
## npm
npm install -D  eslint-config-[설정 이름]

## yarn
yarn add -D eslint-config-[설정 이름]
```
적용하려는 프로젝트에 패키지를 설치하고 eslintrc 파일의 extends 필드에 설정 이름을 추가하면 끝이다.

### 마치며
호기심에 시작하여 만들어본 패키지였지만 만드는 과정에서 **eslintrc 와 package.json 각 필드의 역할, peerDependencies 명시의 필요성**을 
이해할 수 있었다. 다음에는 플러그인을 만들어 보며 직접 규칙을 만들어 봐야겠다.

### 참고
- [kakao Tech - ESLint 조금 더 잘 활용하기](https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/)
- [toss - CommonJS와 ESM에 모두 대응하는 라이브러리 개발하기: exports field](https://toss.tech/article/commonjs-esm-exports-field)
- [eslint-config-yceffort, 나만의 eslint-config 만들기](https://yceffort.kr/2020/09/eslint-config-yceffort)