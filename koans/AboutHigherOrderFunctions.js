var _; // Requires underscore.js

describe(
    'Higher Order Functions',
    function() {

      it('should filter items in a list',
         function() {
           var numbers = [1, 2, 3];
           var odd = _(numbers)
           .filter(function(x) { return x % 2 !== 0; });

           expect(odd).toEqual([1, 3]);
           expect(odd.length).toBe(2);
           expect(numbers.length).toBe(3);
         });

      it('should transform each element',
         function() {
           var numbers = [1, 2, 3];
           var numbersPlus1 = _(numbers)
           .map(function(x) { return x + 1; });

           expect(numbersPlus1).toEqual([2, 3, 4]);
           expect(numbers).toEqual([1, 2, 3]);
         });

      it('should reduce a list to a single value',
         function() {
           var numbers = [1, 2, 3];
           var reduction = _(numbers)
           .reduce(
             function(memo, x /* current */) {
               return memo + x; },
             0 /* initial */);

           expect(reduction).toBe(6);
           expect(numbers).toEqual([1, 2, 3]);
         });

      it('should build up forEach of the items',
         function() {
           var numbers = [1, 2, 3];
           var msg = '';
           var isEven = function(item) {
             msg += (item % 2) === 0;
           };

           _(numbers).forEach(isEven);

           expect(msg).toEqual('falsetruefalse');
           expect(numbers).toEqual([1, 2, 3]);
         });

      it('should test all',
         function() {
           var onlyEven = [2, 4, 6];
           var mixedBag = [2, 4, 5, 6];

           var isEven = function(x) { return x % 2 === 0; };

           expect(_(onlyEven).all(isEven)).toBe(true);
           expect(_(mixedBag).all(isEven)).toBe(false);
         });

      it('should test if any items pass' ,
         function() {
           var onlyEven = [2, 4, 6];
           var mixedBag = [2, 4, 5, 6];

           var isEven = function(x) { return x % 2 === 0; };

           expect(_(onlyEven).any(isEven)).toBe(true);
           expect(_(mixedBag).any(isEven)).toBe(true);
         });

      it('should generate a range',
         function() {
           expect(_.range(3)).toEqual([0, 1, 2]);
           expect(_.range(1, 4)).toEqual([1, 2, 3]);
           expect(_.range(0, -4, -1)).toEqual([0, -1, -2, -3]);
         });

      it('should flatten nested lists',
         function() {
           expect(_([[1, 2], [3, 4]])
                .flatten())
           .toEqual([1, 2, 3, 4]);
         });

      it('should chain higher order functions',
         function() {
           var result = _([[0, 1], 2])
           .chain()
           .flatten()
           .map(function(x) { return x + 1; })
           .reduce(function(sum, x) { return sum + x; })
           .value();

           expect(result).toEqual(6);
         });

    });
