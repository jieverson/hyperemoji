const emojilib = require('emojilib')

let term

exports.decorateTerm = (Term, { React }) => class extends React.Component {
  render() {
    return React.createElement(Term, Object.assign({}, this.props, {
      onTerminal: t => 
        term = t
    }))
  }
}

exports.middleware = (store) => (next) => (action) => {
  let action_type = action.type
  
  if('SESSION_PTY_DATA' === action_type){
    let data = action.data

    const regex = /:\w+:/g
    let matches = data.match(regex)

    if(matches){
      matches.forEach(emoji => {
        let emoji_data = emoji.split(':')[1]
        
        let char = emoji
        if (emoji_data in emojilib.lib) {
          char = emojilib.lib[emoji_data].char
        }

        //replace all
        action.data = action.data.split(emoji).join(char + ' ')
      })
    }
  }

  next(action)
}

/*
//Debug for ticket on Hyper.js
exports.middleware = (store) => (next) => (action) => {
  if('SESSION_PTY_DATA' === action.type){
    action.data = action.data.split('hello world').join("hi")
    debugger
  }
  
  next(action)
}
*/