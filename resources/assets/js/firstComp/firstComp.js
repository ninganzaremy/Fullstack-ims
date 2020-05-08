import React, { Component} from 'react'
import ReactDOM from 'react-dom'

class Layout extends Component {
  constructor () {
    super()
    this.state = {
      name: 'Remy'
    }
  }
  clickedBtn = () => {
    console.log('swag')
  }
  render () {
    return (<div className='home'>
        <div className='Aligner'>
          <div className='Aligner-item'>
            <img src='/img/logo.png' />
            <h1>Starter-Kit</h1>
            <div className='menu'>
              <ul>
                <div onClick={this.clickedBtn}>clickked this</div>
                <li><a href='https://ninganzaremy.com/' target='new'>Documentation</a></li>
                <li><a href='https://ninganzaremy.com/' target='new'>ninganzaremy.Com</a></li>
              </ul>
            </div>
            <br />

          </div>
        </div>
      </div>)
  }
}

const ordersForm = document.getElementById('ordersForm')

ReactDOM.render(<Layout />, ordersForm)
