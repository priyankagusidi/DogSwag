const Section = [
    { 
        value: {
        freq: 'yearly',
        interval: 1,
        }, 
        label:"Only Once"
    },
    { 
        value: {
        freq:"daily",
        }, 
        label:"daily"
    },
    { 
        value: {
        freq:"weekday",
        byweekday: [ 'mo','tu','we','th', 'fr' ],
        }, 
        label:"Every Weekday (Monday to Friday)"
    },

  ]

export default Section
        