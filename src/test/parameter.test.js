/**
 * Created by Jill - Offline on 2016-11-17.
 */


describe("Parameter Test", function() {
    it("Creates a simple blank parameter with atypical class_value", function() {
        var testPam = new Parameter("MyName", "MyClass");

        expect(testPam.name).toBe("MyName");
        expect(testPam.class_value).toBe("MyClass");
        expect(testPam.real_name).toBe("MyName");
        expect(testPam.type).toBe("Not known");
    });

    it("Creates a parameter with typical name and class_value", function(){
        var testPam = new Parameter("stuuuff/myName2", "stuff/stuffstuff/desks");

        expect(testPam.name).toBe("stuuuff/myName2");
        expect(testPam.class_value).toBe("stuff/stuffstuff/desks");
        expect(testPam.real_name).toBe("myName2");
        expect(testPam.type).toBe("Not known");
    });

    it("Tests if a parameter's info is created properly when there's a lot of /'s", function(){
        var testPam = new Parameter("t/h/i/s/is/r/o/u/g/h/", "m/e/t/o/o/");

        expect(testPam.name).toBe("t/h/i/s/is/r/o/u/g/h/");
        expect(testPam.class_value).toBe("m/e/t/o/o/");
        expect(testPam.real_name).toBe(""); //this isn't a good result, but I don't think it can happen?
        expect(testPam.type).toBe("Not known");
    });

});
