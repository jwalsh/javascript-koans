var _; // Requires underscore.js

describe(
    'What We Have Learned',
    function() {

      /****************************************************************/
      var products;
      beforeEach(
          function() {
            products = [
              { name: 'Sonoma',
                ingredients: ['artichoke', 'sundried tomatoes', 'mushrooms'],
                containsNuts: false },
              { name: 'Pizza Primavera',
                ingredients: ['sundried tomatoes', 'goat cheese', 'rosemary'],
                containsNuts: false },
              { name: 'South Of The Border',
                ingredients: ['black beans', 'jalapenos', 'mushrooms'],
                containsNuts: false },
              { name: 'Blue Moon',
                ingredients: ['blue cheese', 'garlic', 'walnuts'],
                containsNuts: true },
              { name: 'Taste Of Athens',
                ingredients: ['spinach', 'kalamata olives', 'sesame seeds'],
                containsNuts: true }
            ];
          });


      it('should find a pizza I can eat (without nuts or mushrooms)',
         function() {

           var i, j, hasMushrooms, productsICanEat = [];

           for (i = 0; i < products.length; i += 1) {
             if (products[i].containsNuts === false) {
               hasMushrooms = false;
               for (j = 0; j < products[i].ingredients.length; j += 1) {
                 if (products[i].ingredients[j] === 'mushrooms') {
                   hasMushrooms = true;
                 }
               }
               if (!hasMushrooms) productsICanEat.push(products[i]);
             }
           }

           expect(productsICanEat.length).toBe(1);
         });

      it('should find a pizza I can eat (functional)',
         function() {
           var productsICanEat = _(products)
             .filter(
               function(x) {
                 return x.containsNuts === false;
               }
             )
             .filter(
               function(x) {
                 return _(x.ingredients)
                   .all(
                     function(i) {
                       return i !== 'mushrooms';
                     });
               }
             );
           expect(productsICanEat.length).toBe(1);
         });


      it('should count the ingredient occurrence (imperative)',
         function() {
           var ingredientCount = {};

           for (i = 0; i < products.length; i += 1) {
             for (j = 0; j < products[i].ingredients.length; j += 1) {
               ingredientCount[products[i].ingredients[j]] =
               (ingredientCount[products[i].ingredients[j]] || 0) + 1;
             }
           }
           expect(ingredientCount['mushrooms']).toBe(2);
         });

      it('should count the ingredient occurrence (functional)',
         function() {
           var ingredientCount = {};

           var allIngredients = _(products)
             .chain()
             .map(
               function(x) {
                 return x.ingredients;
               }
             )
             .flatten()
             .forEach(
               function(x) {
                 ingredientCount[x] = ingredientCount[x] + 1 || 1;
               }
             )
             .value();

           expect(ingredientCount['mushrooms']).toBe(2);
         });

      /****************************************************************/
      it('should add all the natural numbers (imperative)',
         function() {

           var sum = 0;
           for (var i = 1; i < 1000; i += 1) {
             if (i % 3 === 0 || i % 5 === 0) {
               sum += i;
             }
           }

           expect(sum).toBe(233168);
         });

      it('should add all the natural numbers (functional)',
         function() {
           var sum = _
             .range(1000)
             .filter(
               function(x) {
                 return x % 3 === 0 ||
                   x % 5 === 0;
               }
             )
             .reduce(
               function(a, b) {
                 return a + b;
               }
             );
           expect(233168).toBe(sum);
         });



      /****************************************************************/
      /* UNCOMMENT FOR EXTRA CREDIT */
      /*
     it("should find the largest prime factor of a composite number",
     function () {

     });

     it("should give largest palindrome as product of two 3 digit numbers",
     function () {

     });

     it("should find the smallest number divisible by 1 to 20",
     function () {


     });

     it("should find the diffsum of the squares and the square of the sums",
     function () {

     });

     it("should find the 10001st prime",
     function () {

     });
     */
    });
