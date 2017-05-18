const emojilib = require('emojilib')

let term

//let moveCursor

exports.decorateTerm = (Term, { React }) => class extends React.Component {
  render() {
    return React.createElement(Term, Object.assign({}, this.props, {
      onTerminal: (t) => {
        console.log('onTerminal')
        term = t
      }
    }));
  }
};

exports.reduceUI = (state, action) => {
  console.log('reduceUI')

  if(!term) return state

  let doc = term.getDocument()
  let html = doc.children[0]
  let body = html.children[1]
  let rows = body.querySelectorAll('x-row')

  const regex = /:\w+:/g

  rows.forEach(row => {
    let html = row.innerHTML
    let data = row.innerText
    let matches = html.match(regex)
    
    if(matches){
      matches.forEach(emoji => {
        let emoji_data = emoji.split(':')[1]
        
        let char = emoji
        if (emoji_data in emojilib.lib) {
          char = emojilib.lib[emoji_data].char
        }

        //replace all
        row.innerHTML = row.innerHTML.split(emoji).join(char + ' ')
        data = row.innerText
        term.setCursorColumn(data.length) // +1 ?
        //term.setCursorPosition(term.getCursorRow(), term.getCursorColumn())
      })
    }
    /*else{
      
      if(data.split(' ').join('')){
        term.setCursorColumn(data.length + 1)
      }
      
    }*/

    // set cursor column
    //term.setCursorColumn(data.length + 1)
    //term.setCursorPosition(term.getCursorRow(), term.getCursorColumn())
  })

  return state;
}