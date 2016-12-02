/**
 * Created by Jill - Offline on 2016-12-01.
 */


describe("DataArray tests", function() {

    it("Create a new DataArray", function () {
        var dRay = new DataArray();
        var a = ['a'];

        expect(dRay.getArray()).not.toBe(a);
        expect(dRay.flip).toBe(0);
    });

    it("Adds data", function () {
        var dRay = new DataArray();
        expect(dRay.getArray().length).toBe(0);


        var object ={dataX: 5, dataY: 10, nameX: "OrderNum", nameY: "Quantity", typeX: "nominal", typeY: "nominal"};

        dRay.addData(object);
        expect(dRay.getArray().length).toBe(1);

    });

    it("Clears data", function () {
        var dRay = new DataArray();
        expect(dRay.getArray().length).toBe(0);


        var object1 ={dataX: 5, dataY: 10, nameX: "OrderNum", nameY: "Quantity", typeX: "nominal", typeY: "nominal"};
        var object2 ={dataX: 13, dataY: 1, nameX: "OrderNum1", nameY: "Quantity1", typeX: "nominal", typeY: "nominal"};

        dRay.addData(object1);
        dRay.addData(object2);
        expect(dRay.getArray().length).toBe(2);

        dRay.clear();

        expect(dRay.getArray().length).toBe(0);

    });

    it("Sets the flipper", function () {
        var dRay = new DataArray();
        expect(dRay.flip).toBe(0);
        dRay.flipper();
        expect(dRay.flip).toBe(1);

    });

    it("Gets the array", function () {
        var dRay = new DataArray();

        var object ={dataX: 5, dataY: 10, nameX: "OrderNum", nameY: "Quantity", typeX: "nominal", typeY: "nominal"};

        dRay.addData(object);

        var arr = dRay.getArray();

        expect(arr[0]).toBe(object);

    });

    it("Gets the int - num/num", function () {
        var dRay = new DataArray();

        var object ={dataX: "5", dataY: "10", nameX: "OrderNum", nameY: "Quantity", typeX: "numeric", typeY: "numeric"};

        //getInt is called within this
        dRay.addData(object);

        expect(dRay.getArray()[0]).toBe(object);
        expect(dRay.getArray()[0].dataX).toBe(5);
        expect(dRay.getArray()[0].dataY).toBe(10);


    });

    it("Gets the int - nom/num", function () {
        var dRay = new DataArray();

        var object ={dataX: "Fred", dataY: "10", nameX: "OrderNum", nameY: "Quantity", typeX: "nominal", typeY: "numeric"};

        //getInt is called within this
        dRay.addData(object);

        expect(dRay.getArray()[0]).toBe(object);
        expect(dRay.getArray()[0].dataX).toBe("Fred");
        expect(dRay.getArray()[0].dataY).toBe(10);
    });

    it("Gets the int - num/nom", function () {
        var dRay = new DataArray();

        var object ={dataX: "200", dataY: "Burgers", nameX: "OrderNum", nameY: "Quantity", typeX: "numeric", typeY: "nominal"};

        //getInt is called within this
        dRay.addData(object);

        expect(dRay.getArray()[0]).toBe(object);
        expect(dRay.getArray()[0].dataX).toBe(200);
        expect(dRay.getArray()[0].dataY).toBe("Burgers");
    });

    it("Duplicates", function () {
        var dRay = new DataArray();

        var object1 ={dataX: "200", dataY: "Burgers", nameX: "OrderNum", nameY: "Quantity", typeX: "numeric", typeY: "nominal"};
        var object2 ={dataX: "2000", dataY: "BurgersYEAH", nameX: "OrderNum1", nameY: "Quantity1", typeX: "numeric", typeY: "nominal"};

        //getInt is called within this
        dRay.addData(object1);
        dRay.addData(object2);

        var copy = dRay.duplicate();

        //they are not completely alike, getArray returns an array of objects while duplicate is a dataArray
        //same insides, however
        expect(copy[0].dataX).toBe(dRay.getArray()[0].dataX);
        expect(copy[0].dataY).toBe(dRay.getArray()[0].dataY);
        expect(copy[0].nameX).toBe(dRay.getArray()[0].nameX);
        expect(copy[0].nameY).toBe(dRay.getArray()[0].nameY);
        expect(copy[0].typeX).toBe(dRay.getArray()[0].typeX);
        expect(copy[0].typeY).toBe(dRay.getArray()[0].typeY);
    });

    it("Deletes", function () {
        var dRay = new DataArray();

        var object1 = {
            dataX: "200",
            dataY: "Burgers",
            nameX: "OrderNum",
            nameY: "Quantity",
            typeX: "numeric",
            typeY: "nominal"
        };
        var object2 = {
            dataX: "2000",
            dataY: "BurgersYEAH",
            nameX: "OrderNum1",
            nameY: "Quantity1",
            typeX: "numeric",
            typeY: "nominal"
        };

        dRay.addData(object1);
        dRay.addData(object2);

        expect(dRay.getArray().length).toBe(2);
        dRay.delete(1);
        expect(dRay.getArray().length).toBe(1);
        expect(dRay.getArray()[1]).toBe(undefined);
        expect(dRay.getArray()[0]).toBe(object1);


    });


});