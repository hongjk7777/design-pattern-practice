/*
싱글톤 패턴

장점:
1. 하나의 인스턴스만 가질 수 있다.

단점:
1. 다중스레드 환경에서는 특별한 처리 없이는 하나의 인스턴스를 보장하지 못할 수 있음.
2. 유닛테스트가 어려워짐
3. SRP를 위반?(이건 이해를 못함)
*/

class Singleton {
  private static instance: Singleton;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}

function singletonClientCode() {
  const instance1: Singleton = Singleton.getInstance();
  const instance2: Singleton = Singleton.getInstance();

  if (instance1 === instance2) {
    console.log("싱글톤입니다.");
  } else {
    console.log("싱글톤이 아닙니다.");
  }
}

singletonClientCode();
