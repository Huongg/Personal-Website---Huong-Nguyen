describe ('checking Input', function (){
	it('it should return false if it is not a constter', function(){
		const constterInput = 8;
		const attempts = "!"; 
		const result = checkingInput(constterInput, attempts); 
		const expected = false; 
		expect(result).toEqual(expected);
	})

	it('it should return false if it is a exclaimation mark', function(){
		const constterInput = "!";
		const attempts = "!"; 
		const result = checkingInput(constterInput, attempts); 
		const expected = false; 
		expect(result).toEqual(expected);
	})

	it('it should return false if the word is already used', function(){
		const constterInput = "a";
		const attempts = "a"; 
		const result = checkingInput(constterInput, attempts); 
		const expected = false; 
		expect(result).toEqual(expected);
	})
})

describe ('checking attempted', function (){
	it('it should return false if it has been attempted', function(){
		const constterInput = "a";
		const attempts = "a"; 
		const result = hasAttempted(constterInput, attempts); 
		const expected = false; 
		expect(result).toEqual(expected);
	})


	it('it should return true if it has been attempted', function(){
		const constterInput = "a";
		const attempts = "j"; 
		const result = hasAttempted(constterInput, attempts); 
		const expected = true; 
		expect(result).toEqual(expected);
	})


	it('it should return false if it has been attempted', function(){
		const constterInput = "a";
		const attempts = "j,a"; 
		const result = hasAttempted(constterInput, attempts); 
		const expected = false; 
		expect(result).toEqual(expected);
	})
})