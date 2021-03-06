import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import classNames from 'classnames'
import { syncHistoryWithStore } from 'react-router-redux'
import { caver } from 'klaytn/caver'
import TabRadio from 'components/TabRadio'
import AccessByKeystore from 'components/AccessByKeystore'
import AccessByPrivatekey from 'components/AccessByPrivatekey'
import { humanReadableChange } from 'utils/crypto'
import store from '../store'
import './WalletAccess2.scss'

type Props = {

}
const menuItem = {
  '?next=transfer': 'to Send KLAY & Token',
  '?next=faucet': 'run faucet',
  'none' : ''
}

const radioItems = [{
  title: 'Sign-in Using Private Key',
  value: 'privatekey',
  attribute: 'accessMethod',
}, {
  title: 'Sign-in Using Keystore File',
  value: 'keystore',
  attribute: 'accessMethod',
}]

class WalletAccess2 extends Component<Props> {
  state = {
    accessMethod: 'privatekey', // default value : privatekey
  }

  componentWillMount() {
    // Clear whole wallet instances when we get in '/access' route.
    let klayAccounts = sessionStorage.getItem('address')
    if (sessionStorage.getItem('was') && caver.klay.accounts.wallet[0]) {
      klayAccounts = klayAccounts ? humanReadableChange(klayAccounts) : caver.klay.accounts.wallet[0].address
      browserHistory.push(`/access/${klayAccounts}`)
      return
    }
    caver.klay.accounts.wallet.clear()
  }
  componentDidMount() {
    const search = window.location.search
    const searchBoolean = search == '?next=transfer' || search == '?next=faucet' ? true :  false
    
    if(search && !searchBoolean){
      browserHistory.replace('/ErrorPage')
    }
  }
  handleAccess = (accessMethod) => () => {
    this.setState({
      accessMethod,
    })
  }

  accessTo = (address) => {
    const { location } = this.props
    if (!location.query.next) {
      browserHistory.push(`/access/${address}`)
    } else {
      browserHistory.push(`/${location.query.next}/${address}`)
    }
  }

  render() {
    const { accessMethod } = this.state

    return (
      <div className="WalletAccess2">
        <div className="WalletAccess2__inner">
          <header className="WalletAccess2__title">Access Your Account {menuItem[window.location.search ? window.location.search : 'none']}</header>
          <TabRadio
            className="WalletAcess2__tabRadio"
            tabs={radioItems}
            selectedValue={accessMethod}
            onClick={this.handleAccess}
          />
          <AccessSide
            accessMethod={accessMethod}
            accessTo={this.accessTo}
          />
        </div>
      </div>
    )
  }
}

const AccessSide = ({ accessMethod, accessTo }) => (
  <div className="WalletAccess2__accessSide">
    {accessMethod && (accessMethod === 'keystore')
      ? <AccessByKeystore accessTo={accessTo} />
      : <AccessByPrivatekey accessTo={accessTo} />
    }
  </div>
)

export default WalletAccess2
