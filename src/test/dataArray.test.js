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


});