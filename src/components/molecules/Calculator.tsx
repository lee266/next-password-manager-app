import { useTranslation } from 'next-i18next';
import NumberButton from 'components/atoms/Calculator/NumberButton';
import { useState } from 'react';
import BackspaceIcon from '@mui/icons-material/Backspace';

const Calculator = () => {
  const [calculateResult, setCalculateResult] = useState<string>('');
  const [calculateInput, setCalculateInput] = useState<string>('0');
  const [calculateInputNumber, setCalculateInputNumber] = useState<boolean>(true);
  const [calculateInputSymbol, setCalculateInputSymbol] = useState<boolean>(false);
  const [useDot, setUseDot] = useState<boolean>(false);
  const { t } = useTranslation();

  const sum = (x:number, y:number) => {
    const s = x + y
    return s
  }

  const subtraction = (x:number, y:number) => {
    const s = x - y
    return s
  }

  const division = (x:number, y:number) => {
    const s = x / y
    return s
  }

  const multiplication = (x:number, y:number) => {
    const s = x * y
    return s
  }


  const handleNumberButtonClick = (value:string) => {
    if (calculateInput =='0') {
      setCalculateInput(value)
    } else if(calculateInputSymbol) {
      setCalculateInputNumber(true);
      setCalculateInputSymbol(false);
      setCalculateInput((prevExpression) => prevExpression + ' ' + value);
    }else{
      setCalculateInput((prevExpression) => prevExpression + value);
    }
  }

  const handleSymbolButtonClick = (value:string) => {
    if (calculateInputNumber) {
      setCalculateInputNumber(false);
      setCalculateInputSymbol(true);
      setUseDot(false);
      setCalculateInput((prevExpression) => prevExpression + ' ' + value);
    } else if (calculateInputSymbol) {
      setCalculateInput((prevExpression) => prevExpression.slice(0, -1) + value)
    }else {
      setCalculateInput((prevExpression) => prevExpression + ' ' + value);
    }
  }

  const handleDotButtonClick = (value:string) => {
    if (calculateInputSymbol) {
      setCalculateInput(calculateInput)
    } else if (useDot) {
      setCalculateInput(calculateInput)
    }
    else {
      setCalculateInput(calculateInput + value);
      setUseDot(true);
    }
  }

  const handleBackButtonClick = () => {
    if (calculateInput.length == 1){
      setCalculateInput('0');
      setCalculateInputNumber(true);
      setCalculateInputSymbol(false);
    }else{
      if (['+', '/', '*', '-'].includes(calculateInput.slice(-3, -2))) {
        setCalculateInputNumber(false);
        setCalculateInputSymbol(true);
        setCalculateInput((prevExpression) => prevExpression.slice(0, -2));
      }else if(calculateInputSymbol) {
        setCalculateInput((prevExpression) => prevExpression.slice(0, -2));
        setCalculateInputNumber(true);
        setCalculateInputSymbol(false);
      }
      else {
        setCalculateInputNumber(true);
        setCalculateInputSymbol(false);
        setCalculateInput((prevExpression) => prevExpression.slice(0, -1))
      }
      
    }
  }

  const handleEqualClick = (value:string)  => {
    try {
      let values: string[] = [];
      if (calculateInputSymbol) {
        values = calculateInput.slice(0, -2).split(' ');
        setCalculateResult(calculateInput.slice(0, -1) + value);
      } else {
        values = calculateInput.split(' ');
        setCalculateResult(calculateInput + value);
      }

      let index = 1;
      while (values.length > index) {
        let result = 0;
        
        if (['*', '/'].includes(values[index])) {
          if (values[index] == '*') {
            const x:number = parseFloat(values[index - 1]);
            const y:number = parseFloat(values[index + 1]);
            result = multiplication(x, y);
          }else if (values[index] == '/') {
            const x:number = parseFloat(values[index - 1]);
            const y:number = parseFloat(values[index + 1]);
            result = division(x, y);
          }
          values[index + 1] = String(result);
          values.splice(index-1, 2)
          index = 1
        }else {
          index += 2
        }
      }
      index = 1
      while (values.length > 1) {
        let result = 0;
        if (values[index] == '+') {
          const x:number = parseFloat(values[index - 1]);
          const y:number = parseFloat(values[index + 1]);
          result = sum(x, y);
        }else if (values[index] == '-') {
          const x:number = parseFloat(values[index - 1]);
          const y:number = parseFloat(values[index + 1]);
          result = subtraction(x, y);
        }
        values[index + 1] = String(result);
        values.splice(index-1, 2)
      }
      setCalculateInput(values[0]);
      setCalculateInputNumber(true);
      setCalculateInputSymbol(false);
      setUseDot(false);
    } catch (error) {
      setCalculateResult('Error');
      setCalculateInputNumber(true);
      setCalculateInputSymbol(false);
      setUseDot(false);
    }
  }

  const handleClearClick = (value:string) => {
    if (value == 'input') {
      setCalculateInput('0');
      setCalculateResult('');
    } else {
      setCalculateInput('0');
    }
    setCalculateInputNumber(true);
    setCalculateInputSymbol(false);
  }


  return(
    <div className='calculator min-w-[300px] max-w-[600px]'>
      <div className="flex flex-col items-center
        bg-white border border-gray-200 rounded-lg"
      >
        <h2 className="text-3xl font-bold">{t('general.common.calculator')}</h2>
        <div className="bg-gray-200 p-4 rounded-lg w-full">
          <div className="text-2xl text-right font-bold mb-4">{calculateResult}</div>
          <div className="text-xl text-right font-bold">{calculateInput}</div>
        </div>
        <div className="grid gap-4 mt-2">
          <div>
            <NumberButton value='' ButtonClick={handleBackButtonClick}>
              <br />
            </NumberButton>
            {calculateInput == '0'
              ?
                <button 
                  onClick={() => handleClearClick('input')} 
                  className="
                    col-span-2 bg-red-400 hover:bg-red-500 
                    rounded-lg p-2 text-xl font-bold
                    min-w-[56px]
                  ">
                  C
                </button>
              : 
                <button 
                  onClick={() => handleClearClick('result')} 
                  className="
                    col-span-2 bg-red-400 hover:bg-red-500 
                    rounded-lg p-2 text-xl font-bold
                    min-w-[56px]
                  ">
                  CE
                </button>
            }
            <NumberButton value='back' ButtonClick={handleBackButtonClick}>
              <BackspaceIcon/>
            </NumberButton>
            <NumberButton value='/' ButtonClick={handleSymbolButtonClick}>
              ÷
            </NumberButton>
          </div>
          <div className='w-full'>
            <NumberButton value='7' ButtonClick={handleNumberButtonClick}>
              7
            </NumberButton>
            <NumberButton value='8' ButtonClick={handleNumberButtonClick}>
              8
            </NumberButton>
            <NumberButton value='9' ButtonClick={handleNumberButtonClick}>
              9
            </NumberButton>
            <NumberButton value='*' ButtonClick={handleSymbolButtonClick}>
              x
            </NumberButton>
          </div>
          <div>
            <NumberButton value='4' ButtonClick={handleNumberButtonClick}>
              4
            </NumberButton>
            <NumberButton value='5' ButtonClick={handleNumberButtonClick}>
              5
            </NumberButton>
            <NumberButton value='6' ButtonClick={handleNumberButtonClick}>
              6
            </NumberButton>
            <NumberButton value='-' ButtonClick={handleSymbolButtonClick}>
              -
            </NumberButton>
          </div>
          <div>
            <NumberButton value='1' ButtonClick={handleNumberButtonClick}>
              1
            </NumberButton>
            <NumberButton value='2' ButtonClick={handleNumberButtonClick}>
              2
            </NumberButton>
            <NumberButton value='3' ButtonClick={handleNumberButtonClick}>
              3
            </NumberButton>
            <NumberButton value='+' ButtonClick={handleSymbolButtonClick}>
              +
            </NumberButton>
          </div>
          <div>
            <NumberButton value='' ButtonClick={handleBackButtonClick}>
              <br />
            </NumberButton>
            <NumberButton value='0' ButtonClick={handleNumberButtonClick}>
              0
            </NumberButton>
            <NumberButton value='.' ButtonClick={handleDotButtonClick}>
              .
            </NumberButton>
            <NumberButton value='=' ButtonClick={handleEqualClick}>
              =
            </NumberButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator;
