function adicionar(valor) {
  document.getElementById('display').value += valor;
}

function limpar() {
  document.getElementById('display').value = '';
}

function apagar() {
  let valor = document.getElementById('display').value;
  document.getElementById('display').value = valor.slice(0, -1);
}

function calcular() {
  let valor = document.getElementById('display').value;
  try {
    document.getElementById('display').value = eval(valor);
  } catch (e) {
    document.getElementById('display').value = 'Erro';
  }
}
let display = document.getElementById('display');

function inputValue(value) {
  if (value === '%') {
    display.value = parseFloat(display.value) / 100;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Erro';
  }
}

  