// 1.2.3
var car1 = new Object();
car1.color = "blue";
car1.maxSpeed = 200;
car1.driver = {
  name: "Бакзюк А.В.",
  category: "C",
  "personal limitations": "No driving at night"
};
car1.tuning = true;
car1["number of accidents"] = 0;

// 1.2.4
var car2 = {
  color: "red",
  maxSpeed: 180,
  driver: {
    name: "Бакзюк А.В.",
    category: "B",
    "personal limitations": null
  },
  tuning: false,
  "number of accidents": 2
};

// 1.2.5
car1.drive = function () {
  console.log("I am not driving at night");
};
car1.drive();

// 1.2.6
car2.drive = function () {
  console.log("I can drive anytime");
};
car2.drive();

// 1.2.7
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;

  // 1.2.9
  this.trip = function () {
    if (!this.driver) {
      console.log("No driver assigned");
      return;
    }

    var msg = "Driver " + this.driver.name + " ";

    if (this.driver.nightDriving) {
      msg += "drives at night ";
    } else {
      msg += "does not drive at night ";
    }

    msg += "and has " + this.driver.experience + " years of experience";
    console.log(msg);
  };
}

// 1.2.8
Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience
  };
};

// 1.2.10
var truck1 = new Truck("white", 5000, 80, "Volvo", "FH");
var truck2 = new Truck("red", 4500, 70, "MAN", "TGX");

truck1.AssignDriver("Бакзюк А.В.", true, 5);
truck2.AssignDriver("Базюк Я. Я.", false, 10);

truck1.trip();
truck2.trip();

// 1.2.12
class Square {
  constructor(a) {
    this.a = a;
  }

  // 1.2.14
  static help() {
    console.log("Square has 4 equal sides and 4 right angles.");
  }

  // 1.2.15
  length() {
    console.log("Perimeter:", this.a * 4);
  }

  // 1.2.15
  square() {
    console.log("Area:", this.a * this.a);
  }

  // 1.2.15
  info() {
    console.log("Sides:", this.a, this.a, this.a, this.a);
    console.log("Angles: 90, 90, 90, 90");
    this.length();
    this.square();
  }
}

// 1.2.16
class Rectangle extends Square {
  constructor(a, b) {
    super(a);
    this.b = b;
  }

  // 1.2.17
  static help() {
    console.log("Rectangle has opposite sides equal.");
  }

  // 1.2.17
  length() {
    console.log("Perimeter:", 2 * (this.a + this.b));
  }

  // 1.2.17
  square() {
    console.log("Area:", this.a * this.b);
  }

  // 1.2.17
  info() {
    console.log("Sides:", this.a, this.b, this.a, this.b);
    console.log("Angles: 90, 90, 90, 90");
    this.length();
    this.square();
  }
}

// 1.2.18
class Rhombus extends Square {
  constructor(a, alpha, beta) {
    super(a);          
    this._alpha = alpha;
    this._beta = beta;
  }

  // 1.2.19
  static help() {
    console.log("Rhombus has all sides equal.");
  }

  // 1.2.19
  length() {
    console.log("Perimeter:", this.a * 4);
  }

  // 1.2.19
  square() {
    var rad = (this.beta * Math.PI) / 180;
    console.log("Area:", this.a * this.a * Math.sin(rad));
  }

  // 1.2.19
  info() {
    console.log("Sides:", this.a, this.a, this.a, this.a);
    console.log("Angles:", this.alpha, this.beta, this.alpha, this.beta);
    this.length();
    this.square();
  }

  // 1.2.22 
  get a() { return this._a; }
  set a(v) { this._a = v; }

  get alpha() { return this._alpha; }
  set alpha(v) { this._alpha = v; }

  get beta() { return this._beta; }
  set beta(v) { this._beta = v; }
}

// 1.2.20
class Parallelogram extends Rectangle {
  constructor(a, b, alpha, beta) {
    super(a, b);
    this.alpha = alpha;
    this.beta = beta;
  }

  // 1.2.21
  static help() {
    console.log("Parallelogram has opposite sides equal and parallel.");
  }

  // 1.2.21
  length() {
    console.log("Perimeter:", 2 * (this.a + this.b));
  }

  // 1.2.21
  square() {
    var rad = (this.beta * Math.PI) / 180;
    console.log("Area:", this.a * this.b * Math.sin(rad));
  }

  // 1.2.21
  info() {
    console.log("Sides:", this.a, this.b, this.a, this.b);
    console.log("Angles:", this.alpha, this.beta, this.alpha, this.beta);
    this.length();
    this.square();
  }
}

// 1.2.23
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// 1.2.24
const s = new Square(5);
const r = new Rectangle(6, 3);
const rh = new Rhombus(4, 120, 60);
const p = new Parallelogram(8, 5, 120, 60);

s.info();
r.info();
rh.info();
p.info();

// 1.2.25 
function Triangular(a = 3, b = 4, c = 5) {
  var sides = { a: a, b: b, c: c };
  var { a: a1, b: b1, c: c1 } = sides;
  return { a: a1, b: b1, c: c1 };
}

// 1.2.26
console.log(Triangular());
console.log(Triangular(5, 6, 7));
console.log(Triangular(8, 9, 10));

// 1.2.27
function PiMultiplier(x) {
  return function () {
    return Math.PI * x;
  };
}

// 1.2.28
const mul2 = PiMultiplier(2);
const mul15 = PiMultiplier(3 / 2);
const div2 = PiMultiplier(0.5);

console.log(mul2());
console.log(mul15());
console.log(div2());

// 1.2.29
function Painter(color) {
  return function (obj) {
    if (!obj.type) {
      console.log("No 'type' property occurred!");
      return;
    }
    obj.color = color;
    console.log(color + " " + obj.type);
  };
}

// 1.2.30
const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

// 1.2.31
const obj1 = { maxSpeed: 280, type: "Truck", color: "magenta", "load capacity": 2400 };
const obj2 = { maxSpeed: 180, type: "Sportcar", color: "magenta" };
const obj3 = { maxSpeed: 180, "avg speed": 90, color: "purple", isCar: true };

PaintBlue(obj1); PaintRed(obj1); PaintYellow(obj1);
PaintBlue(obj2); PaintRed(obj2); PaintYellow(obj2);
PaintBlue(obj3); PaintRed(obj3); PaintYellow(obj3);
