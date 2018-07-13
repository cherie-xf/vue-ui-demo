const Themes = [
 /*
{
  value: {from:'#fdfbfb', to:'#ebedee'},
  text: '#fdfbfb 0%, #ebedee 100%',
  name: 'Cloudy Knoxville' 
},
*/
{
  value: {from:'#FFFEFF', to:'#D7FFFE'},
  text: '#FFFEFF 0%, #D7FFFE 100%',
  name: 'Salt Mountain - default',
  chartTheme:'ovilia-green',
  colors: {
      level2:{
          name: 'teal lightem-2',
          value: '#4DB6AC'
      },
      level4:{
          name: 'teal lightem-4',
          value: '#B2DFDB'
      }
  } 
},
/*
{
  value: {from:'#f5efef', to:'#feada6'},
  text: '#f5efef 0%, #feada6 100%',
  name: 'Fresh Milk'
},
*/
{
  value: {from:'#e6dee9', to:'#bdc2e8'},
  text: '#e6dee9 0%, #bdc2e8 100%',
  name: 'Frozen Dreams',
  chartTheme:'purple',
  colors: {
      level2:{
          name: 'deep-purple lighten-2',
          value: '#9575CD'
      },
      level4:{
          name: 'deep-purple lighten-4',
          value: '#D1C4E9'
      }
  } 
},
{
  value: {from: '#ffecd2', to: '#fcb69f'},
  text: '#ffecd2 0%, #fcb69f 100%',
  name: 'Juicy Peach',
  chartTheme:'amber',
  colors: {
      level2:{
          name: 'amber lighten-2',
          value: '#FFD54F'
      },
      level4:{
          name: 'amber lighten-4',
          value: '#FFECB3'
      }
  } 
},
/*
{
  value: {from: '#FFE6FA', to: '#E3FDF5'},
  text: '#FFE6FA 0%, #E3FDF5 100%',
  name: 'Perfect White'
},
{
  value: {from:'#fed6e3', to:'#a8edea'},
  text: '#fed6e3 0%, #a8edea 100%',
  name: 'Rare Wind'
},
{
  value: {from:'#fff1eb', to:'#ace0f9'},
  text: '#fff1eb 0%, #ace0f9 100%',
  name: 'New York'
},
*/
{
  value: {from:'#e4efe9', to:'#93a5cf'},
  text: '#e4efe9 0%, #93a5cf 100%',
  name: 'Cochiti Lake',
  chartTheme:'blue',
  colors: {
      level2:{
          name: 'light-blue lighten-2',
          value: '#4FC3F7'
      },
      level4:{
          name: 'light-blue lighten-4',
          value: '#B3E5FC'
      }
  } 

},
/*
{
  value: {from:'#8baaaa', to:'#ae8b9c'},
  text: '#8baaaa 0%, #ae8b9c 100%',
  name: 'Jungle Day',
  dark:true,
},
{
  value: {from:'#517fa4', to:'#243949'},
  text: '#517fa4 0%, #243949 100%',
  name: 'Solid Stone',
  dark:true,
},
{
  value: {from:'#267985', to:'#0f384b'},
  text: '#267985 0%, #0f384b 100%',
  name: "Arielle's Smile",
  dark:true,
},
{
  value: {from:'#282a4a', to:'#05060f'},
  text: '#282a4a 0%, #05060f 100%',
  name: 'Eternal Constanc',
  dark:true,
},
{
  value: {from:'#20282a', to:'#0d0d0d'},
  text: '#20282a 0%, #0d0d0d 100%',
  name: 'night',
  dark:true,
},
*/
]
const theme = {
    state:{
        gradient: {
            from: '#fffeff',
            to:'#d7fffe',
        },
        opts: Themes,
        chartTheme: Themes[0].chartTheme,
        colors: Themes[0].colors
    },
    mutations:{
        UPDATE_THEME:(state,args)=>{
            state.gradient.from = args.value.from;
            state.gradient.to = args.value.to;
            state.colors = state.opts[args.index].colors
            state.chartTheme = state.opts[args.index].chartTheme
        },

    },
    actions:{
        UpdateTheme({commit}, args) {
          commit('UPDATE_THEME', args)
        },

    }
}    

export default theme