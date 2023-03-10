/*
어댑터 패턴

장점:
1. SRP, OCP 지킬 수 있음.

단점:
1. 다양한 클래스나 인터페이스가 필요해 복잡도가 증가한다.
*/

class RoundHole {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  fits(peg: RoundPeg) {
    return this.radius <= peg.getRadius();
  }
}

class RoundPeg {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getRadius() {
    return this.radius;
  }
}

class SquarePeg {
  private width: number;

  constructor(width: number) {
    this.width = width;
  }

  getWidth(): number {
    return this.width;
  }
}

class SquarePegAdapter {
  private peg: SquarePeg;

  constructor(peg: SquarePeg) {
    this.peg = peg;
  }

  toRoundPeg(): RoundPeg {
    const radius = (this.peg.getWidth() * Math.sqrt(2)) / 2;
    return new RoundPeg(radius);
  }
}

const hole: RoundHole = new RoundHole(5);
const roundPeg: RoundPeg = new RoundPeg(5);

const smallSquarePeg = new SquarePeg(5);
const largeSquarePeg = new SquarePeg(10);

const smallAdapter = new SquarePegAdapter(smallSquarePeg);
const largeAdapter = new SquarePegAdapter(largeSquarePeg);

function adapterClientCode(hole: RoundHole, pegAdapter: SquarePegAdapter) {
  if (hole.fits(pegAdapter.toRoundPeg())) {
    console.log("작업 가능합니다.");
  } else {
    console.log("작업 불가능 합니다.");
  }
}

adapterClientCode(hole, smallAdapter);
adapterClientCode(hole, largeAdapter);
