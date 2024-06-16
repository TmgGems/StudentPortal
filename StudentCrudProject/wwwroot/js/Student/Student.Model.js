/// <reference path="../knockout.js" />

var StudentModel = function (item) {
    var self = this;
    item = item || {};
    self.id = ko.observable(item.id || 0)
    self.firstName = ko.observable(item.firstName || '');
    self.lastName = ko.observable(item.lastName || '');
    self.faculty = ko.observable(item.faculty || '');
    self.dob = ko.observable(item.dob || '');
    self.email = ko.observable(item.email || '');
    self.gender = ko.observable(item.gender || '');
}