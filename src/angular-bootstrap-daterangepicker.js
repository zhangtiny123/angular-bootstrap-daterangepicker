/**
 * @license angular-bootstrap-daterangepicker v0.0.1
 * (c) 2013 Luis Farzati http://github.com/wangshijun/angular-bootstrap-daterangepicker
 * License: MIT
 */
(function (angular) {
    'use strict';

    angular.module('angular-bootstrap-daterangepicker', []).directive('input', function ($compile, $parse) {
        return {
            restrict: 'E',
            require: '?ngModel',
            link: function ($scope, $element, $attributes, ngModelCtrl) {
                if ($attributes.type !== 'daterange' || ngModelCtrl === null ) return;

                var options = {};
                options.format = $attributes.format || 'YYYY-MM-DD';
                options.timeZone = $attributes.timeZone || 'Asia/Shanghai';
                options.separator = $attributes.separator || ' - ';
                options.minDate = $attributes.minDate && moment($attributes.minDate);
                options.maxDate = $attributes.maxDate && moment($attributes.maxDate);
                options.dateLimit = $attributes.limit && moment.duration.apply(this, $attributes.limit.split(' ').map(function (elem, index) { return index === 0 && parseInt(elem, 10) || elem; }) );
                options.ranges = $attributes.ranges && $parse($attributes.ranges)($scope);
                options.locale = $attributes.locale && $parse($attributes.locale)($scope);
                options.opens = $attributes.opens && $parse($attributes.opens)($scope);
                options.timePicker = $attributes.timePicker && $parse($attributes.timePicker)($scope);
                options.timePickerIncrement = $attributes.timePickerIncrement && $parse($attributes.timePickerIncrement)($scope);
                options.timePicker12Hour = $attributes.timePicker12Hour && $parse($attributes.timePicker12Hour)($scope);
                options.singleDatePicker = $attributes.singleDatePicker && $parse($attributes.singleDatePicker)($scope);

                ngModelCtrl.$formatters.push(function (modelValue) {
                    if (!options.singleDatePicker) {
                        return modelValue ? [modelValue.startDate.format(options.format), modelValue.endDate.format(options.format)].join(options.separator) : '';
                    }
                    return modelValue ? modelValue.format(options.format) : '';
                });

                ngModelCtrl.$parsers.push(function (viewValue) {
                    if (!options.singleDatePicker && typeof viewValue === "string") {
                        var dates = viewValue.split(options.separator);
                        return viewValue ? { startDate: moment(dates[0]), endDate: moment(dates[1]) } : null;
                    }
                    if (viewValue.startDate && viewValue.endDate) {
                        return viewValue;
                    }
                    return viewValue ? moment(viewValue) : null;
                });

                $scope.$watch($attributes.ngModel, function (modelValue) {
                    if (!modelValue) {
                        return;
                    }
                    if (!options.singleDatePicker) {
                        $element.data('daterangepicker').setStartDate(modelValue.startDate);
                        $element.data('daterangepicker').setEndDate(modelValue.endDate);
                    }
                    else {
                        $element.data('daterangepicker').setEndDate(modelValue);
                    }
                });

                $scope.$on('daterangepicker.rangeschange', function () {
                    options.ranges = $scope.ranges;
                    $element.data('daterangepicker').setOptions(options);
                });

                $element.daterangepicker(options, function(start, end) {
                    $scope.$apply(function () {
                        if (options.singleDatePicker) {
                            ngModelCtrl.$setViewValue(end);
                        }
                        else {
                            ngModelCtrl.$setViewValue({ startDate: start, endDate: end });
                        }
                        ngModelCtrl.$render();
                    });
                });
            }
        };
    });

})(angular);
