/**
 * const(명령) a(식별자) = 3(식)
 * a라는 주소에 3이라는 값을 넣으라는 명령
 */
// const a = 3;

/**
 * 1부터 10까지 더하는 함수
 * return 55
 * for : 반복 조건을 확실하게 알 수 있을 때 사용
 * while : 얼마나 반복할지 모를 때 사용
 */
// let accumulator = 0;
// for(let i=0; i <= 10; i+=1) accumulator += i;
// console.log(accumulator);
/**
 * 55 -> 45 + 10
 *     -> (36 + 9) + 10
 * a() -> b() -> c()
 * c가 끝나야 b가 해제되고 b가 끝나야 a가 해제된다.
 */
// const sum = v =>v > 1 ? v + sum(v-1) : 1;
// console.log(sum(10));

/** 
 * stack에 안쌓이게 하는 방법(꼬리물기 최적화)
 * - 돌아와서 해야할 일을 인자로 바꿔준다.
*/
// const _sum = (v, acc = 0) =>v > 1 ? _sum(v - 1, acc + v) : acc + 1;

/**
 * 과제
 * 1차원 배열의 합을
 * 재귀, 꼬리재귀 -> 기계적 번역 for
 * [1,2,3,4,5,6,7];
 */

const array = [1,2,3,4,5,6]

// const solution = (arr) => {
//   if(arr.length !== 1) {
//     const lastNumber = arr.pop();
//     arr[arr.length - 1] = arr[arr.length-1] + lastNumber;
//     solution(arr);
//   }else {
//     return arr[0];
//   }
// }

// const solution = (arr, acc =0) => arr.length !== 0 ? solution(arr, acc + arr.pop()) : acc;

const solution = (arr) => {
  let accumulator = 0;
  for(let i=0; i < arr.length; i+=1) {
    accumulator += arr[i];
  }
  return accumulator;
}

console.log(solution(array))