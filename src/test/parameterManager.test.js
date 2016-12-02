/**
 * Created by Jill - Offline on 2016-11-17.
 */

describe("ParameterManager Test", function() {
    it("Creates the Parameter Manager", function() {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);
    });

    //test loading one parameter into the manager, getting it back, correctness
    it("Loads one parameter into the manager and returns it correctly", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        var returned_pam = [];
        returned_pam =  testPMan.getParameters();

        expect(returned_pam[0].name).toBe("Name");
        expect(returned_pam[0].value.name).toBe("Name");
        expect(returned_pam[0].value.class_value).toBe("Class");
        expect(returned_pam[0].value.type).toBe("Not known");
        expect(returned_pam[0].value.real_name).toBe("Name");
    });

    //fails for now, should probably turn this into a singleton!
    it("Makes sure the Manager is created only once", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        var testPMan2 = new ParameterManager();
        expect(testPMan.getLength()).toBe(1); //should fail, need to prevent the ParameterManager from being created again and again.

    });

    it("Tests the ParameterManager's 'checkExists' by trying to insert something that already exists", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);


        expect(testPMan.checkExists("Name", "Class")).toBe(true);

    });

    it("Tests the ParameterManager's 'checkExists' by trying to insert something that doesn't exist", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        expect(testPMan.checkExists("Name2", "Class2")).toBe(false);

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

    });

    it("Tests the ParameterManager's 'checkExists' by trying to insert a predicate that already exists", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);


        expect(testPMan.checkExists("Name", "Class")).toBe(true);

        expect(testPMan.checkExists("Name", "Class2")).toBe(false); //this is fine, different classes can have same named predicates


    });

    it("Tests the ParameterManager's 'checkExists' by trying to insert a class that already exists", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);


        expect(testPMan.checkExists("Name", "Class")).toBe(true);

        expect(testPMan.checkExists("Name2", "Class")).toBe(false); //different predicate under same class is also valid

    });

    it("Tests the ParameterManager's 'addDatatype' - not known type", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "numeric");
        var returned_pam = [];
        returned_pam =  testPMan.getParameters();


        expect(returned_pam[0].value.type).toBe("numeric");

    });

    //passes, but may want to make a better decision on what to do for overwriting non-nominal values
    it("Tests the ParameterManager's 'addDatatype' - not nominal type", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "numeric");
        var returned_pam = [];
        returned_pam =  testPMan.getParameters();


        expect(returned_pam[0].value.type).toBe("numeric");

        testPMan.addDatatype(0, "date");
        var returned_pam2 = [];
        returned_pam2 =  testPMan.getParameters();
        expect(returned_pam2[0].value.type).toBe("date");
    });

    it("Tests the ParameterManager's 'addDatatype' - nominal type", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "numeric");
        var returned_pam = [];
        returned_pam =  testPMan.getParameters();


        expect(returned_pam[0].value.type).toBe("numeric");

        testPMan.addDatatype(0, "nominal");
        var returned_pam2 = [];
        returned_pam2 =  testPMan.getParameters();
        expect(returned_pam2[0].value.type).toBe("nominal");

    });


    it("Tests the ParameterManager's 'addDatatype' - undefined type", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "numeric");
        var returned_pam = [];
        returned_pam =  testPMan.getParameters();


        expect(returned_pam[0].value.type).toBe("numeric");

        testPMan.addDatatype(0, ""); //not really possible to occur but there's the test for it, fails
        var returned_pam2 = [];
        returned_pam2 =  testPMan.getParameters();
        expect(returned_pam2[0].value.type).toBe("numeric");

    });

    //the tests for simplify types is by no means fully encompassing - it would take a looooong time to write them all
    //but these are the basic ones for now

    it("Tests the ParameterManager's 'simplifyType' - lat and long", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "latitude");
        testPMan.simplifyType(0);

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "longitude");
        testPMan.simplifyType(1);

        var returned_pam = [];
        returned_pam =  testPMan.getParameters();

        expect(returned_pam[0].value.type).toBe("latitude");
        expect(returned_pam[1].value.type).toBe("longitude");
    });

    it("Tests the ParameterManager's 'simplifyType' - date", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "dateTime");
        testPMan.simplifyType(0);

        var returned_pam = [];
        returned_pam =  testPMan.getParameters();

        expect(returned_pam[0].value.type).toBe("date");

    });

    it("Tests the ParameterManager's 'simplifyType' - numeric", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "integer");
        testPMan.simplifyType(0);

        var returned_pam = [];
        returned_pam =  testPMan.getParameters();

        expect(returned_pam[0].value.type).toBe("numeric");

    });

    it("Tests the ParameterManager's 'simplifyType' - nominal", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "string");
        testPMan.simplifyType(0);

        var returned_pam = [];
        returned_pam =  testPMan.getParameters();

        expect(returned_pam[0].value.type).toBe("nominal");

    });

    it("Tests the ParameterManager's 'simplifyType' - Not known", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.simplifyType(0);

        var returned_pam = [];
        returned_pam =  testPMan.getParameters();

        expect(returned_pam[0].value.type).toBe("Not known"); //shouldn't ever end up like this if type is simplified but possible I suppose. Not sure what I'd rather it do.

    });

    it("Tests the ParameterManager's 'simplifyType' - undefined", function(){
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "");
        testPMan.simplifyType(0);

        var returned_pam = [];
        returned_pam =  testPMan.getParameters();

        expect(returned_pam[0].value.type).toBe("Not known"); //fails, need to fix the possible assignment of nothing (which isn't really possible)

    });

});

