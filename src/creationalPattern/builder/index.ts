/*
빌더 패턴

시나리오:
집을 만들 때 창의 개수가 3개인 집, 5개인 집과 같이 다양한 집이 만들어질 수 있다.
그런데 각각을 모두 다른 생성자로 만들거나 자식 클래스로 만들면 너무 힘들다.
그렇기에 빌더 패턴을 통해 하나의 생성자에서 다양한 조합을 만들 수 있도록 한다.

장점:
1. 객체들을 단계적을 생성할 수 있고 다양한 옵션의 제품을 하나의 생성자를 활용해 만들 수 있다.
2. SRP

단점:
1. 객체를 생성할 때 코드의 길이나 복잡도가 올라감
*/

interface AbstractHouseBuilder {
  buildWalls(): void;
  buildDoors(): void;
  buildWindows(): void;
}

class ConcreteHouseBuilder implements AbstractHouseBuilder {
  private house: House;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.house = new House();
  }

  buildWalls(): void {
    this.house.parts.push("wall");
  }

  buildDoors(): void {
    this.house.parts.push("door");
  }

  buildWindows(): void {
    this.house.parts.push("window");
  }

  getHouse(): House {
    const result = this.house;
    this.reset();
    return result;
  }
}

class House {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`House parts: ${this.parts.join(", ")}\n`);
  }
}

class Director {
  private builder: AbstractHouseBuilder;

  public setBuilder(builder: AbstractHouseBuilder): void {
    this.builder = builder;
  }

  public buildMinimalBuiltInHouse(): void {
    this.builder.buildDoors();
    this.builder.buildWalls();
  }

  public buildFullBuiltInHouse(): void {
    this.builder.buildDoors();
    this.builder.buildWalls();
    this.builder.buildWindows();
  }
}

function builderClientCode(director: Director): void {
  const builder = new ConcreteHouseBuilder();
  director.setBuilder(builder);

  console.log("Basic option home");
  builder.reset();
  director.buildMinimalBuiltInHouse();
  builder.getHouse().listParts();

  console.log("Full option home");
  builder.reset();
  director.buildFullBuiltInHouse();
  builder.getHouse().listParts();

  console.log("House without director");
  builder.reset();
  builder.buildDoors();
  builder.getHouse().listParts();
}

builderClientCode(new Director());
