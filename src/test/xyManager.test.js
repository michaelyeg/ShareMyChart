/**
 * Created by Jill - Offline on 2016-12-01.
 */


describe("xYManager tests tests", function() {

    it("Creates the xy Manager", function () {
        var xym = new xyManager();

        expect(xym.getX()).toBe(undefined);
        expect(xym.getY()).toBe(undefined);
    });

    it("Add to the xy Manager - x value", function () {
        var xym = new xyManager();
        var xThing = "x-1";

        xym.setValue(xThing);

        expect(xym.getX()).toBe('1');
    });

    it("Add to the xy Manager - y value", function () {
        var xym = new xyManager();
        var yThing = "y-5";

        xym.setValue(yThing);

        expect(xym.getY()).toBe('5');
    });


    it("Are both x/y set", function () {
        var xym = new xyManager();
        var xThing = "x-1";

        xym.setValue(xThing);

        var yThing = "y-5";

        var testValue = 1;
        xym.setValue(yThing, testValue);


        expect(xym.isSet()).toBe(true);
    });


});