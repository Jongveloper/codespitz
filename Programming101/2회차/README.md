내결함성 : 오류가 발생했을 때, 버티는 장치 (보통 런타임 에러가 발생하지 않고 컨텍스트 에러가 발생한다.)
내결함성을 도입할 때는 신중하게 도입해야 한다.
최대한 내결함성을 갖추면 안된다.
내결함성을 갖추지 않고 오류를 표출하게 코드를 작성해야 한다.

```js
const recursive = (list, index = 0, acc = 0) => {
  if(!Array.isArray(list)) throw `invalid list ${list}`;
  if(typeof list[index] !== 'number') throw `invalid element ${index}: ${list[index]}`;
  return recursive(list, index, acc + list[index]);
};
let result = 0;
try {
  recursive(17);
} catch(e) {
  /*
   console을 찍을 지 result = -1을 만들지는
   recursive가 결정할 사항이 아니다.
  */
  // console.log(e);
  result = -1
}
```

```js
const listValidator = list => Array.isArray(list);

const elementValidator = element => typeof element === 'number';

const recursive = (list, index = 0, acc = 0) => {
  if(!listValidator(list)) throw `invalid list ${list}`;

  if(!elementValidator(list[index])) throw `invalid element ${index}: ${list[index]}`;

  return recursive(list, index, acc + list[index]);
};
let result = 0;
try {
  recursive(17);
} catch(e) {
  console.log(e);
}
```

```js
const validator = [
  (list, el) => list instanceof Array && list.length > 0,
  (list, el) => typeof el === 'number'
];

const recursive = (list, index = 0, acc = 0) => {
  if(!validator.every(vali => vali(list, list[index]))) throw `invalid arguments, list${list}, element${list[index]}`;

  return recursive(list, index, acc + list[index]);
};

try {
  recursive(17);
} catch(e) {
  console.log(e);
}
```

```js
const validator = {
  data: [
    (list, el) => list instanceof Array && list.length > 0,
    (list, el) => typeof el === 'number'
  ],
  validate(list, index){
    return this.data.validator.every(vali => vali(list, list[index]));
  }
};

const recursive = (list, index = 0, acc = 0) => {
  if(!validator.validate(list, index)) throw `invalid arguments, list${list}, element${list[index]}`;

  return recursive(list, index, acc + list[index]);
};

try {
  recursive(17);
} catch(e) {
  console.log(e);
}
```

```js
const arraySum = (() => {
  const elementSum = (arr, i, acc) => {
    if(arr.length === i) return acc;
    return elementSum(arr,acc + arr[i], i+1);
  };
  const arraySum = arr => elementSum(arr, 0, 0);
  return arraySum;
})();
  // elementSum scope : arraySum만 알게, lifecycle : 영구적

```

```js
const arraySum = arr => {
  const elementSum = (arr, i, acc) => {
    if(arr.length === i) return acc;
    return elementSum(arr, acc + arr[i], i+1);
  };
  return elementSum(arr, 0, 0);
}
// elementSum scope: arraySum만 알게, lifecycle: arraySum 호출할 때 생성되어 리턴 시 제거
```

코드를 분리하거나 함수를 분기하는 이유 : 유지보수를 위해 수정하는 이유가 다르다면 다른 애들을 분리시킨다. (역할 : 수정, 원인)

책 : 프로그램은 왜 실패하는가?

0. 변수란 스코프와 라이프사이클을 갖는다, 메모리와 연산은 상호 교환할 수 있으며 특히 라이프사이클이 관여한다.
1. 오류와 실패의 관계 : 오류는 중간요소의 내결합성 때문에 실패로 이어지지 않을 수 있다 : 오류가 최대한 빨리 실패로 이어지게 짜라. 컨텍스트 에러가 더 무서우니까 -> 신뢰성, 안정성(컨텍스트에러 발생이 올라감)
2. 코드의 분리 또는 정리 : 수정되는 원인에 따라 :: 변화율 (변화율이 같은 애들끼리 코드를 모아라) 변화율의 원인 => 수정되는 이유
3. 자바스크립트 인터페이스 : 함수의 이름 인자 반환값의 형식이 일치하는 경우
4. 인터페이스를 일치시키면 컬렉션으로 묶을 수 있다 => 일종의 일반화 => 서로 다른 형태인 경우 인터페이스를 일치시켜 일반화를 한다.
5. 데이터와 데이터를 이용한 알고리즘이 이원화 되면 관리가 불가능 => 데이터를 소유한 쪾에서 데이터를 사용하는 알고리즘을 제공한다.
6. 꼬리 최적화 함수를 루프로 고칠 때 기계적으로 고친다는 의미
7. 결국 루프는 클로저에만 의존하는 함수를 반복시키고, 재귀함수는 인자에만 의존하는 함수를 반복시킨다.
8. 반복되는 코드를 제거하기 위해 집착해라.
