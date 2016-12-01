/**
 * Created by Jill - Offline on 2016-11-20.
 */


describe("graphPicker Tests", function() {

    it("Picks bar v chart state 1: nom/num", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "nominal");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "numeric");

        pickGraphTypes(pam, pam2); //need nikki's code to pass these tests
        expect(testpG.getAll()[0]).toBe(0);

    });

    it("Picks bar v chart state 2: date/num", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "date");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "numeric");

        pickGraphTypes(pam, pam2); //need nikki's code to pass these tests
        expect(testpG.getAll()[1]).toBe(0); //orders a bit funny but works

    });

    it("Picks bar v chart state 3: nom/nom", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "nominal");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "nominal");

        pickGraphTypes(pam, pam2); //need nikki's code to pass these tests
        expect(testpG.getAll()[0]).not.toBe(0);

    });

    it("Picks bar v chart state 4: not known/nom", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "not known");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "nominal");

        pickGraphTypes(pam, pam2); //need nikki's code to pass these tests
        expect(testpG.getAll()[0]).not.toBe(0);

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it("Picks bar h chart state 1: num/nom", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "numeric");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "nominal");

        pickGraphTypes(pam, pam2); //need nikki's code to pass these tests
        expect(testpG.getAll()[0]).toBe(1);

    });

    it("Picks bar h chart state 2: date/nom", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "date");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "nominal");

        pickGraphTypes(pam, pam2); //need nikki's code to pass these tests
        expect(testpG.getAll()[0]).toBe(1);

    });

    it("Picks bar h chart state 3: nom/nom", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "nominal");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "nominal");

        pickGraphTypes(pam, pam2); //need nikki's code to pass these tests
        expect(testpG.getAll()[0]).not.toBe(1);

    });

    it("Picks bar h chart state 4: not known/nom", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "not known");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "nominal");

        pickGraphTypes(pam, pam2);
        expect(testpG.getAll()[0]).not.toBe(1);

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    it("Picks scatter graph - nom/nom", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "nominal");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "nominal");

        pickGraphTypes(pam, pam2);
        expect(testpG.getAll()[0]).toBe(4);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    it("Picks scatter graph - num/num", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "numeric");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "numeric");

        pickGraphTypes(pam, pam2);
        expect(testpG.getAll()[0]).toBe(3);
    });

    it("Picks scatter graph - num/date", function () {
        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "numeric");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "date");

        pickGraphTypes(pam, pam2);
        expect(testpG.getAll()[1]).toBe(3);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    it("Picks line chart - num/date", function () {

        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "numeric");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "date");

        pickGraphTypes(pam, pam2);
        expect(testpG.getAll()[0]).toBe(2);

    });

    it("Picks line chart - num/num", function () {

        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "numeric");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "numeric");

        pickGraphTypes(pam, pam2);
        expect(testpG.getAll()[1]).toBe(2);

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    it("Picks map chart - lat/long", function () {

        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "lat");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "long");

        pickGraphTypes(pam, pam2);
        expect(testpG.getAll()[0]).toBe(5);
    });

    it("Picks map chart - long/lat", function () {

        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "long");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "lat");

        pickGraphTypes(pam, pam2);
        expect(testpG.getAll()[0]).toBe(5);
    });

    it("Picks map chart - lat/lat", function () {

        var testPMan = new ParameterManager();

        expect(testPMan.getLength()).toBe(0);

        var pam = new Parameter("Name", "Class");
        testPMan.addParameter(pam);
        expect(testPMan.getLength()).toBe(1);

        testPMan.addDatatype(0, "lat");

        var pam2 = new Parameter("Name2", "Class2");
        testPMan.addParameter(pam2);
        expect(testPMan.getLength()).toBe(2);

        testPMan.addDatatype(1, "lat");

        pickGraphTypes(pam, pam2);
        expect(testpG.getAll()[0]).not.toBe(5);
    });

});
