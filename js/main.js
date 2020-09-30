// supported cards for transaction
      const supportedCards = {
        visa: 'visa',
        mastercard: 'mastercard'
      };

      const countries = [
        {
          code: "US",
          currency: "USD",
          country: 'United States'
        },
        {
          code: "NG",
          currency: "NGN",
          country: 'Nigeria'
        },
        {
          code: 'KE',
          currency: 'KES',
          country: 'Kenya'
        },
        {
          code: 'UG',
          currency: 'UGX',
          country: 'Uganda'
        },
        {
          code: 'RW',
          currency: 'RWF',
          country: 'Rwanda'
        },
        {
          code: 'TZ',
          currency: 'TZS',
          country: 'Tanzania'
        },
        {
          code: 'ZA',
          currency: 'ZAR',
          country: 'South Africa'
        },
        {
          code: 'CM',
          currency: 'XAF',
          country: 'Cameroon'
        },
        {
          code: 'GH',
          currency: 'GHS',
          country: 'Ghana'
        }
      ];

       //countries = {code: "US", currency: "USD", country: "United States"};
       const button = document.querySelector('button');

      const startApp = () => {
        fetchBill();
        checkInput();
        generateBalance();
        button.addEventListener('click', (e) =>{
          e.preventDefault();
          let userName = document.querySelector('#username');
          if(validateCardType() && validateCardExpiryDate(document.querySelector('#year').value)){
            if(validateCardHolderName(userName.value)){
              if(isBalanceEnough(balance, appState.bill)){
                makePayment();
                createTransactionMessage(`
                Transaction successful your account balance has been debited with the sum of $${appState.bill}`);
              }else{
                declinePayment();
              }
            }else{
              createTransactionMessage('invalid card holder name');
            }
            
          }else if(!validateCardType() && validateCardExpiryDate(document.querySelector('#year').value)){
            
            createTransactionMessage('invalid card type');
          }else if(validateCardType() && !validateCardExpiryDate(document.querySelector('#year').value)){
           
            createTransactionMessage('Card has expired, please visit your nearest bank');
          }else{
            console.log('Card does not exist.');
            
          }
          
          
        });
      };

      const appState = {};

      const formatAsMoney= (amount, buyerCountry) => {
        const country = countries.find((c) => {
          return (c.country == buyerCountry) || countries[0];
        })
        
        return amount.toLocaleString(`en-${country.code}`, {style:'currency', currency:country.currency});
      }

      const createTransactionMessage = (msg) =>{
        let tdiv = document.querySelector('#transaction-message');
        tdiv.textContent = msg;
      }

      const isBalanceEnough = (balance, total) =>{
        if(balance >= total){
          return true;
        }else{
          return false;
        }
      }
      const newBalance = (balance) =>{
        let span = document.querySelector('#balance');
        span.textContent = `Balance $${balance}`;
      }

      const makePayment = () =>{
        let price = appState.bill;
        balance = balance - price;
        newBalance(balance);
      }
      const declinePayment = () =>{
        console.log('Insuffient fund');
      }
      const flagIfInvalid = (field, isValid) =>{
        if(isValid){
          field.classList.remove('isinvalid');
        }else{
          field.classList.add('isinvalid');
        }
      }
   
      const expiryDateFormatIsValid = (target)=>{
        if(target.value.match(/^\d\d\/\d\d$/))
          return true;
          return false;

      }

      let balance;

      const generateBalance = () =>{
        balance = Math.round(Math.random()*1500);
        const bal_span = document.querySelector('#balance');
        bal_span.textContent = `balance $${balance}`;
      }


      const validateCardExpiryDate = (mmyy) => {
        
        let decision;
        let date = new Date();
        let month = `${date.getMonth() + 1}`;
        let year = `${date.getFullYear()}`.split('').splice(2, 2).join('');
        mmyy = mmyy.split('/')
        if(mmyy[1] >= year){
          decision = true;
          mmyy.join('').toString();
          year.toString();

        }else{
          decision = false;

        }
        return decision;  
      }
      const validateCardHolderName = (name) => {
        if(name != ''){
          return true;
        }else{
          return false;
        }

      };
       const validateWithLuhn = (digits) =>{
         digits.reverse.shift(),
         digits = digits.map((amount, vallue) =>{
           if((index % 2 ) === 0){
             return value * 2;
           }else{
             return value;
           }
         });
         digits = digits.map((element) =>{
           if(element > 9){
             return element - 9;
           }else{
             return element;
           }
         });
         digits = digits.reduce((amount, value) => amount + value);
         return ((digits % 10) !== 0);
       };

      
      const inputs = document.querySelectorAll('input');
      const form = document.querySelector('form');
      const cardImage = document.querySelector('#card-type');
      const card = document.querySelector('[data-credit-card]');
     
    const checkInput = () =>{
        form.addEventListener('keyup', ()=>{
        inputs.forEach((input, ind, arr) =>{
            if(input.value.length == 4){
                input.setAttribute('disabled', true);
            }
        });
        });
        if(inputs[3].getAttribute('disabled') == true){
        validateCardType();
        }
    }

      //make sure that all input has only 4 digits inside.

      const validateCardType = () =>{
        let firstNum = inputs[0].value.split('').shift();
        // check if it mastercard or visa card.
        if(firstNum == 5){
          cardImage.setAttribute('src', './img/img.png');
          card.classList.remove('is-visa');
          card.classList.add('is-mastercard');
          return true;
        }else if (firstNum == 4) {
          cardImage.setAttribute('src', './img/access.jpg');
          card.classList.remove('is-mastercard');
          card.classList.add('is-visa');
          return true;
        }else{
          cardImage.setAttribute('src', './img/verve.jpg');
          card.style.background = `linear-gradient(87deg, purple, pink)`;
          return false;
        }
      }

      const validateCardNumber = () =>{


      }

      const uiCanInteract = () => {
        const ccdiv = document.querySelector('[data-cc-digits]');
        const ccdiv2 = document.querySelector('[data-cc-info]');
        const ccdiv3 = document.querySelector('[data-pay-btn]');

        console.log(ccdiv3)
        //const detectCardType
        ccdiv.addEventListener('blur', () =>{

        });
        ccdiv2.addEventListener('click', (e)=>{
          e.preventDefault();
          consol.log(e);
          validateCardNumber();
        });
        
        validateCardHolderName();
        ccdiv2.addEventListener('blur', () => {

        });
        ccdiv23.addEventListener('click', () =>{
          ccdiv.focus;
        });

      };

      const total = {results:[1,2]};

      const displayCartTotal = ({results}) => {
        let data = results[0];
        let { itemsInCart, buyerCountry } = data;
        appState.items = itemsInCart;
        appState.country = buyerCountry;

          appState.bill = appState.items.reduce((total, item) =>  {
            total += (item.price * item.qty);
            return total;
          }, 0);

        appState.billFormatted = formatAsMoney(appState.bill, appState.country);
        document.querySelector('#data-bill').textContent = `Total Price ${appState.billFormatted}`;
        
        
      }

      const fetchBill = () =>{
         const api = "https://randomapi.com/api/006b08a801d82d0c9824dcfdfdfa3b3c";
        fetch(api)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          displayCartTotal(data);
        }).catch(error => {
            console.error("error");
        });
      }

      startApp();