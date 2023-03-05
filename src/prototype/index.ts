/*
프로토타입 패턴

장점:
1. 추상객체의 clone 메소드를 통해 구현객체에 결합하지 않을 수 있다.
2. 반복되는 초기화 작업 및 사전 설정들을 clone으로 대체 가능

단점:
1. 순환참조 복제는 복잡할 수 있음
*/

//일반적인 경우 prototype 예시
class Prototype {
    value: number;
}

//js의 경우 Object.create으로 간단하게 clone할 수 있다.
function prototypeClientCode() {
    const prototype = new Prototype();
    prototype.value = 1;

    const clone = Object.create(prototype);

    if(prototype === clone) {
        console.log('prototype과 clone은 같은 객체입니다.');
    } else {
        console.log('prototype과 clone은 다른 객체입니다.');
    }

    if(prototype.value === clone.value) {
        console.log('value는 clone되었습니다.');
    } else {
        console.log('value는 clone이 안 됐습니다.');
    }
}

prototypeClientCode();


//순환 참조의 경우 prototype 예시
class Prototype2 {
    public value: any;
    public component: object;
    public circularReference: BackReference;

    public clone(): Prototype2 {
        const clone: Prototype2 = Object.create(this);

        clone.component = Object.create(this.component);

        clone.circularReference = {
            ...this.circularReference
        }

        clone.circularReference.prototype = clone;

        return clone;
    }
}

class BackReference {
    public prototype;

    constructor(prototype: Prototype2) {
        this.prototype = prototype;
    }
}

function circularPrototypeClientCode() {
    const p1 = new Prototype2();
    p1.value = 1;
    p1.component = new Date();
    p1.circularReference = new BackReference(p1);
    
    const p2 = p1.clone();

    if(p1.value === p2.value) {
        console.log('value는 clone되었습니다.');
    } else {
        console.log('value는 clone이 안 됐습니다.');
    }

    if(p1.component === p2.component) {
        console.log('component는 clone이 안 됐습니다.');
    } else {
        console.log('component는 clone되었습니다.');
    }

    if(p1.circularReference === p2.circularReference) {
        console.log('circularReference은 clone이 안 됐습니다.');
    } else {
        console.log('circularReference은 clone되었습니다.');
    }

    if(p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log('circularReference의 prototype은 clone이 안 됐습니다.');
    } else {
        console.log('circularReference의 prototype은 clone되었습니다.');
    }
}

circularPrototypeClientCode();