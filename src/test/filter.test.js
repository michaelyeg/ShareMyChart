/**
 * Created by Jill - Offline on 2016-12-01.
 */

describe("Filter tests", function() {

    it("Create a filter", function () {
        var filter1 = new filter("x", ">", "20");

        expect(filter1.axis).toBe("x");
        expect(filter1.condition).toBe(">");
        expect(filter1.value).toBe("20");

    });

    it("Create a filter array", function () {
        var filterArray1 = new filterArray();

        expect(filterArray1.getArray()).not.toBe(0);
    });

    it("Add to filter array", function () {
        var filterArray1 = new filterArray();

        var f = new filter("x", ">", "20");
        filterArray1.addData(f);

        expect(filterArray1.getArray()[0]).toBe(f);
    });

    it("Delete from filter array", function () {
        var filterArray1 = new filterArray();

        var f1 = new filter("x", ">", "20");
        var f2 = new filter("y", "=", "90");
        filterArray1.addData(f1);
        filterArray1.addData(f2);

        expect(filterArray1.getArray()[0]).toBe(f1);
        expect(filterArray1.getArray()[1]).toBe(f2);

        filterArray1.delete(1);

        expect(filterArray1.getArray()[0]).toBe(f1);
        expect(filterArray1.getArray()[1]).not.toBe(f2);

    });

    it("Clear the filter array", function () {
        var filterArray1 = new filterArray();

        var f1 = new filter("x", ">", "20");
        var f2 = new filter("y", "=", "90");
        filterArray1.addData(f1);
        filterArray1.addData(f2);

        expect(filterArray1.getArray()[0]).toBe(f1);
        expect(filterArray1.getArray()[1]).toBe(f2);

        filterArray1.clear();

        expect(filterArray1.getArray()[0]).not.toBe(f1);
        expect(filterArray1.getArray()[1]).not.toBe(f2);

    });





});