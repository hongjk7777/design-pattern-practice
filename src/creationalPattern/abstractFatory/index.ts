/*
추상 팩토리 패턴

클라이언트가 가구 공장을 선택하면 다양한 가구를 생성할 때 디자인을 공장에서 알아서 선택한다.
즉, 클라이언트는 공장의 제품군(패밀리)에 대한 세부사항을 잘 몰라도 된다.

장점:
1. 클라이언트와 가구들과의 결합이 약해짐
2. SRP, OCP

단점:
1. 패턴을 구현하기 위해 많은 자식클래스와 같은 오버헤드가 필요
*/

interface AbstractFurnitureFactory {
  createChair(): Chair;
  createSofa(): Sofa;
}

class ModernFurnitureFactory implements AbstractFurnitureFactory {
  createChair(): Chair {
    return new ModernChair();
  }

  createSofa(): Sofa {
    return new ModernSofa();
  }
}

class classicFurnitureFactory implements AbstractFurnitureFactory {
  createChair(): Chair {
    return new classicChair();
  }

  createSofa(): Sofa {
    return new classicSofa();
  }
}

interface Chair {
  use(): void;
}

class ModernChair implements Chair {
  public use(): void {
    console.log("모던한 체어를 사용 중입니다.");
  }
}

class classicChair implements Chair {
  public use(): void {
    console.log("클래식한 체어를 사용 중입니다.");
  }
}

interface Sofa {
  use(): void;
}

class ModernSofa implements Sofa {
  public use(): void {
    console.log("모던한 소파를 사용 중입니다.");
  }
}

class classicSofa implements Sofa {
  public use(): void {
    console.log("클래식한 소파를 사용 중입니다.");
  }
}

function abstractFactoryClientCode(factory: AbstractFurnitureFactory): void {
  const chair: Chair = factory.createChair();
  const sofa: Sofa = factory.createSofa();

  chair.use();
  sofa.use();
}

abstractFactoryClientCode(new ModernFurnitureFactory());
console.log("");
abstractFactoryClientCode(new classicFurnitureFactory());
