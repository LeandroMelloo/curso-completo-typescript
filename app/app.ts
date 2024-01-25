//  Usando tipagem em parâmetros
function somar(num1: number, num2: number) {
  return num1 + num2;
}

console.log(somar(1, 2)); // resultado: 3

// conversão de strings para number com o atributo +
const var1 = "2";
const var2 = "3";

console.log(somar(+var1, +var2)); // resultado: 5

// Retornos e inferência de tipos
function dividir(num1: number, num2: number): number {
  return num1 / num2;
}

const resultado = dividir(4, 2);
console.log(resultado); // resultado: 2

// Typecasting e configuração
function multiplicar(num1: any, num2: any) {
  return num1 * num2;
}

const resultado2 = multiplicar(2, 2) as number;
console.log(resultado2); // resultado: 4
