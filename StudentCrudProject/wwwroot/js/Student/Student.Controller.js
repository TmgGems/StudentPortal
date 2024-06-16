// Mode constants
const mode = {
    create: 1,
    update: 2
};
var StudentController = function () {
    var self = this;

    const baseUrl = "/api/StudentAPI";
    self.Students = ko.observableArray([]);
    self.SelectedStudent = ko.observable(new StudentModel());

    self.NewStudent = ko.observable(new StudentModel());
    self.mode = ko.observable(mode.create);
    self.IsUpdated = ko.observable(false);
    self.skipCount = ko.observable(0);
    self.take = ko.observable(10);
    self.searchTerm = ko.observable("");


    //Fetch data from the server
    self.getData = function () {
        var url = baseUrl;
        console.log("Fetching data from URL: " + url);

        ajax.get(url).then(function (data) {
            console.log("Data received: ", data);
            self.Students(data);
            console.log(self.Students())
            //Map raw data to StudentModel instances
            //var mappedStudents = ko.utils.arrayMap(data,  (item) => {
            //    return new StudentModel(item);
            //});
            var mappedStudents = data ? ko.utils.arrayMap(data, (item) => {
                return new StudentModel(item);
            }) : [];

         //   console.log("Mapped data: ", mappedStudents);

            // Extract plain JavaScript objects from observables for logging
            var plainStudents = ko.toJS(mappedStudents);
         //   console.log("Plain data: ", plainStudents);

            //Update observable array with mapped data
            self.Students(mappedStudents);

            console.log("ObservableArray Students: ", self.Students());
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Error fetching data: ", textStatus, errorThrown);
            });
    };

    //self.getData = function () {
    //    var url = baseUrl;
    //    console.log("Fetching data from URL: " + url);

    //    ajax.get(url).then(function (result) {
    //        self.Students(result);
    //        console.log("Data received: ", data);

    //        // Map raw data to StudentModel instances
    //        var mappedStudents = ko.utils.arrayMap(result, (item) => {
    //            return new StudentModel(item);
    //        });

    //    });
    //};



    // Initial data load
    self.getData();

    // Add or Update student
    self.AddStudent = function () {
        switch (self.mode()) {
            case 1:
                ajax.post(baseUrl + "/Add", ko.toJSON(self.NewStudent()))
                    .done(function (result) {
                        self.Students.push(new StudentModel(result));
                        self.resetForm();
                    })
                    .fail(function (err) {
                        console.log(err);
                    });
                break;
            default:
                
                ajax.put(baseUrl + "/" + self.NewStudent().id(), ko.toJSON(self.NewStudent()))
                    .done(function (result) {
                        self.Students.replace(self.SelectedStudent(), new StudentModel(result));
                        self.resetForm();
                    })
                    .fail(function (err) {
                        console.log(err);
                    });
                break;
        }
    };

    // Delete student
    self.DeleteStudent = function (model) {
        ajax.delete(baseUrl + "?id=" + model.id())
            .done((result) => {
                self.Students.remove(model);
            }).fail((err) => {
                console.log(err);
            });
    };

    // Reset form
    self.resetForm = () => {
        self.NewStudent(new StudentModel());
        self.SelectedStudent(new StudentModel());
        self.mode(1);
        self.IsUpdated(false);
    };

    // Select student for editing
    self.SelectStudent = (model) => {
        self.SelectedStudent(model);
        self.NewStudent(new StudentModel(ko.toJS(model)));
        self.IsUpdated(true);
        self.mode(mode.update);
    };

    // Pagination: Previous data
    self.PreviousData = function () {
        if (self.skipCount() > 0) {
            self.skipCount(self.skipCount() - self.take());
            self.getData();
        }
    };

    self.ClosedModel = function () {
        self.resetForm();
    }

    // Pagination: Next data
    self.NextData = function () {
        self.skipCount(self.skipCount() + self.take());
        self.getData();
    };

    // Search
    self.clickedSearch = function () {
        self.getData();
    };
};

// AJAX helper functions
var ajax = {
    get: function (url) {
        return $.ajax({
            method: "GET",
            url: url,
            async: false,
        });
    },
    post: function (url, data) {
        return $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            url: url,
            data: (data)
        });
    },
    put: function (url, data) {
        return $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            url: url,
            data: data
        });
    },
    delete: function (route) {
        return $.ajax({
            method: "DELETE",
            url: route,
        });
    }
};



//// Apply bindings
//ko.applyBindings(new StudentController());