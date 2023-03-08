/*
팩토리 메서드 패턴

클라이언트가 운송회사를 선택해 운송을 맡기면 운송수단은 회사에서 알아서 선택한다.
즉, 클라이언트는 운송수단에 대해 자세히 몰라도 된다.

장점:
1. 클라이언트와 운송과의 결합이 약해짐
2. SRP, OCP

단점:
1. 패턴을 구현하기 위해 많은 자식클래스들이 필요
*/

//운송회사
abstract class Logistics {
  public abstract createTransport(): Transport;
}

class LandLogistics extends Logistics {
  public createTransport(): Transport {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  public createTransport(): Transport {
    return new Boat();
  }
}

//운송수단
interface Transport {
  delivery(): void;
}

class Truck implements Transport {
  delivery(): void {
    console.log("트럭이 배송을 완료했습니다.");
  }
}

class Boat implements Transport {
  delivery(): void {
    console.log("보트가 배송을 완료했습니다.");
  }
}

//client는 LandLogistics, SeaLogistics만 선택하면 운송수단은 몰라도 된다.
function deliveryClient(logistics: Logistics): void {
  console.log("운송수단은 모르지만 배송해주세요!");

  const transport: Transport = logistics.createTransport();
  transport.delivery();
  console.log("");
}

deliveryClient(new LandLogistics());
deliveryClient(new SeaLogistics());
