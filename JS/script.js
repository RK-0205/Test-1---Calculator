const buttonsNums = [
    {btn: "AC"},
    {btn: "+/-"},
    {btn: "%"},
    {btn: "/"},
    {btn: 7},
    {btn: 8},
    {btn: 9},
    {btn: "x"},
    {btn: 4},
    {btn: 5},
    {btn: 6},
    {btn: "-"},          
    {btn: 1},
    {btn: 2},
    {btn: 3},
    {btn: "+"},
    {btn: 0},
    {btn: "."},
    {btn: "="}         
    
  ]        
  //Cтворюємо калькулятор
  function createBody() {
    let body = document.createElement('div')
    body.className = 'wrapper'

    let screen = document.createElement('div')
    screen.className = 'screen'
    let screenField = document.createElement('div')
    screenField.id = 'screenField'          
    screenField.innerHTML = '0'

    let buttons = document.createElement('div')
    buttons.className = 'buttons'
    
    buttonsNums.forEach ((item, index) => {
      let button = document.createElement('button');
      button.innerHTML = `<p>${item.btn}</p>`  
      button.addEventListener ('click', () => handleButtonClick(item.btn))       
      buttons.appendChild(button)
      if (index === buttonsNums.length - 1) {
        button.classList.add('special')
      }
      
    })
    screen.appendChild(screenField)
    body.appendChild(screen)
    body.appendChild(buttons)
    document.body.appendChild(body)
    

  }

  createBody()

  // функція обробки кліків
  function handleButtonClick(btn) {
    if (btn === 'AC') {
      clearScreen();
    } else if (btn === '+/-') {
      toggleSign();
    } else if (btn === '=') {
      calculate();
    } else if (['+', '-', 'x', '/'].includes(btn)) {
      setOperator(btn);
    } else if (btn === '%') {
      calculatePercentage();
    } else {
      appendNumber(btn);
    }
  }

  //блок змінних
  let currentNumber = '';
  let operator = '';
  let previousNumber = '';

  // функція очистки екрану
  function clearScreen() {
    currentNumber = '';
    operator = '';
    previousNumber = '';
    document.getElementById('screenField').innerText = '0';
  }        

  //функція оновлення екрану
  function updateScreen () {
    document.getElementById('screenField').innerHTML = currentNumber || '0';
  }

  //функція виведення цифр на екран
  function appendNumber(num) {
    if (num === '.' && currentNumber.includes('.')) return;
    currentNumber += num;
    updateScreen();
  }

  //функція для операторів
  function setOperator (oper) {
    if (currentNumber !== '') {
      if (previousNumber !== '') {
        calculate()
      }

      operator = oper
      previousNumber = currentNumber
      currentNumber = ''
    } else {
      operator = oper
    } 

  }

  //функція для обчислення
  function calculate () {
    if (previousNumber === '' || currentNumber === '') return;
    switch (operator) {
      case '+':
        currentNumber = (parseFloat(previousNumber) + parseFloat(currentNumber)).toString()
        break;
      case '-':
        currentNumber = (parseFloat(previousNumber) - parseFloat(currentNumber)).toString()
        break;
      case 'x':
        currentNumber = (parseFloat(previousNumber) * parseFloat(currentNumber)).toString()
        break;
      case '/':
        currentNumber = (parseFloat(previousNumber) / parseFloat(currentNumber)).toString()
        break;
      
    }

    operator = '';
    previousNumber = '';
    updateScreen()

  }

  //функція для зміни знаку перед числом
  function toggleSign () {
    if (currentNumber === '') return;
    if (currentNumber.startsWith('-')) {
      currentNumber = currentNumber.slice(1)
    } else {
      currentNumber = '-' + currentNumber
    }
    updateScreen();
  }

  //функція розрахунку відсотка
  function calculatePercentage () {
    if (previousNumber === '') return;
    currentNumber = (parseFloat(previousNumber) * parseFloat(currentNumber) / 100)
    updateScreen()
  }
