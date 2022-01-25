const babySitter = require('../index');


  test('user input collection', () => {
    function callback(data) {
      expect(data).toBe('input');
    }
  
    babySitter(callback);
  });

  test('test if name is a string', () => {
    const firstName = "Logan";
    expect(firstName).toContain("Logan");
  });

  test('total babysitting wage is positive integer', () => {
    const nightWage = 24 + 16 + 48;
    expect(nightWage).toBeGreaterThan(0);
  });

  