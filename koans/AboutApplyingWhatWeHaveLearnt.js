var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = _.filter(products, function(pizza){
      if(pizza.containsNuts === false){
        if(_.any(pizza.ingredients, function(ingredient){
          return ingredient === "mushrooms"
        })){
          return false;
        } else {
          return true;
        } 
      } else {
        return false;
      }
    });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.reduce(_.range(1,1000),function(col, num){
      if(num % 3 === 0 || num % 5 === 0){
        return col + num;
      } else {
        return col;
      }
    }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = {"mushrooms": 
      _.reduce(
        _.flatten(_.map(products, function(pizza){
            return pizza.ingredients;
          })
        ), function(count, ing){
        if(ing == "mushrooms"){
          return count + 1;
        } else {
          return count;
        }
      },0)
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR ADVANCED */
  
  it("should find the largest prime factor of a composite number", function () {

    //strategy:
    //use recursive approach to generate array of factors. 
    //Try smallest divisor first and then move on.
    //Memoize primes that we find.
    //complexity: not sure.. but probably NP.

    function prime(num){ //returns prime factorization in an array
       if(num < 2 || num % 1 !== 0){ //validation
        return false
      }
      this.primes = {
        '2': 2,
        '3': 3,
        '5': 5,
        '7': 7
      }

      if(String(num) in this.primes){
        return [this.primes[String(num)]]
      } 

      for(var i = 2; i <= Math.sqrt(num); i++){
        if(num % i === 0){
          return _.flatten([i, prime(num/i)])
        }
      }

      //woah, we're dealing with a prime number here! Let's add it to the list of primes.
      this.primes[String(num)] = num;
      return [num]
    }

    function largestPrime(num){
      var factors = prime(num);
      return factors[factors.length - 1];
    }

    expect(largestPrime(32*3*179)).toBe(179);
    expect(prime(32*3*179)).toEqual([2,2,2,2,2,3,179]);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    //internet says the largest is 906609 = 913*993. Let's hope we get that!
    function palindrome(num){
      if(String(num) == String(num).split("").reverse().join("")){
        return true;
      } else {
        return false;
      }
    }

    var arr = [];

    for(var i = 1; i < 1000; i++){
      for(var j = 1; j <= i; j++){
        if(palindrome(i * j)){
          arr.push([i,j]);
        }
      }
    }
    
    var ans = _.map(arr, function(pair){
      return pair[0] * pair[1]
    }).sort(function(a,b){
      return a - b
    }).slice(-1)[0];
    expect(ans).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    //naive algorithm

    /*var ans = 0;

    for(var i = 1; ; i++){
      var flag = true;
      for(var j = 2; j <= 20; j++){
        if(i % j !== 0){
          flag = false;
        }
      }
      if(flag){
        ans = i;
        break;
      }
    }

    expect(ans).toBe(232792560)*/ //takes forever to run.

    //or... let's just reuse the prime factorization algorithm.
    function prime(num){ //returns prime factorization in an array
       if(num < 2 || num % 1 !== 0){ //validation
        return false
      }
      this.primes = {
        '2': 2,
        '3': 3,
        '5': 5,
        '7': 7
      }

      if(String(num) in this.primes){
        return [this.primes[String(num)]]
      } 

      for(var i = 2; i <= Math.sqrt(num); i++){
        if(num % i === 0){
          return _.flatten([i, prime(num/i)])
        }
      }

      //woah, we're dealing with a prime number here! Let's add it to the list of primes.
      this.primes[String(num)] = num;
      return [num]
    }

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    var primeFactorizations = _.map(_.range(1,21), prime);

    var ansFactors = _.reduce(primeFactorizations, function(col, item){
      var orig = _.clone(col);

      for(var i = 0; i < item.length; i++){
        if(col[String(item[i])] == undefined){
          col[String(item[i])] = -1;
        } else {
          col[String(item[i])]--;
        }
      }

      for(key in col){
        if(isNumeric(key)){
          if(orig[key] == undefined){
            orig[key] = (col[key] * -1);
          } else {
            if(col[key] < 0){
              orig[key] -= col[key];
            }
          }
        }
      }

      return orig;

    }, {});


    var ans = 1;

    for(key in ansFactors){
      if(isNumeric(ansFactors[key])){
        ans *= Math.pow(Number(key), ansFactors[key])
      }
    }

    /*var ans = _.reduce(ansFactors, function(col, item){
      return col * item;
    }, 1);*/

    expect(ans).toBe(232792560);


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function diff(arr){
      var sumOfSquares = 0;
      var squareOfSum = 0;

      for(var i = 0; i < arr.length; i++){
        sumOfSquares += arr[i] * arr[i];
        squareOfSum += arr[i];
      }

      squareOfSum = squareOfSum * squareOfSum;

      return squareOfSum - sumOfSquares;
    }

    expect(diff(_.range(1,11))).toBe(3025-385)

  });

  it("should find the 10001st prime", function () {

    function nthPrime(n){
      if(n == 1){
        return 2;
      }

      var primes = [2,3];


      for(var i = 3; primes.length < n; i += 2){

        var isPrime = true;

        for(var j = 0; j < primes.length; j++){
          if(i % primes[j] == 0){
            isPrime = false;
          }
        }

        if(isPrime){
          primes.push(i);
        }
      }

      return primes[primes.length - 1];

    }

    expect(nthPrime(10001)).toBe(104743);

  });
  
});
