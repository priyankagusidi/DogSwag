// import Layout from '@/components/layout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'


export default function CalendarPage({setEventInstOpen,handleCustomButtonClick,handleEventClick,events,CustomEvent,handleSelect,handleDate,setStartDate,setEndDate}) {
  

  const customButtons = {
    customButton: {
      text: "⒤",
      click: handleCustomButtonClick,
    },
  };

  const headerToolbar = {
    left: 'title',
    center: '',
    right: 'prev,next today customButton', // Add the custom button to the right side
  };


  return (
       <FullCalendar
      plugins={[dayGridPlugin,interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      editable={false}
      selectable={true}
      eventClick={handleEventClick}
      customButtons={customButtons} // Set the customButtons prop
      eventContent={CustomEvent}
      eventLimit={2} // Set the eventLimit prop
        views={{
          dayGrid: {
            eventLimit: 2 // Set the eventLimit for the dayGrid view
          }
        }}
      selectMirror={true}
      moreLinkContent={(args)=>{
        return <div className="text-[.8em] md:text-md">{`+${args.num}`}</div>
      }}
      dayMaxEvents={true}
      select={handleSelect}
      selectLongPressDelay={3}
      dateClick={handleDate}
       datesSet={(arg) => {
         setStartDate(arg.start) //starting visible date
         setEndDate(arg.end) //ending visible date
      }}
      longPressDelay={3}
      headerToolbar={headerToolbar} // Set the headerToolbar prop

  //      dayCellDidMount={(arg) => {
  //   // Custom rendering after the day cell is mounted
  //   const isCurrentDate = arg.date.toDateString() === new Date().toDateString();

  //   if (isCurrentDate) {
  //     arg.el.style.backgroundColor = '#b65100'; // Change the background color to red for the current date
  //     arg.el.style.color = 'white'; // Change the text color to white for the current date
  //   }
  // }}



    />  
  )
}