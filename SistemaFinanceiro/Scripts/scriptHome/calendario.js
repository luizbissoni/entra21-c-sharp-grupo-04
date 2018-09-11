$('#calendario').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
    },
    defaultDate: '2016-09-12',
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    editable: true,
    selectable: true,
    select: function () {},
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function () {

    },
    events: [
    ]
});